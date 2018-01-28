const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data
const AipFaceClient = require('baidu-aip-sdk').face

app.set('view engine', 'pug')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}))

// 设置APPID/AK/SK
const config = require('./config')
const APP_ID = config.appId
const API_KEY = config.apiKey
const SECRET_KEY = config.secretKey
if (!(APP_ID && API_KEY && SECRET_KEY)) {
  console.error('请在百度开放平台申请并作相应配置')
}
const client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY)

app.use(express.static('static'))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/identify', upload.array(), (req, res) => {
  // console.log(req.body)
  const image = req.body.image.split(',')[1]
  // console.log(image)
  client.identifyUser('test', image).then((result) => {
    console.log(JSON.stringify(result))
    res.send({errno: 0, data: result})
  }).catch(err => {
    // 如果发生网络错误
    console.log(err)
    res.send({errno: -1})
  })
})

app.listen(3000, () => {
  console.log('listen port 3000!')
})
