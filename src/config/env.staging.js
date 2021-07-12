// 预发布环境
module.exports = {
  title: 'vue-template-demo-staging',

  baseURL: 'https://api.muxiaoguo.cn/', // 项目地址
  time: 6000, // 请求持续时间
  retry: 2, // 请求次数
  retryDelay: 1000, // 请求间隙

  APPID: 'xxx',
  APPSECRET: 'xxx',
  redirect: '',

  $cdn: 'https://s3.jpg.cm' // css cdn图片前缀
}