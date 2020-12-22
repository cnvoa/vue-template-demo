import Vue from 'vue'

// 公共cdn地址 供js调用
// 部署路径供预渲染调用
import { $cdn, serverPath, linkURL } from "@/config/index";
Vue.prototype.$cdn = $cdn
Vue.prototype.$linkURL = serverPath ? linkURL + "/" + serverPath : linkURL

// storage
import storage from "t-storage";
Vue.prototype.$storage = storage

// import emptyLoading from "@/components/empty/emptyLoading";
// Vue.component("empty", emptyLoading)

// import empty from "@/components/empty/empty";
// Vue.component("emptymsg", empty)

// 头部navbar
import header from "@/components/nav/navbar";
Vue.component('Nav-header', header)