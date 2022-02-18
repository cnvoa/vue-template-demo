export default [
  {
    path: '/category',
    name: 'category',
    component: (resolve) => require(['@/views/category/index.vue'], resolve),
    meta: { title: "效果", depth: 0, showFooter: true, showHeader: false, showHeaderBack: false, login: false }
  }
  , {
    path: '/scrollA',
    name: 'scrollA',
    component: (resolve) => require(['@/views/category/scroll/scrollA.vue'], resolve),
    meta: { title: "测试滚动A", depth: 1, showFooter: false, showHeader: true, showHeaderBack: true, login: false }
  }
  , {
    path: '/scrollB',
    name: 'scrollB',
    component: (resolve) => require(['@/views/category/scroll/scrollB.vue'], resolve),
    meta: { title: "测试滚动B", depth: 2, showFooter: false, showHeader: true, showHeaderBack: true, login: false, scrollToTop: true }
  }
]