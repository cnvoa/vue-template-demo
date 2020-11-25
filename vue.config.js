const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const defaultSettings = require('./src/config/index.js')

module.exports = {
  productionSourceMap: false,
  publicPath: './',
  assetsDir: "static",
  devServer: {
    open: true,  // npm run serve后自动打开页面
    port: 9527, // 开发服务器运行端口号
    compress: true, // 是否开启gzip压缩
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    },
    proxy: {
      '/apis': {
        target: 'https://api.muxiaoguo.cn',
        changeOrigin: true, // 支持跨域
        pathRewrite: {
          '^/apis': ''
        }
      }, // 可以跨域多个
      // '/test': {
      //   target: 'https://api.xxxx.cn',
      //   changeOrigin: true, // 支持跨域
      //   pathRewrite: {
      //     '^/test': ''
      //   }
      // }
    }
  },
  /**
   * 导入公共scss
   * 可以在css中拼接 $cdn 图片路径
   */
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `
        @import "@assets/css/index.scss";
        $cdn: "${defaultSettings.$cdn}";
        `
      }
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件 html页面
    config.plugins.delete('prefetch')
    // 移除 preload 插件 html页面
    config.plugins.delete('preload')
    
    // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
    config.resolve.alias
      // .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .end();

  }
}
