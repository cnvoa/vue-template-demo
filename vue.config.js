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
  }
}
