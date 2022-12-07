import puppeteer from 'puppeteer'
import { v4 as uuidv4 } from 'uuid'
import fetch from 'node-fetch'
import { createWriteStream, unlinkSync } from "fs"
import createHttpsProxyAgent from "https-proxy-agent"
import express from "express"

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy
const fetchOptions = proxy ? { agent: createHttpsProxyAgent(proxy) } : {}

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.goto('https://h5.tu.qq.com/web/ai-2d/cartoon/index')
const confirmBtn = "div._confirm-btn_1fu81_42"
await page.waitForSelector(confirmBtn) //only need for the first time because brwoser will not close.
await page.click(confirmBtn)
await page.close()

async function downloadImg(url) {
  try {
    console.log(`start to donwload ${url}`)
    const res = await fetch(url, fetchOptions)
    const path = `./temp/${uuidv4()}.jpg`
    res.body.pipe(createWriteStream(path))
    console.log(`save in ${path}`)
    return path
  } catch(e) {
    throw e
  }
}

async function getResponse(path) {
  const playBtn = "#index-play-btn"
  const pickImg = "img[src='https://shadow-h5-prd-1251316161.file.myqcloud.com/oss/1/choose_2.png']"
  const processAPI = "https://ai.tu.qq.com/trpc.shadow_cv.ai_processor_cgi.AIProcessorCgi/Process"
  try {
    const page = await browser.newPage()
    await page.goto('https://h5.tu.qq.com/web/ai-2d/cartoon/index')
    await page.waitForSelector(playBtn)
    await page.click(playBtn)
    const [_, fileChooser] = await Promise.all([
      page.waitForSelector(pickImg),
      page.waitForFileChooser(),
      page.click(pickImg),
      page.click(pickImg, { delay: 100 })
    ])
    console.log(fileChooser)
    await fileChooser.accept([path])
    await page.waitForResponse(processAPI) //preFlightResponse
    const response = await (await page.waitForResponse(processAPI)).json()
    console.log(response)
    return response
  } catch(e) {
    throw e
  }
}

function deleteImg(path) {
  unlinkSync(path)
  console.log(`remove ${path}`)
}

const app = express()
app.get('/', async (req, res) => {
  const url = req.query.url && decodeURIComponent(req.query.url)
  console.log(url)
  if (url) {
    try {
      const path = await downloadImg(url)
      const response = await getResponse(path)
      res.json(response)
      deleteImg(path)
    } catch(e) {
      res.json({ error: e.toString() })
    }
  } else {
    res.json({ error: "url query missing"})
  }
})

const port = 3000
app.listen(port, "0.0.0.0", () => {
  console.log(`express run in http://127.0.0.1:${port}`)
})