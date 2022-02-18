export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/home.vue'),
    meta: { title: "首页", depth: 0, showFooter: true, showHeader: false, showHeaderBack: false, login: false }
  }
  , {
    path: '/vuex',
    name: 'vuex',
    component: () => import('@/views/home/vuex/vuex.vue'),
    meta: { title: "vuex", depth: 1, showFooter: false, showHeader: true, showHeaderBack: true, login: false }
  }
]