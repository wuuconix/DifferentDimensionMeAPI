# DifferentDimensionMeAPI

Self-Host DifferentDimensionMe API Using Express

Features:

+ Support System Proxy using [https-proxy-agent](https://www.npmjs.com/package/https-proxy-agent)
+ Good Asynchronous Concurrent Compability Thanks To JavaScirpt

Examples:

```bash
$ git clone https://github.com/wuuconix/DifferentDimensionMeAPI.git --depth 1
$ cd DifferentDimensionMeAPI
$ npm i
$ node index.mjs
```

Open this url in browser for test: http://127.0.0.1:3000/?url=https://tva4.sinaimg.cn/large/007YVyKcly1h1w9n5mxr3j30rs0rsabl.jpg

The response are as follows in this test:

```json
{"code":0,"msg":"","images":[],"faces":[],"extra":"{\"video_urls\": [\"https://act-artifacts.shadowcv.qq.com/mqq/ai_painting_anime/video/d20cbbc897da7e2c47370384e0588ef0_rt9t4.mp4\", \"https://activity.tu.qq.com/mqq/ai_painting_anime/share/d20cbbc897da7e2c47370384e0588ef0_crhcp.mp4\"], \"img_urls\": [\"https://activity.tu.qq.com/mqq/ai_painting_anime/image/d20cbbc897da7e2c47370384e0588ef0_2aigp.jpg\", \"https://activity.tu.qq.com/mqq/ai_painting_anime/share/d20cbbc897da7e2c47370384e0588ef0_t9eyy.jpg\", \"https://act-artifacts.shadowcv.qq.com/mqq/ai_painting_anime/res/d20cbbc897da7e2c47370384e0588ef0_pwzuq.jpg\", \"https://activity.tu.qq.com/mqq/ai_painting_anime/pagres/d20cbbc897da7e2c47370384e0588ef0_u96jz.jpg\"]}","videos":[]}
```
![image](https://tva2.sinaimg.cn/large/007YVyKcly1h8v9ubw2hej31bs08ewv0.jpg)

[![](https://activity.tu.qq.com/mqq/ai_painting_anime/image/d20cbbc897da7e2c47370384e0588ef0_2aigp.jpg)](https://activity.tu.qq.com/mqq/ai_painting_anime/image/d20cbbc897da7e2c47370384e0588ef0_2aigp.jpg)

Special Thanks:

Thanks to [IvanNazaruk](https://github.com/IvanNazaruk) who reverse engineering tencent api, find the way of generate X-Sign-Value. Reference: https://github.com/IvanNazaruk/DifferentDimensionMe-GUI/commit/99cbd27c313221935527056eb74102adf3755f70

