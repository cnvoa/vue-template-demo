import Vue from 'vue'

import utils from "@/utils/utils"
Vue.use(utils)

// 公共cdn地址 供js调用
import { $cdn } from "@/config/index";
Vue.prototype.$cdn = $cdn

// storage
import storage from "t-storage";
Vue.prototype.$storage = storage

import ttoast from "@/components/toast"
Vue.prototype.$ttoast = ttoast

import lloading from "@/components/loading"
Vue.prototype.$lloading = lloading

import ddialog from "@/components/dialog"
Vue.prototype.$ddialog = ddialog

// import emptyLoading from "@/components/empty/emptyLoading";
// Vue.component("empty", emptyLoading)

// import empty from "@/components/empty/empty";
// Vue.component("emptymsg", empty)

// 头部navbar
import header from "@/components/nav/navbar";
Vue.component('Nav-header', header)