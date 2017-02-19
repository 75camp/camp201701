import webpack from 'webpack'
import config from './webpack.base.conf'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
const SOURCE_MAP = false

config.output.filename = 'dist/js/[name].[chunkhash:6].js'
config.output.chunkFilename = 'dist/js/[id].[chunkhash:6].js'
config.devtool = SOURCE_MAP ? 'source-map' : false





// 生产环境下分离出 CSS 文件
config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css!resolve-url')
}, {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style', 'css!resolve-url!less')
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass')
})

config.plugins.push(
  new CleanWebpackPlugin('dist', {
    root: config.commonPath.rootPath,
    verbose: false
  }),
  new CopyWebpackPlugin([ // 复制高度静态资源
    {
      context: config.commonPath.staticDir,
      from: '**/*',
      ignore: ['*.md']
    }
  ]),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    // 公共代码分离打包
    names: ['vendor', 'mainifest']
  }),
  new ExtractTextPlugin('dist/css/[name].[contenthash:6].css', {
    allChunks: true // 若要按需加载 CSS 则请注释掉该行
  }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: '../index/index.html',
      title: '小牛美股',
      chunks: ['index', 'vendors', 'mainfest'],
      template: config.commonPath.indexHtml,
      chunksSortMode: 'none'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: '../inmoney/first-step/index.html',
      title: '小牛美股-＞入金指引首页',
      chunks: ['inmoney-first-step', 'vendors', 'mainfest'],
      template: config.commonPath.inmoneyFirstStepHtml,
      chunksSortMode: 'none'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: '../inmoney/second-step/index.html',
      title: '小牛美股-＞入金指引第二步',
      chunks: ['inmoney-second-step', 'vendors', 'mainfest'],
      template: config.commonPath.inmoneySecondStepHtml,
      chunksSortMode: 'none'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: '../inmoney/third-step/index.html',
      title: '小牛美股-＞入金指引第三步',
      chunks: ['inmoney-third-step', 'vendors', 'mainfest'],
      template: config.commonPath.inmoneyThirdStepHtml,
      chunksSortMode: 'none'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: '../contact/index.html',
      title: '小牛美股-＞联系我们首页',
      chunks: ['contact-index', 'vendors', 'mainfest'],
      template: config.commonPath.contactHtml,
      chunksSortMode: 'none'
    }),
)

export default config
