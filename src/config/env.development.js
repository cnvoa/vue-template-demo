/**本地环境配置
 * axios 0.18.1以后的版本不支持自定义属性  这里需要修改 axios源码 mergeConfig.js 第25行
 */
module.exports = {
  title: '我是开发名称',
  
  baseURL: '/apis', // 项目地址
  time: 6000, // 请求持续时间
  retry: 2, // 请求次数
  retryDelay: 1000, // 请求间隙

  APPID: 'xxx',
  APPSECRET: 'xxx',
  redirect: '',

  $cdn: 'https://s3.jpg.cm' // css cdn图片前缀
}