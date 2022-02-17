import Vue from 'vue'

// 公共cdn地址 供js调用
import { $cdn } from "@/config/index";
Vue.prototype.$cdn = $cdn

// storage
import storage from "t-storage";
Vue.prototype.$storage = storage

import lloading from "@/components/total/loading"
Vue.prototype.$lloading = lloading

// 头部navbar
import header from "@/components/nav/navbar";
Vue.component('Nav-header', header)