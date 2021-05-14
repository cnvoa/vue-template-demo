import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './home' // 可维护多个不同的 子router
import about from './about' // 可维护多个不同的 子router
import category from './category' // 可维护多个不同的 子router

Vue.use(VueRouter)

// 解决页面进入同一个路由地址时，会报错的问题。
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const routes = [
  { path: '*', redirect: "/home" }
]

const router = new VueRouter({
  routes: [...routes, ...home, ...category, ...about]
})

export default router
