var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry:{
    app:'./src/app.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    publicPath:'./dist/',
    filename:'[name].bundle.js'
  },
  module:{
    rules:[
      {
        test:/\.css/,
        use:ExtractTextWebpackPlugin.extract({
          fallback:{
            loader:'style-loader',
            options:{
              transform:'./css.transform.js'
            }
          },
          use:[
            {
              loader:'css-loader',
              options:{
                minimize:true,
                modules:true
              }
            }
          ]
        })
      }
    ]
  },
  plugins:[
    new ExtractTextWebpackPlugin({
      filename:'[name].min.css'
    })
  ]
}