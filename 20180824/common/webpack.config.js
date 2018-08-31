var webpack = require('webpack')
var path = require('path')
module.exports = {
  entry:{
    'pageA': './pageA',
    'pageB': './pageB',
    'vendor': ['lodash']
  },
  output:{
    path: path.resolve(__dirname,'./dist'),
    publicPath: './dist/',
    filename:'[name].bundle.js',
    chunkFilename:'[name].chunk.js'
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      chuildren: true,
      minChunks: 2,
    })
  ]
}