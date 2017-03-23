var webpack = require('webpack')
var path = require('path')

module.exports = {
  devtool: 'eval-source-map', // 配置生成Source Maps，选择合适的选项
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/, loader: 'style!css'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader', // 在webpack的module部分的loaders里进行配置即可
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [

    new webpack.HotModuleReplacementPlugin()// 热加载插件
  ],
  devServer: {
    contentBase: __dirname, // 本地服务器所加载的页面所在的目录
    // colors: true,//终端中输出结果为彩色
    historyApiFallback: true, // 不跳转
    inline: true// 实时刷新
  }
}
