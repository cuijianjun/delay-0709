var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].bundle.js'
  },
  module:{
    loaders:[
      {
        test:/\.html$/,
        loader: 'html-loader'
      },
      {
         test:/\.js$/,
        loader:'babel-loader',
        exclude:path.resolve(__dirname, 'node_modules'),
        options:{
           presets:['latest']
        }
      },
      {
        test:/\.css$/,
        loader:'style-loader!css-loader?importLoaders=1!postcss-loader',//处理@import引入的css文件
      },
      {
        test:/\.less$/,
        loader:'style!css!postcss!less'
      }
    ]
  },
  plugins:[
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject:'body',//js 注入头部
      title: 'this is a.html'
    })
  ]
}