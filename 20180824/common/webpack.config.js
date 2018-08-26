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
    filename:'[name].bundle.js',
    chunkFilename:'[name].chunk.js'
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      chunks:['pageA','pageB']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinite
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'mainfest',
      minChunks: Infinite
    })
  ]
}