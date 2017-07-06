import path from 'path'
import webpack from 'webpack'
import NyanProgressPlugin from 'nyan-progress-webpack-plugin'

const rootPath = path.resolve(__dirname, '../') // 项目根目录
const src = path.join(rootPath, 'src') // 开发源码目录
const env = process.env.NODE_ENV.trim() // 当前环境
const commonPath = {
  rootPath,
  dist: path.join(rootPath, 'dist'), // build 后输出目录
  indexHTML: path.join(src, 'index', 'index.html'), // 入口基页
  inmoneyFirstStepHtml: path.join(src, 'inmoney', 'first-step/index.html'), // 入金指引首页
  inmoneySecondStepHtml: path.join(src, 'inmoney', 'second-step/index.html'), // 入金指引第二步
  inmoneyThirdStepHtml: path.join(src, 'inmoney', 'third-step/index.html'), // 入金指引第三步
  contactHtml: path.join(src, 'contact', 'index.html'), // 关于我们
  staticDir: path.join(rootPath, 'static') // 无需处理的静态资源目录
}
export default {
  commonPath,
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
    // ================================
    // 框架 / 类库 分离打包
    // ================================
    vendor: [
      'toggle'
    ]
  },
  output: {
    path: path.resolve(commonPath.dist, 'static'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', 'json'],
    alias: {
      // ================================
      // 自定义路径别名
      // ================================
      SCSS: path.join(commonPath.staticDir, 'css/scss'),
      JS: path.join(commonPath.staticDir, 'js'),
      IMAGE: path.join(commonPath.staticDir, 'img'),
      rem: path.join(commonPath.staticDir, 'js/vendors/rem.js'),
      toggle: path.join(commonPath.staticDir, 'js/components/toggle.js')
    },
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
          // presets: ['es2015', 'react', 'stage-0']
          presets: ['es2015', 'stage-0']
          // env: {
          //   production: {
          //     presets: ['react-optimize']
          //   }
          // }
        }), 'eslint']

        // 开发环境下引入 React Hot Loader
        if (env === 'development') {
          _loaders.unshift('react-hot')
        }
        return _loaders
      })(),
      include: src,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'html',
      query: {
        minimize: true
      }
    }, {
      // test: /\.(png|jpe?g|gif|svg)$/,
      test: /\.(png|jpe?g|gif)$/,
      loader: 'url',
      query: {
        limit: 10240, // 10KB 以下使用 base64
        name: env === 'development' ? 'img/[name]-[hash:6].[ext]' : 'dist/img/[name]-[hash:6].[ext]'
      }
    }, {
      // test: /\.(woff2?|eot|ttf|otf)$/,
      test: /\.(svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url',
      query: {
        limit: 10240, // 10KB 以下使用 base64
        name: env === 'development' ? 'fonts/[name]-[hash:6].[ext]' : 'dist/fonts/[name]-[hash:6].[ext]'
      }
      // loader: 'url-loader?limit=10240&name=fonts/[name]-[hash:6].[ext]'
    }]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new NyanProgressPlugin(), // 进度条
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
    })
  ]
}
