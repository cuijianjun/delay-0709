'use strict'
var Koa = require('koa')
var path = require('path')
var wechat = require('./wechat/g')
var util = require('./libs/util')
var wechat_file = path.join(__dirname, './config/wechat.txt')
var config = {
  wechat:{
    appID:'wx3ca28ccda78f5261',
    appSecret:'fcd2738bf2263a8e60e2a9b2d7071f59',
    token:'a20595b3f7a63d4bb602b96f1c3e8f31',
    getAccessToken:function () {
      return util.readFileAsync(wechat_file)
    },
    saveAccessToken:function (data) {
      var data = JSON.stringify(data)
      return util.writeFileAsync(wechat_file,data)
    }
  }
}

var app = new Koa();
app.use(wechat(config.wechat))

app.listen(3100)
console.log('listening:3100');