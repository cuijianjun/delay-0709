var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var Webpack = require('webpack')
var PurifyCSS = require('purifycss-webpack')
var glob = require('glob-all')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var PurifyWebpack = require('purifycss-webpack')
var HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')

module.exports = {
  entry:{
    app:'./src/app.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
     filename:'[name]-bundle-[hash:5].js',
    chunkFilename:'[name].bundle.js'
  },
  resolve:{
    alias:{
      jquery$:path.resolve(__dirname,'src/libs/jquery.min.js')
    }
  },
  devtool:'eval',
  module:{
    rules:[
      {
        loader:'postcss-loader',
        options:{
          ident:'postcss',
          plugins:function(loader){
            return [
              require('postcss-sprites')({
                spritePath:'dist/assets/imgs/sprites',
                retina:true
              }),
              require('postcss-cssnext')()
            ]
          }
        }
      },
      {
        test:/\.less$/,
        use:ExtractTextWebpackPlugin.extract({
          fallback:{
            loader:'style-loader',
            options:{
              singleton:true
            }
          },
          use:[
            {
              loader:'css-loader'
            },
            {
              loader:'less-loader'
            }
          ]
        })
      },
      {
        test:/\.js$/,
        use:[
          {
            loader:'babel-loader',
            options:{
              presets:['env'],
            }
          }
        ]
      },
      {
        test:/\.(png|jpg|jpeg|gif)$/,
        use:[
          // {
          //   loader:'file-loader',
          //   options:{
          //     publicPath:'',
          //     outputPath:'dist/',
          //     useRelativePath:true
          //   }
          // }
          {
            loader:'url-loader',
            options:{
              limit:10000,
              name:'[name].min.[ext]',
              publicPath:'',
              outputPath:'dist/',
              useRelativePath:true
            }
          },
          {
            loader:'img-loader',
            options:{
              pngquant:{
                Quality:80
              }
            }
          }
        ]
      },
      {
        test:/\.(eot|woff2?|ttf|svg)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:10000,
              name:'[name].min.[ext]',
              publicPath:'',
              outputPath:'dist/',
              useRelativePath:true
            }
          }
        ]
      },
      {
        test:/\.html$/,
        use:[
          {
            loader:'html-loader',
            options:{
              attrs:['img:src','img:data-src']
            }
          }
        ]
      }
    ]
  },
  devServer:{
    port:9001,
    hot:true,
    historyApiFallback:{
      htmlAcceptHeaders:[
        'text/html',
        'application/xhtml-html'
      ],
      rewrites:[
        {
          from: /^\/(\w+\/?)(\w+)/,
          to: function (context) {
            return '/' + context.match[1] + context.match[2] + '.html';
          }
        }
      ]
    }
  },
  plugins:[
    new ExtractTextWebpackPlugin({
      filename:'[name].min.css'
    }),
    new PurifyWebpack({
      path:glob.sync([
        path.join(__dirname,'./index.html'),
        path.join(__dirname,'./src/*.js')
      ])
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name:'manifest'
    }),
    new Webpack.ProvidePlugin({
      $:"jquery"
    }),
    new HtmlInlinkChunkPlugin({
      inlineChunks:['manifest']
    }),
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:'./index.html',
      chunks:['app'],
      minify:{
        collapseWhitespace:true
      }
    }),
    new Webpack.optimize.UglifyJsPlugin()
  ]
}