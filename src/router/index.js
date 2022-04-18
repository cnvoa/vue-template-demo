import Vue from 'vue'
import VueRouter from 'vue-router'
import storage from 't-storage'
import store from "@/store/";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'

Vue.use(VueRouter)

// 解决页面进入同一个路由地址时，会报错的问题。
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const router = new VueRouter({
  routes: [
    { path: '*', redirect: "/home" },
    ...routes
  ],
  scrollBehavior(to, from, saveTop) {
    console.log(to);
    console.log(from);
    if (saveTop) {
      return saveTop;
    } else {
      if (to.name != from.name && to.meta.scrollToTop) {
        return { x: 0, y: 0 }
      }
    }
  }
})


/*
 * @Author: mentals@foxmail.com 
 * @Date: 2020-11-11 18:54:38 
 * @Last Modified by: mentals@foxmail.com
 * @Last Modified time: 2020-11-11 18:57:00
 * @Description: 发生跳转的时候, 检查sessionStorage中有没有登录信息
 * 守卫登录状态 同时加载 NProgress 插件
 */

let RR 
router.beforeEach((to, from, next) => {
  NProgress.start() //头部加载进度条开始
  
  if (/\/login|\/reset/.test(to.path)) {
    next()
    return
  }
  
  if (!RR) {
    // sessionStorage有登录信息 守卫vuex状态
    let userinfo = storage.session.data('user'); // 获取用户登录信息
    if (userinfo.loginData) {
      RR = userinfo.AA
      store.commit("LOGINDATA", userinfo.loginData)
      next({...to})
      return
    } else {
      // 没有登录信息的时候 判断push的页面是否需要登录
      // 守卫需要登录的页面
      if (to.meta.login) {
        next("/login")
        return
      }else{
        next()
        return
      }
    }

  } else if (to.path === '/') {
    next('/home')
    return
  }else {
    next()
    return
  }
})

router.afterEach(() => {
  NProgress.done() //头部加载进度条隐藏
})


export default router
