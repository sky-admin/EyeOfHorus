const express = require('express')
const app = new express()
const AipFaceClient = require('baidu-aip-sdk')

const config = require('./config')

// 设置APPID/AK/SK
const APP_ID = config.appId
const API_KEY = config.appKey
const SECRET_KEY = config.secretKey

if (!(APP_ID && API_KEY && SECRET_KEY)) {
  console.error('请在百度开放平台申请并作相应配置')
}

app.use('/', (req, res) => {
  res.send('hello world!')
})
