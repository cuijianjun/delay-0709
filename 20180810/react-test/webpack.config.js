const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry:{
    main:'./src/foo',
    vendor:['react']
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].[chunkhash].js'
  },
  plugins:[
    new webpack.NamedChunksPlugin(),//打包后的chunk
    new webpack.NamedModulesPlugin(),//模块的chunk
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor',
      minChunks:Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:'manifest'
    })
  ]
}