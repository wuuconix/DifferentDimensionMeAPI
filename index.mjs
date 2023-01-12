import { v4 as uuidv4 } from 'uuid'
import fetch from 'node-fetch'
import createHttpsProxyAgent from "https-proxy-agent"
import express from "express"
import md5 from "md5"

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy
const fetchOptions = proxy ? { agent: createHttpsProxyAgent(proxy) } : {}

//Thanks to IvanNazaruk who reverse engineering tencent api, find the way of generate X-Sign-Value.
//Reference: https://github.com/IvanNazaruk/DifferentDimensionMe-GUI/commit/99cbd27c313221935527056eb74102adf3755f70
function _getXSignValue(payload) {
  return md5(`https://h5.tu.qq.com${JSON.stringify(payload).length}HQ31X02e`)
}

async function ai(url) {
  let res = await fetch(url, fetchOptions)
  const buffer = await res.arrayBuffer()
  const base64 = Buffer.from(buffer).toString("base64")
  const payload = { busiId: "different_dimension_me_img_entry", images: [base64], extra: `{\"face_rects\":[],\"version\":2,\"platform\":\"web\",\"data_report\":{\"parent_trace_id\":\"${uuidv4()}\",\"root_channel\":\"qq_sousuo\",\"level\":0}}` }
  console.log(payload)
  res = await (await fetch("https://ai.tu.qq.com/trpc.shadow_cv.ai_processor_cgi.AIProcessorCgi/Process", {
    method: "post",
    body: JSON.stringify(payload),
    headers: { 
      "Content-Type": "application/json",
      "X-Sign-Value": _getXSignValue(payload),
      "X-Sign-Version": "v1",
      "Origin": "https://h5.tu.qq.com"
    }
  })).json()
  return res
}

const app = express()
app.get('/', async (req, res) => {
  const url = req.query.url && decodeURIComponent(req.query.url)
  console.log(url)
  if (url) {
    try {
      const response = await ai(url)
      res.json(response)
    } catch(e) {
      console.log(e.toString())
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