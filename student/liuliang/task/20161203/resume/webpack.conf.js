import path from 'path'
import webpack from 'webpack'
import NyanProgressPlugin from 'nyan-progress-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

const rootPath = path.resolve(__dirname, './') // 项目根目录
const src = path.join(rootPath, 'src') // 开发源码目录
const env = process.env.NODE_ENV.trim() // 当前环境
const common = {
  rootPath,
  dist: path.join(rootPath, 'dist'), // build 后输出目录
  indexHtml: path.join(src, 'index.html'), // 入口基页
  staticDir: path.join(rootPath, 'static') // 无需处理的静态资源目录
}

const config = {
  common,
  entry: {
    app: [
      path.join(src, 'app.js')
    ],
    vendors: []
  },
  output: {
    path: path.join(common.dist, 'static'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
    devtool: 'eval-source-map'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      // ================================
      // 自定义路径别名
      // ================================
      SCSS: path.join(common.staticDir, 'css/scss')
    }
  },
  resolveLoader: {
    root: path.join(rootPath, 'node_modules')
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: (function() {
        var _loaders = ['babel?' + JSON.stringify({
          cacheDirectory: true,
          plugins: [
            'transform-runtime',
            'transform-decorators-legacy'
          ],
          presets: ['es2015', 'stage-0'],
          env: {
            production: {
              presets: []
            }
          }
        }), 'eslint']
        return _loaders
      })(),
      include: src,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10240, // 10KB 以下使用 base64
        name: 'img/[name]-[hash:6].[ext]'
      }
    }, {
      test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      loader: 'url-loader?limit=10240&name=[name]-[hash:6].[ext]'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new NyanProgressPlugin(), // 进度条
    new webpack.optimize.CommonsChunkPlugin({
      // 公共代码分离打包
      names: ['vendors', 'mainfest'],
      minChunks: Infinity,
      filename: '[name].js'
    }),
    new webpack.DefinePlugin({
      'process.env': { // 这是给 React / Redux 打包用的
        NODE_ENV: JSON.stringify('production')
      },
      // ================================
      // 配置开发全局常量
      // ================================
      __DEV__: env === 'development',
      __PROD__: env === 'production',
      __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
      __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: common.indexHtml,
      chunksSortMode: 'none'
    }),
    new webpack.ProvidePlugin({
    }),
    new BrowserSyncPlugin({
      host: '127.0.0.1',
      port: 9090,
      proxy: 'http://127.0.0.1:9000/',
      logConnections: false,
      notify: false
    }, {
      reload: true
    })
  ]
}
export default config