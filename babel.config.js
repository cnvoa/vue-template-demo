const plugins = [
  ['import', {
    libraryName: 'vant',
    libraryDirectory: 'es',
    style: true
  }, 'vant']
]

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins
}
