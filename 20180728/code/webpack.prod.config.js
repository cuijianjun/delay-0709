module.exports = {
  // 入口
  entry:{
    //文件入口可以有多个，也可以有一个，如果有一个，就默认从这一个入口开始分析
    'main':'./main.js'
  },
  output:{
    filename:'./build.js'
  }
}