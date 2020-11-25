import * as types from "./mutations-type";

export default {
  // 缓存的页面 添加或者剔除
  longSet({ commit }, payload) {
    setTimeout(() => {
      commit(types.ASYNC, payload)
    }, 2000);
  },
}