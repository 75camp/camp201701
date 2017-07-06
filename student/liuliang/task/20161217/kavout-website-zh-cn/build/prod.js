import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import config from './webpack.prod.conf'
webpack(config, (err, stats) => {
  if (err) throw new Error(err)
  // console.log(stats.toString({ chunks: false, color: true }))
  fs.writeFile(path.join(config.commonPath.dist, '__build_info__'), stats.toString({ color: false }))
})
