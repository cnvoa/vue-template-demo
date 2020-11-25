import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 导入vant
import '@/plugins/vant'
// 导入prototype
import '@/plugins/prototype'
// 导入路由守卫
import '@/guard/router.guard'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
