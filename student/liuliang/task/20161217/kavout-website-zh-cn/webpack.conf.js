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
  indexHtml: path.join(src, 'index', 'index.html'), // 入口基页
  inmoneyFirstStepHtml: path.join(src, 'inmoney', 'first-step/index.html'), // 入金指引首页
  inmoneySecondStepHtml: path.join(src, 'inmoney', 'second-step/index.html'), // 入金指引第二步
  inmoneyThirdStepHtml: path.join(src, 'inmoney', 'third-step/index.html'), // 入金指引第三步
  contactHtml: path.join(src, 'contact', 'index.html'), // 关于我们
  headerHtml: path.join(src, 'header', 'index.html'), // 头部
  footerHtml: path.join(src, 'footer', 'index.html'), // 底部
  staticDir: path.join(rootPath, 'static') // 无需处理的静态资源目录
}

const config = {
  common,
  context: src,
  entry: {
    'index': [
      path.join(src, 'index', 'app.js')
    ],
    'inmoney-first-step': [
      path.join(src, 'inmoney', 'first-step/app.js')
    ],
    'inmoney-second-step': [
      path.join(src, 'inmoney', 'second-step/app.js')
    ],
    'inmoney-third-step': [
      path.join(src, 'inmoney', 'third-step/app.js')
    ],
    'contact-index': [
      path.join(src, 'contact', 'app.js')
    ],
    vendors: ['toggle']
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
      SCSS: path.join(common.staticDir, 'css/scss'),
      JS: path.join(common.staticDir, 'js'),
      IMAGE: path.join(common.staticDir, 'img'),
      rem: path.join(common.staticDir, 'js/vendors/rem.js'),
      toggle: path.join(common.staticDir, 'js/components/toggle.js')
    },
    // root: [rootPath]
    modulesDirectories: [
      'node_modules'
    ]
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
      test: /\.(png|jpe?g|gif|ico)$/,
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
      // loader: 'style!css!resolve-url-loader'
      loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
    }, {
      test: /\.scss$/,
      // loader: 'style!css!resolve-url-loader!sass'
      loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      // loaders: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!resolve-url-loader!sass-loader?sourceMap')
    }, {
        test: /\.html$/,
        loader: 'html-loader',
        // loader: 'file-loader?name=[path][name].[ext]!extract-loader!html-loader?minimize=true&attrs[]=img:src&attrs[]=img:data-src',
        // exclude: /(header|footer)\/index\.html$/,
        // exclude: /index\/index\.html$/
        query: {
          minimize: true
        }
    }]
  },
  // htmlLoader: {
  //   ignoreCustomFragments: [/\{\{.*?}}/],
  //   root: '.',
  //   attrs: ['img:src', 'link:href', 'img:ng-src', 'video:src']
  // },
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
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      title: '小牛美股',
      chunks: ['index', 'vendors', 'mainfest'],
      template: common.indexHtml,
      chunksSortMode: 'none'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'inmoney/first-step/index.html',
      title: '小牛美股->入金指引首页',
      chunks: ['inmoney-first-step', 'vendors', 'mainfest'],
      template: common.inmoneyFirstStepHtml,
      chunksSortMode: 'none'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'inmoney/second-step/index.html',
      title: '小牛美股->入金指引第二步',
      chunks: ['inmoney-second-step', 'vendors', 'mainfest'],
      template: common.inmoneySecondStepHtml,
      chunksSortMode: 'none'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'inmoney/third-step/index.html',
      title: '小牛美股->入金指引第三步',
      chunks: ['inmoney-third-step', 'vendors', 'mainfest'],
      template: common.inmoneyThirdStepHtml,
      chunksSortMode: 'none'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'contact/index.html',
      title: '小牛美股->联系我们首页',
      chunks: ['contact-index', 'vendors', 'mainfest'],
      template: common.contactHtml,
      chunksSortMode: 'none'
    }),
    new webpack.ProvidePlugin({
      _: 'underscore'
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
  // resolveUrlLoader: {
  //   root: rootPath
  // }
}
export default config



