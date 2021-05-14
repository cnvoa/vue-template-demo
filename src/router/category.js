export default [
  {
    path: '/category',
    name: 'category',
    component: (resolve) => require(['@/views/category/index.vue'], resolve),
    meta: { title: "效果", depth: 0, showFooter: true, showHeader: false, showHeaderBack: false, login: false }
  }
]