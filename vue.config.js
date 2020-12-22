'use strict'
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const defaultSettings = require('./src/config/index.js')
const name = defaultSettings.title || 'vue mobile template'

// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: { 
    css: [],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js'
    ]
  }
}

module.exports = {
  productionSourceMap: false,
  publicPath: '/vue/', //资源拼接路径
  outputDir: "dist/vue/", // 打包后输出文件的目录
  assetsDir: "static", //  outputDir的静态资源(js、css、img、fonts)目录

  lintOnSave: true, //是否在保存的时候使用 `eslint-loader` 进行检查。
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
        changeOrigin: true, // 支持跨域 是否修改请求头中的host
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
  configureWebpack: config => {
    // 为生产环境修改配置...
    if (IS_PROD) {
      /**
       * externals  为引入cdn准备
       * 决定是否使用cdn时 请注意这里的代码注释 不然打包的时候会报错
       */
      // config.externals = {
      //   vue: 'Vue',
      //   'vue-router': 'VueRouter',
      //   vuex: 'Vuex',
      //   axios: 'axios'
      // }

      // 预渲染
      const PrerenderSPAPlugin = require('prerender-spa-plugin')
      const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

      return {
        plugins: [
          new PrerenderSPAPlugin({
            staticDir: path.join(__dirname, 'dist'), // 读取vue-cli已打包文件的根目录 prerender-spa-plugin会在这里开启一个服务
            outputDir: path.join(__dirname, '/dist/vue/'), //经过prerender-spa-plugin处理的文件最终保存的地方
            indexPath: path.join(__dirname, 'dist/vue/index.html'), // 指定入口html
            routes: ['/', '/about'], // 哪些路由页面需要预渲染
            minify: {
              minifyCSS: true, // css压缩
              removeComments: true // 移除注释
            },
            renderer: new Renderer({
              inject: {
                foo: 'bar'
              },
              headless: false,
              renderAfterDocumentEvent: 'render-event',
              args: ['--no-sandbox', '--disable-setuid-sandbox']
            })
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件 html页面
    config.plugins.delete('prefetch')
    // 移除 preload 插件 html页面
    config.plugins.delete('preload')

    // https://webpack.js.org/configuration/devtool/#development
    config.when(!IS_PROD, config => config.devtool('cheap-source-map'))

    // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
    config.resolve.alias
      // .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .end();

    // 注入cdn路径 需要在public index.html里面展开
    config.plugin('html').tap(args => {

      args[0].cdn = cdn.build // 这里只是为html模板展开提供数据，最终打包cdn起效果的还是 config.externals，打包时报错请注意config.externals

      args[0].title = name // 注入html title
      return args
    })

    // 拆分第三方模块并单独打包
    config.when(IS_PROD, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 将 runtime 作为内联引入不单独存在
            inline: /runtime\..*\.js$/
          }
        ]).end()

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3, //  被至少用三次以上打包分离
            priority: 5, // 优先级
            reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'initial', // 只打包初始时依赖的第三方
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          },
          vantUI: {
            name: 'chunk-vantUI', // 单独将 vantUI 拆包
            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })

    // 压缩图片
    config.module
      .rule("images")
      .test(/\.(gif|png|jpe?g|svg)$/i)
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false }
        // webp: { quality: 75 } // 支不支持webp
      });

    if (IS_PROD) {
      // 打包分析
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static"
        }
      ]);
    }
  }
}
