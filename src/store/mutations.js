import * as types from "./mutations-type";

export default{
  // 缓存的页面 添加或者剔除
  [types.STORAGEPAGE](state, payload) {
    if (payload.type == "add") {
      state.keepAlive.push(payload.value)
    } else {
      let index = state.keepAlive.indexOf(payload.value)
      state.keepAlive.splice(index, 1)
    }
  },
  // 异步测试
  [types.ASYNC](state, payload){
    state.asyncTest = payload.value
  },
  // 同步测试
  [types.SYNC](state, payload){
    state.syncTest = payload.value
  }
}
