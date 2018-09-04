const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpack = require('clean-webpack-plugin')
const ExtractTextWebpack = require('extract-text-webpack-plugin')
const path = require('path')

const baseConfig = {
  entry: {
    react: 'react'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpack.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextWebpack({
      filename: 'css/[name].[hash].css'
    }),
    new CleanWebpack(path.resolve(__dirname, 'dist')),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'react',
      minChunks: Infinity
    })
  ]
}


const generatePage = function ({
       title = '',
       entry = '',
       template = './index.html',
       name = '',
       chunk = []
     } = {}) {
  return {
    entry,
    plugins: [
      new HtmlWebpackPlugin({
        chunk,
        template,
        title,
        filename: name + '.html'
      })
    ]
  }
}

const pages = [
  generatePage({
    title: 'page A',
    entry: {
      a: './src/page/a'
    },
    name: 'a',
    chunks: ['react', 'a']
  }),
  generatePage({
    title: 'page B',
    entry: {
      b: './src/page/b'
    },
    name: 'b',
    chunks: ['react', 'b']
  }),
  generatePage({
    title: 'page C',
    entry: {
      c: './src/page/c'
    },
    name: 'c',
    chunks: ['react', 'c']
  })
]


module.exports = merge([baseConfig].concat(pages))
