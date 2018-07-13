let config = require('../config')
let webpackCon = require('./webpack.dev.conf')

let path = require('path')
let express = require('express')
let webpack = require('webpack')

let app = express()
let compiler = webpack(webpackCon)

let devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '',
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})