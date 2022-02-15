/*
 * @Author: mentals@foxmail.com 
 * @Date: 2020-11-11 18:54:38 
 * @Last Modified by: mentals@foxmail.com
 * @Last Modified time: 2020-11-11 18:57:00
 * @Description: 发生跳转的时候, 检查sessionStorage中有没有登录信息
 * 守卫登录状态 同时加载 NProgress 插件
 */

import router from "@/router/";
import store from "@/store/";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import storage from 't-storage'

router.beforeEach((to, from, next) => {
  // sessionStorage有登录信息 守卫vuex状态
  let userinfo = storage.session.data('user'); // 获取用户登录信息
  if (userinfo.loginData) {
    store.commit("LOGINSTATE", true) // 改变vuex中用户信息状态
    // store.commit("LOGINDATA", userinfo.loginData)
    // store.commit("USERINFODATA", userinfo.loginData)
  } else {
    if (store.state.loginState) { // 缓存中没有登录状态但是vuex中有登录状态 则刷新当前页面
      window.location.reload()
    }
  }

  // 守卫需要登录的页面
  if (to.meta.login) {
    if (store.state.loginState) {
      next()
      return
    } else {
      store.commit("LOGINPOPUP", !store.state.loginState)
      return
    }
  }

  NProgress.start() //头部加载进度条开始
  next()
})

router.afterEach(() => {
  NProgress.done() //头部加载进度条隐藏
})
