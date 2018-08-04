var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/script/main.js',
    a:'./src/script/a.js',
    b:'./src/script/b.js',
    c:'./src/script/c.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name]-[chunkhash].js',
    publicPath:'http://cdn.cn'//上线地址
  },
  plugins:[
    //多页面
    new htmlWebpackPlugin({
      filename: 'a.html',
      template: 'index.html',
      inject:'body',//js 注入头部
      title: 'this is a.html',
      chunks:['main','a'],//只加载main。两个模块
      excludeChunks:['b','c']//排除bc 其余都加载进来
    }),
    new htmlWebpackPlugin({
      filename: 'b.html',
      template: 'index.html',
      inject:'body',//js 注入头部
      title: 'this is b.html',
      chunks:['b']
    }),
    new htmlWebpackPlugin({
      filename: 'c.html',
      template: 'index.html',
      inject:'body',//js 注入头部
      title: 'this is c.html',
      chunks:['c']
    })
  ]
}