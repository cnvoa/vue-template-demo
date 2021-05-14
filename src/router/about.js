export default [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting 
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/about.vue'),
    meta: { title: "关于我", depth: 0, showFooter: true, showHeader: false, showHeaderBack: false, login: false }
  }
]