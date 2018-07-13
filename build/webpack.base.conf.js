var path = require('path') // 使用 NodeJS 自带的文件路径插件
var utils = require('./utils') // 引入一些小工具
var config = require('../config') // 引入 config/index.js
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) { // 拼接我们的工作区路径为一个绝对路径
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js' // 编译文件入口
  },
  output: {
    path: config.build.assetsRoot, // 编译输出的静态资源根路径
    filename: '[name].js', // 编译输出的文件名
    publicPath: '/'
  },
  resolve: {
    // 自动补全的扩展名
    extensions: ['.js', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}
