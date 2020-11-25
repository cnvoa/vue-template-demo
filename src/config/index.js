/*
 * @Author: mentals@foxmail.com 
 * @Date: 2020-11-06 18:36:14 
 * @Last Modified by: mentals@foxmail.com
 * @Last Modified time: 2020-11-13 18:58:08
 * @Description: 项目需要的公共配置 以常量的形式保存这里 并输出
 * 可以根据自己的需要进行扩充
 */

//根据环境引入不同配置 process.env.VUE_APP_ENV
const environment = process.env.VUE_APP_ENV || 'development'
const config = require('./env.' + environment)
module.exports = config
