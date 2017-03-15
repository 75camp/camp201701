import express from 'express'
import webpack from 'webpack'
// import path from 'path'
import config from './webpack.dev.conf'
// import favicon from 'express-favicon'
import connectHistoryApiFallback from 'connect-history-api-fallback'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'


let compiler = webpack(config)
let app = express()


const HIGHLY_STABLE_RESOURCES_PATH = '/static'
// const FAVICON_PATH = '../favicon.ico'
const PORT = 9000
const URL = '127.0.0.1'


// for highly stable resources
app.use(HIGHLY_STABLE_RESOURCES_PATH, express.static(config.common.staticDir))
// for favicon
// app.use(favicon(path.join(__dirname, FAVICON_PATH)))
// handle fallback for HTML5 history API
app.use(connectHistoryApiFallback())

// serve webpack bundle output
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

// enable hot-reload and state-preserving
// compilation error display
app.use(webpackHotMiddleware(compiler))

app.listen(PORT, URL, err => {
  err && console.log(err)
})
