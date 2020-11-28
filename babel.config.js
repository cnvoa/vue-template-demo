// 使用process.env.VUE_APP_ENV 非正式production环境 依然输出console
const IS_PROD = ["production", "prod"].includes(process.env.VUE_APP_ENV);

const plugins = [
  ['import', {
    libraryName: 'vant',
    libraryDirectory: 'es',
    style: true
  }, 'vant']
]

// 如果是production环境则移除console.log
if (IS_PROD) {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins
}
