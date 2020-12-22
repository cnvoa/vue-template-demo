// 预发布环境
module.exports = {
  serverPath: '', // 部署在服务器上时，相对于根目录的二级目录，部署在域名根目录时，请保持为空
  title: 'vue-template-demo-staging',

  baseURL: 'https://api.muxiaoguo.cn/', // 项目地址
  linkURL: 'http://test2.huiche51.com', // 访问地址 不要 /
  time: 6000, // 请求持续时间
  retry: 2, // 请求次数
  retryDelay: 1000, // 请求间隙

  APPID: 'xxx',
  APPSECRET: 'xxx',
  redirect: '',

  $cdn: 'https://s3.ax1x.com' // css cdn图片前缀
}