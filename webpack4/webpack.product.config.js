const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// css抽取单独的文件
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');// 压缩js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//css压缩
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer'); // css增加前缀
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: loader => [
                autoprefixer({browsers: ['> 0.15% in CN']}) // 添加前缀
              ]
            }
          }, {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][hash].css', // 设置最终输出的文件名
      chunkFilename: '[id][hash].css'
    }),
    new HtmlWebpackPlugin({
      title: 'AICODER 全栈线下实习', // 默认值：Webpack App
      filename: 'main.html', // 默认值： 'index.html'
      template: path.resolve(__dirname, 'src/main.html'),
      minify: {
        collapseWhitespace: true, // 移除空白
        removeComments: true, // 移除注释
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  optimization: {
    minimizer:
      [
        new OptimizeCSSAssetsPlugin({}),
        // new UglifyJsPlugin({
        //   cache: true,// 如果没有变化，，不进行重复压缩
        //   parallel: true,// 是否开启并行压缩
        //   sourceMap: true // set to true if you want JS source maps
        // })
      ]
  }
};
