import Vue from 'vue'
import Main from './main.vue'

const LoadingConstructor = Vue.extend(Main)

let instance
const Loading = {
  show (options) {
    options = options || {}
    instance = new LoadingConstructor({
      data: options
    })
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    return instance.vm
  },
  hide () {
    if (instance) {
      instance.vm.loading = false
    }
  }
}
export default Loading
