import Vue from "vue";
import vuex from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

Vue.use(vuex)

const state = {
  keepAlive: [
    "Home"
  ],
  asyncTest: 1, // vuex测试数据 异步
  syncTest: 1, // vuex测试数据 同步
  count: 0, // 测试getter
}

export default new vuex.Store({
  state,
  mutations,
  getters,
  actions
})
