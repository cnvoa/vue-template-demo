import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const routes = [
  { path: '*', redirect: "/home" }
  , {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/home.vue'),
    meta: { title: "首页", depth: 0, showFooter: true, showHeader: false, showHeaderBack: false, login: false }
  }
  , {
    path: '/category',
    name: 'category',
    component: (resolve) => require(['@/views/category/index.vue'], resolve),
    meta: { title: "效果", depth: 0, showFooter: true, showHeader: false, showHeaderBack: false, login: false }
  }
  , {
    path: '/about',
    name: 'about',
    // route level code-splitting 
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/about.vue'),
    meta: { title: "关于我", depth: 0, showFooter: true, showHeader: false, showHeaderBack: false, login: false }
  }
  , {
    path: '/vuex',
    name: 'vuex',
    component: (resolve) => require(['@/views/home/vuex/vuex.vue'], resolve),
    meta: { title: "vuex", depth: 1, showFooter: false, showHeader: true, showHeaderBack: true, login: false }
  }
]

const router = new VueRouter({
  routes
})

export default router
