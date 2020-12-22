/*
 * @Author: mentals@foxmail.com 
 * @Date: 2020-11-06 18:23:08 
 * @Last Modified by: mentals@foxmail.com
 * @Last Modified time: 2020-12-22 11:39:37
 * @descrip: axios统一封装
 */

import axios from 'axios'
// import store from "@/store/";
// import storage from "t-storage";
import { Toast } from 'vant'
import { baseURL, time, retry, retryDelay } from "@/config/index";

/**
 * axios在0.18.1的版本之前可以自定义配置 axios源码 mergeConfig.js 第25行... 之后无法定制
 * 但是在当前 0.21.0中又可以自定义了,没有深究
 * 如果你使用了axios 0.18.1 <===> 0.21.0 之间的版本 请注意重复请求功能是否正常
 */
axios.defaults.timeout = time;
axios.defaults.retry = retry; // 自定义重复请求次数
axios.defaults.retryDelay = retryDelay; // 自定义重复请求间隔时间

// 正在进行中的请求列表
let reqList = []

/**
 * 阻止重复请求
 * @param {array} reqList - 请求缓存列表
 * @param {string} confog - 当前请求配置
 * @param {function} cancel - 请求中断函数
 * @param {string} errorMessage - 请求中断时需要显示的错误信息
 */
const stopRepeatRequest = function (reqList, config, cancel, errorMessage) {
  const errorMsg = errorMessage || ''

  if (reqList.length > 0) {
    for (let i = 0; i < reqList.length; i++) {
      if (reqList[i].url === config.url) {
        cancel(errorMsg)
        return
      }
    }
  }

  reqList.push({
    url: config.url,
  })
}

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {string} confog 当前请求配置
 */
const allowRequest = function (reqList, config) {
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i].url === config.url) {
      reqList.splice(i, 1)
      break
    }
  }
}

axios.interceptors.request.use(
  function (config) {
    // 为请求创建取消请求方法
    let cancel = null;
    config.cancelToken = new axios.CancelToken(function (c) {
      cancel = c
    })

    // 判断是否是重复请求
    stopRepeatRequest(reqList, config, cancel, '重复请求')

    // 是否显示loading 和提示词
    if (config.loading) {
      Toast.loading({
        message: config.loading || '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    Toast.clear()
    // 请求完成后 将请求从重复列表中移除
    allowRequest(reqList, response.config)

    // 各种判断 操作
    if (response.status == 200) {
      // store
      // storage
      // if (response.data.message) {
      // }
    } else {
      Toast.fail("服务器去火星了")
    }
    return response
  },

  function (error) {
    Toast.clear()
    // 请求超时后重新请求
    const { config, code, message } = error
    if (message.indexOf('timeout') !== -1 || code === 'ECONNABORTED') {
      Toast.fail('网络似乎不顺畅, 正在重试中...')
      // 超时再次请求不算重复请求
      allowRequest(reqList, config)
      //如果配置不存在或重试属性未设置，抛出promise错误
      if (!config || !config.retry) return Promise.reject(error);
      //设置一个变量记录重新请求的次数
      config.__retryCount = config.__retryCount || 0;
      // 检查重新请求的次数是否超过我们设定的请求次数
      if (config.__retryCount >= config.retry) {
        Toast.fail('网速超慢, 请稍候重试')
        return Promise.reject(error);
      }
      //重新请求的次数自增
      config.__retryCount += 1;
      // 创建新的Promise来处理重新请求的间隙
      var back = new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, config.retryDelay || 1);
      });
      //返回axios的实体，重试请求
      return back.then(function () {
        return axios(config);
      });

    } else {
      // Toast.fail(message) 重复请求
    }
    return Promise.reject(error)
  }
)

/**
 * 导出请求方法
 */
export function apiAxios(options) {
  let obj = {
    // headers: { 'token': '123' },
    baseURL: baseURL
  }

  Object.assign(options, obj)

  return new Promise((resolve, reject) => {
    axios(options).then((res) => {
      if (res) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
  // return axios(options)
}