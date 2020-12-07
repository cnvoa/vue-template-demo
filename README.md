# vue-template-demo
<div align="center"><img src="https://s3.ax1x.com/2020/11/19/DuKPSI.gif" width="100" /></div>

基于 vue-cli4.0 + webpack 4 + vant ui + sass + rem+vw 适配方案+axios 封装，构建手机端模板脚手架

csdn: [vue-cli-4 移动端脚手架模板vue-template-demo](https://blog.csdn.net/joy1793/article/details/110798660)

查看 [demo](http://test2.huiche51.com/test/vuecli4) 建议手机端查看

### Node 版本要求

`Vue CLI` 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。你可以使用 [nvm](https://github.com/nvm-sh/nvm) 或
[nvm-windows](https://github.com/coreybutler/nvm-windows) 或 [n](https://github.com/tj/n) 在同一台电脑中管理多个 Node 版本。

本示例基于 Node.js 14.15.0

### 启动项目

```bash

git clone https://github.com/cnvoa/vue-template-demo.git

cd vue-template-demo

npm install

npm run serve
```

<span id="top">目录</span>


- [√ 配置多环境变量](#env)
- [√ rem 适配方案](#rem)
- [√ vw 适配方案](#vw)
- [√ vw-rem 适配方案](#vw-rem)
- [√ VantUI 组件按需加载](#vant)
- [√ Sass 全局样式](#sass)
- [√ Vuex 状态管理](#vuex)
- [√ Vue-router](#router)
- [√ Axios 封装及接口管理](#axios)
- [√ 转场动画](#animate)
- [√ Webpack 4 vue.config.js 基础配置](#base)
- [√ 配置 alias 别名](#alias)
- [√ 配置 proxy 跨域](#proxy)
- [√ 配置 打包分析](#bundle)
- [√ 配置 externals 引入 cdn 资源 ](#externals)
- [√ 去掉 console.log ](#console)
- [√ 压缩图片](#compress)
- [√ splitChunks 单独打包第三方模块](#chunks)
- [√ 添加 IE 兼容 ](#ie)
- [√ Eslint+Pettier 统一开发规范 ](#pettier)

### <span id="env">✅ 配置多环境变量 </span>

`package.json` 里的 `scripts` 配置 `serve` `staging` `build`，通过 `--mode xxx` 来执行不同环境

- 通过 `npm run serve` 启动本地 , 执行 `development`
- 通过 `npm run staging` 打包测试 , 执行 `staging`
- 通过 `npm run build` 打包正式 , 执行 `production`

```javascript
"scripts": {
  "serve": "vue-cli-service serve",
  "staging": "vue-cli-service build --mode staging",
  "build": "vue-cli-service build",
}
```

##### 配置介绍

&emsp;&emsp;以 `VUE_APP_` 开头的变量，在代码中可以通过 `process.env.VUE_APP_` 访问。  
&emsp;&emsp;比如,`VUE_APP_ENV = 'development'` 通过`process.env.VUE_APP_ENV` 访问。  
&emsp;&emsp;除了 `VUE_APP_*` 变量之外，在你的应用代码中始终可用的还有两个特殊的变量`NODE_ENV` 和`BASE_URL`

在项目根目录中新建`.env.*`

- .env.development 本地开发环境配置 (缩写.env)

```bash
NODE_ENV='development'
# must start with VUE_APP_
VUE_APP_ENV = 'development'

```

- .env.staging 测试环境配置

```bash
NODE_ENV='production'
# must start with VUE_APP_
VUE_APP_ENV = 'staging'
```

- .env.production 正式环境配置

```bash
 NODE_ENV='production'
# must start with VUE_APP_
VUE_APP_ENV = 'production'
```

这里我们并没有定义很多变量，只定义了基础的 VUE_APP_ENV `development` `staging` `production`  
变量我们统一在 `src/config/env.*.js` 里进行管理。

这里有个问题，既然这里有了根据不同环境设置变量的文件，为什么还要去 config 下新建三个对应的文件呢？  
- **修改起来方便，不需要重启项目，符合开发习惯。**
- **代码中不会嵌入过多的process.env全局变量。**

config/index.js

```javascript
// 根据环境引入不同配置 process.env.NODE_ENV
const config = require('./env.' + process.env.VUE_APP_ENV)
module.exports = config
```

配置对应环境的变量，拿本地环境文件 `env.development.js` 举例，用户可以根据需求修改

```javascript
// 本地环境配置
module.exports = {
  title: 'vue-template-demo',
  baseUrl: 'http://localhost:9527', // 项目地址
  baseApi: 'https://test.xxx.com/api', // api请求地址
  APPID: 'xxx',
  APPSECRET: 'xxx'
}
```

根据环境不同，变量就会不同了

```javascript
// 根据环境不同引入不同baseApi地址
import { baseApi } from '@/config'
console.log(baseApi)
```

[▲ 回顶部](#top)

### <span id="rem">✅ rem 适配方案 </span>

Vant 中的样式默认使用`px`作为单位，如果需要使用`rem`单位，推荐使用以下两个工具:

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 `postcss` 插件，用于将单位转化为 `rem`
- ~~[lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 `rem` 基准值~~ (这种方式可以放弃了，视自己情况而定)

##### PostCSS 配置

下面提供了一份基本的 `postcss` 配置，可以在此配置的基础上根据项目需求进行修改

```javascript
// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
```

更多详细信息： [vant](https://youzan.github.io/vant/#/zh-CN/advanced-usage) , [vant-zh](https://vant-contrib.gitee.io/vant/#/zh-CN/advanced-usage)

**新手必看，老鸟跳过**

很多小伙伴会问我，适配的问题。因为我们使用的是 Vant UI，所以必须根据 Vant UI 375 的设计规范走。
- 要么我们的设计图也是用375px的宽度
- 要么设计图用750px的宽度 使用工具转换成375px的宽度(比如**蓝湖**，**sass**)

使用`postcss-pxtorem`，并将`rootValue`设置成`37.5`就是为了将Vant UI的px尺寸转成rem尺寸。

那如果我们自己的设计给出的图是750px宽度的呢？
- 我们可以将`750px`宽度的设计图上传到蓝湖，通过蓝湖的换算功能得到`375px`宽度的尺寸。使用`postcss-pxtorem`，换算项目里面所有的px，得到rem。
- 在sass中定义一个方法，接收一个`px`尺寸，然会返回一个`rem`单位的尺寸，在vw-layout.scss文件中已经定义了一个`px2rem`方法，调用如下
```css
h2{
  margin: 10px 0 0 20px;
  font-size: px2rem(28);
  font-weight: 500;
  color: #666;
}
```
上面`font-size`通过sass的方法就被转换成了rem的单位尺寸，这个方法里面第一步就把750px宽度的尺寸转换成和vant UI同比例的尺寸然后直接转换成rem。

这里sass方法`px2rem`把px直接转换成了rem，**postcss-pxtorem**插件就不能转换使用了`px2rem`方法的css，解决方案是在**PostCSS 配置**里面屏蔽src目录。

如果采用了**sass** `px2rem` 方法，就相当于 `postcss-pxtorem`插件只转换vant UI，其余项目的css使用了sass转换，最后得到的结果都是一样的。
当然你也可以在`px2rem` 方法中只计算px尺寸，rem转换全丢给`postcss-pxtorem`插件

**下面就大搞普及一下 rem**。

我们知道 `1rem` 等于`html` 根元素设定的 `font-size` 的 `px` 值。Vant UI 设置 `rootValue: 37.5`,你可以看到在 iPhone 6 下
看到 （`1rem 等于 37.5px`）：

```html
<html data-dpr="1" style="font-size: 37.5px;"></html>
```

切换不同的机型，根元素可能会有不同的`font-size`。当你写 css px 样式时，会被程序换算成 `rem` 达到适配。

因为我们用了 Vant 的组件，需要按照 `rootValue: 37.5` 来写样式。

举个例子：设计给了你一张 750px \* 1334px 图片，在 iPhone6 上铺满屏幕,其他机型适配。

- 当`rootValue: 75` , 样式 `width: 750px;height: 1334px;` 图片会撑满 iPhone6 屏幕，这个时候切换其他机型，图片也会跟着撑
  满。
- 当`rootValue: 37.5` 的时候，样式 `width: 375px;height: 667px;` 图片会撑满 iPhone6 屏幕。

也就是 iphone 6 下 375px 宽度写 CSS。其他的你就可以根据你设计图，去写对应的样式就可以了。

当然，想要撑满屏幕你可以使用 100%，这里只是举例说明。

```html
<img class="image" src="https://imgs.solui.cn/weapp/logo.png" />

<style>
  /* rootValue: 75 */
  .image {
    width: 750px;
    height: 1334px;
  }
  /* rootValue: 37.5 */
  .image {
    width: 375px;
    height: 667px;
  }
</style>
```

[▲ 回顶部](#top)

### <span id="vw">✅ vm 适配方案 </span>

其实无论你使用哪种方案，都不需要你去计算 12px 是多少 rem 或者 vw, 会有专门的工具去帮你做
。如果你想用 vw，你可以按照下面的方式切换。

#### 1.安装依赖

```bash

npm install postcss-px-to-viewport -D

```

#### 2.修改 .postcssrc.js

将根目录下 .postcssrc.js 文件修改如下

```javascript
// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    },
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    }
  }
}
```

#### 3.删除原来的 rem 相关代码

package.json 删除如下代码

```javascript
"postcss-pxtorem": "^5.1.1",
```

运行起来，F12 元素 css 就是 vw 单位了

[▲ 回顶部](#top)

### <span id="vw-rem">✅ vm-rem 适配方案 </span>
本项目采用这种方案，并且也推荐这种方案，vm-rem布局结合了vm布局和rem布局的优点，无任何额外依赖，只需要rem转换插件，无vw适配方案的缺点。

#### 1.设置html的font-size
在assets/css/vm-layout.scss中一个`root-font-size`混合方法，它给`html`设置了`font-size`，给`body`设置了最大最小宽度。在index.scss中引入，并在loader编译生效。

**这里 `html` 的 `font-size` 在 `iphone6` 下是 `37.5px`**

#### 2.只需要书写css的尺寸就可以 参考 [√ rem 适配方案](#rem)

#### 3.关于以上三种布局方式的详细区别，[推荐阅读](https://www.cnblogs.com/imwtr/p/9648233.html)

[▲ 回顶部](#top)

### <span id="vant">✅ VantUI 组件按需加载 </span>

项目采
用[Vant 自动按需引入组件 (推荐)](https://youzan.github.io/vant/#/zh-CN/quickstart#fang-shi-yi.-zi-dong-an-xu-yin-ru-zu-jian-tui-jian)下
面安装插件介绍：

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 `babel` 插件，它会在编译过程中将
`import` 的写法自动转换为按需引入的方式

#### 安装插件

```bash
npm i babel-plugin-import -D
```

在`babel.config.js` 设置

```javascript
// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
]
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins
}
```

#### 使用组件

项目在 `src/plugins/vant.js` 下统一管理组件全局引入，用哪个引入哪个，无需在页面里重复引用，`多次重复`使用的组件可以在这里引入。使用`较少`的组件可以在具体的文件中引入

```javascript
// 按需全局引入 vant组件
import Vue from 'vue'
import { Button, List, Cell, Tabbar, TabbarItem } from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tabbar).use(TabbarItem)
```

[▲ 回顶部](#top)

### <span id="sass">✅ Sass 全局样式</span>

首先 你可能会遇到 `node-sass` 安装不成功，别放弃多试几次！！！。

本项目放弃了 `node-sass` ，使用了最新的 `dart-sass` 。`sass`官方未来也主要支持 `dart-sass`。

`值得注意`的是你如果做的是大型项目，现阶段 `dart-sass` 编译可能比`node-sass`慢。

每个页面自己对应的样式都写在自己的 .vue 文件之中 `scoped` 它顾名思义给 css 加了一个域的概念。

```html
<style lang="scss">
  /* global styles */
</style>

<style lang="scss" scoped>
  /* local styles */
</style>
```

#### 目录结构

vue-template-demo 所有全局样式都在 `@/src/assets/css` 目录下设置

```bash
├── assets
│   ├── css
│   │   ├── index.scss               # 全局通用样式
│   │   ├── mixin.scss               # 全局mixin
│   │   └── variables.scss           # 全局变量
│   │   └── vw-layout.scss           # 适配
```

#### 自定义 vant-ui 样式

现在我们来说说怎么重写 `vant-ui` 样式。由于 `vant-ui` 的样式我们是在全局引入的，所以你想在某个页面里面覆盖它的样式就不能
加 `scoped`，但你又想只覆盖这个页面的 `vant` 样式，你就可在它的父级加一个 `class`，用命名空间来解决问题。

```css
.about-container {
  /* 你的命名空间 */
  .van-button {
    /* vant-ui 元素*/
    margin-right: 0px;
  }
}
```

#### 父组件改变子组件样式 深度选择器

当子组件使用了 `scoped` 但在父组件又想修改子组件的样式可以 通过 `>>>` 或者`/deep/`来实现：

当然在 `dart-sass` 中 `>>>` 或者 `/deep/` 变更成了统一的 `::v-deep`

```css
<style scoped>

.a >>> .b { /* ... */ }

.red{
  /deep/ i{
    color: red;
  }
}

.red{
  ::v-deep i{
    color: red;
  }
}
</style>
```

#### 全局变量

`vue.config.js` 配置使用 `css.loaderOptions` 选项,注入 `sass` 的 `mixin` `variables` 到全局，不需要手动引入 ,配
置`$cdn`通过变量形式引入 cdn 地址,这样向所有 Sass/Less 样式传入共享的全局变量：

```javascript
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const defaultSettings = require('./src/config/index.js')
module.exports = {
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      // 给 scss-loader 传递选项
      scss: {
        // 注入 `sass` 的 `mixin` `variables` 到全局, $cdn可以配置图片cdn
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
                @import "assets/css/mixin.scss"; //也可以不引入这两个
                @import "assets/css/variables.scss"; //也可以不引入这两个
                @import "assets/css/index.scss"; //直接引入index.scss
                $cdn: "${defaultSettings.$cdn}";
                 `
      }
    }
  }
}
```

设置 js 中可以访问 `$cdn`,`.vue` 文件中使用`this.$cdn`访问

```javascript
// 引入全局样式
import '@/assets/css/index.scss' // 如果上面直接引入index.scss  这里可以省略

// 设置 js中可以访问 $cdn
// 引入cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn
```

在 css 和 js 使用 `$cdn`

```html
<script>
  console.log(this.$cdn)
</script>
<style lang="scss" scoped>
  .logo {
    width: 120px;
    height: 120px;
    background: url($cdn + '/weapp/logo.png') center / contain no-repeat;
  }
</style>
```

[▲ 回顶部](#top)

### <span id="vuex">✅ Vuex 状态管理</span>

目录结构

```bash
├── store
│   ├── actions.js
│   ├── mutations-type.js
│   ├── mutations.js
│   ├── index.js
│   ├── getters.js
```

`main.js` 引入

```javascript
import Vue from 'vue'
import App from './App.vue'
import store from './store'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

使用

```html
<script>
  import { mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    computed: {
      ...mapGetters(['count'])
    },

    methods: {
      ...mapMutations(['SYNC']),
      ...mapActions(['longSet']),

      doDispatch() {
        // 将 `this.longSet()` 映射为 `this.$store.dispatch('longSet')`
        this.longSet({  
          value: value
        })
      },

      onchange(value) {
        // 将 `this.SYNC()` 映射为 `this.$store.commit('SYNC')`
        this.SYNC({
          value: value
        })

        console.log(this.count) // 使用count
      }
    }
  }
</script>
```

vuex有以下注意几点需要注意

- 最好是用常量替代 `mutations` 事件类型 (使用 `mutations-type.js` 里面的常量)
- 区分 `mutations `和 `actions` 的区别
- 对于大型项目，应当拆分 store，将 store 分割成不同的模块
- 对于不同页面场景，`vuex` 应当配合 `localStorage` 和 `sessionStorage` 使用


[▲ 回顶部](#top)

### <span id="router">✅ Vue-router </span>

本案例采用 `hash` 模式，开发者根据需求修改 `mode` `base`

**注意**：如果你使用了 `history` 模式，`vue.config.js` 中的 `publicPath` 要做对应的**修改**

前往:[vue.config.js 基础配置](#base)

```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const router = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/home.vue'), // 路由懒加载
    meta: { 
      title: "首页", // 导航条标题
      depth: 0, // 页面深度
      showFooter: true,  // 是否显示tabbar
      showHeader: false, // 是否显示navbar
      showHeaderBack: false, // 是否显示 back 返回按钮
      login: false // 是否需要登录
    }
  }
]
const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置 vue.config.js publicPath
    // base: '/app/',
    scrollBehavior: () => ({ y: 0 }),
    routes: router
  })

export default createRouter()
```

其中 `/about` 路由中使用了不同的打包方式

更多:[Vue Router](https://router.vuejs.org/zh/)

[▲ 回顶部](#top)

### <span id="axios">✅ Axios 封装及接口管理</span>

`http/request.js` 封装 axios ,开发者需要根据后台接口的状态码做出对应的反馈。

- `service.interceptors.request.use` 里可以设置请求头，比如设置 `token`
- `config.loading` 是在 api 文件夹下的api.js接口参数里设置
- `service.interceptors.response.use` 里可以对接口返回数据处理，比如 401 删除本地信息，重新登录

axios 封装特色
- 拦截了同一个接口同时多次请求，只成功发送一次
- 弱网环境下，控制请求持续时长和重试次数

`request.js` 里面有详细的注释，请阅读并根据自身需求修改

#### 接口管理

在`http/api` 文件夹下统一管理接口

- `url` 接口地址，请求的时候会拼接上 `config` 下的 `baseURL`
- `method` 请求方法是 `get` 请求参数请传递 `params`
- `method` 请求方法是 `post` 请求参数请传递 `data`
- `data` 请求参数 `qs.stringify(params)` 是对数据系列化操作
- `loading` 默认没有此字段，不显示接口请求动画， 交互中有些接口不需要让用户感知。有此字段则显示请求loading

```javascript
import qs from 'qs'
// axios
import { apiAxios} from "./request.js";

// 查询垃圾
const trahs = (params) => {
  return apiAxios({
    method: 'get',
    url: "api/lajifl",
    params,
    message: '查询中'
  })
}
const slang = () => {
  return apiAxios({
    method: 'post',
    url: 'api/dujitang',
    data: qs.stringify({
      apiKey: 'f9951161274ac6a4361ccb639f1106b2'
    })
  })
}
export {
  trahs,
  slang
}
```

#### 如何调用

```javascript
// 请求接口
import { trahs } from '@/api/user.js'

trahs({
  m: '大力'
}).then(() => {
  // console.log(res);
})
```

[▲ 回顶部](#top)

### <span id="animate">✅ 转场动画 </span>

模仿微信的转场动画，根据定义的层级不同来实现

```javascript
// router/index.js
export const router = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/home.vue'), // 路由懒加载
    meta: { 
      title: "首页", 
      depth: 0, // 页面深度 转场动画使用
      showFooter: true,  
      showHeader: false, 
      showHeaderBack: false, 
      login: false 
    }
  }
]
```
```vue
// App.vue
<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="keepAlive">
        <router-view class="child-view" />
      </keep-alive>
    </transition>
    <tabbar></tabbar>
  </div>
</template>

<script>
// 监听什么得深度 动态切换动画类名
watch: {
  $route(to, from){
    let toDepth = to.meta.depth
      , fromDepth = from.meta.depth;

    if (toDepth > fromDepth) {
      this.transitionName = "slide-left";
    }else if (toDepth < fromDepth) {
      this.transitionName = "slide-right";
    }else{
      this.transitionName = "slide-fade"
    }
  }
}
</script>
```

[▲ 回顶部](#top)

### <span id="base">✅ Webpack 4 vue.config.js 基础配置 </span>

如果你的 `Vue Router` 模式是 hash

```javascript
publicPath: './',
```

如果你的 `Vue Router` 模式是 history 这里的 publicPath 和你的 `Vue Router` `base` **保持一直**

```javascript
publicPath: '/app/',
```

```javascript
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: './', // 部署应用包时的基本 URL。 vue-router hash 模式使用
  //  publicPath: '/app/', // 署应用包时的基本 URL。  vue-router history模式使用
  outputDir: 'dist', //  生产环境构建文件的目录
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: !IS_PROD,
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    port: 9527, // 端口号
    open: true, // 启动后打开浏览器
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    }
    // ...
  }
}
```

[▲ 回顶部](#top)

### <span id="alias">✅ 配置 alias 别名 </span>

```javascript
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
  }
}
```

[▲ 回顶部](#top)

### <span id="proxy">✅ 配置 proxy 跨域 </span>
**本项目默认开启本地开发跨域**

如果你的项目本地开发需要跨域设置，你需要配置 `vue.config.js` 文件的 `proxy` 并且写入相应参数

<u>**!!!注意：你还需要将 `src/config/env.development.js` 里的 `baseURL` 设置成 '/apis'**</u>

```javascript
module.exports = {
  devServer: {
    // ....
    proxy: {
      '/apis': { 
        target: 'https://api.muxiaoguo.cn',
        changeOrigin: true, // 默认false，是否需要改变原始主机头为目标URL
        pathRewrite: {
          '^/apis': ''
        }
      }, // 可以跨域多个
      // '/test': {
      //   target: 'https://api.xxxx.cn',
      //   changeOrigin: true, // 默认false，是否需要改变原始主机头为目标
      //   pathRewrite: {
      //     '^/test': ''
      //   }
      // }
    }
  }
}
```

使用 例如: `src/http/api.js`

```javascript
const trahs = (params) => {
  return apiAxios({
    method: 'get',
    url: "api/lajifl",
    params,
    loading: '查询中'
  })
}
```
这里的url字段还会拼接上 `request.js` 里面的baseURL字段
**有关proxy 跨域的详细配置和解释 请阅读 [详解 vue/cli中 proxy 跨域](https://blog.csdn.net/joy1793/article/details/109677154)**

[▲ 回顶部](#top)

### <span id="bundle">✅ 配置 打包分析 </span>

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  chainWebpack: config => {
    if (IS_PROD) {
      // 修改打包分析生成html路径
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static',
          reportFilename: 'report/report.html',
        }
      ])
    }
  }
}
```

```bash
npm run build
```

[▲ 回顶部](#top)

### <span id="externals">✅ 配置 externals 引入 cdn 资源 </span>

这个版本 CDN 不再引入，我测试了一下使用引入 CDN 和不使用,不使用会比使用时间少。网上不少文章测试 CDN 速度块，这个开发者可
以实际测试一下。

另外项目中使用的是公共 CDN 不稳定，域名解析也是需要时间的（如果你要使用请尽量使用同一个域名）

因为页面每次遇到`<script>`标签都会停下来解析执行，所以应该尽可能减少`<script>`标签的数量 `HTTP`请求存在一定的开销，100K
的文件比 5 个 20K 的文件下载的更快，所以较少脚本数量也是很有必要的

暂时还没有研究放到自己的 cdn 服务器上。

```javascript
const defaultSettings = require('./src/config/index.js')
const name = defaultSettings.title || 'vue mobile template'
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

// externals
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios'
}
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: [],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js'
    ]
  }
}
module.exports = {
  configureWebpack: config => {
    config.name = name
    // 为生产环境修改配置...
    if (IS_PROD) {
      // externals
      config.externals = externals
    }
  },
  chainWebpack: config => {
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config.plugin('html').tap(args => {
      args[0].cdn = cdn.build
      return args
    })
  }
}
```

在 public/index.html 中添加

```javascript
    <!-- 使用CDN的CSS文件 -->
    <% for (var i in
      htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.css) { %>
      <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="preload" as="style" />
      <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet" />
    <% } %>
     <!-- 使用CDN加速的JS文件，配置在vue.config.js下 -->
    <% for (var i in
      htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.js) { %>
      <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
```

**请确定是否使用cdn，如果不使用请注释以上全部代码**

[▲ 回顶部](#top)

### <span id="console">✅ 去掉 console.log </span>

保留了测试环境和本地环境的 `console.log`

```bash
npm i -D babel-plugin-transform-remove-console
```

在 babel.config.js 中配置

```javascript
// 获取 VUE_APP_ENV 非 NODE_ENV，测试环境依然 console
const IS_PROD = ['production', 'prod'].includes(process.env.VUE_APP_ENV)
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
]
// 去除 console.log
if (IS_PROD) {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', { useBuiltIns: 'entry' }]],
  plugins
}
```

[▲ 回顶部](#top)

### <span id="compress">✅ 压缩图片 </span>

注意使用`npm`安装安装 `image-webpack-loader` 的时候可能**安装不完整**，依赖缺失。请先卸载 `image-webpack-loader` ，然后使用 `cnpm` 试试

注意在某些mac或者linux上 `image-webpack-loader`会引起报错

解决办法安装 `libpng` 库,在github issue https://github.com/tcoopman/image-webpack-loader/issues/49可查看

`libpng` 安装代码
mac:
```shell
brew install libpng
```

ubuntu:
```shell
apt-get install libpng
```

**安装**image-webpack-loader
```javascript
npm i -D image-webpack-loader
```
```javascript
chainWebpack: config => {
// 压缩图片
  if (IS_PROD) {
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: true }
        // webp: { quality: 75 }
      });
  }
}
```
[▲ 回顶部](#top)

### <span id="chunks">✅ splitChunks 单独打包第三方模块</span>

```javascript
module.exports = {
  chainWebpack: config => {
    config.when(IS_PROD, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 将 runtime 作为内联引入不单独存在
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3, //  被至少用三次以上打包分离
            priority: 5, // 优先级
            reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'initial', // 只打包初始时依赖的第三方
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          },
          vantUI: {
            name: 'chunk-vantUI', // 单独将 vantUI 拆包
            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
```

[▲ 回顶部](#top)

### <span id="ie">✅ 添加 IE 兼容 </span>

之前的方式 会报 `@babel/polyfill` is deprecated. Please, use required parts of `core-js` and
`regenerator-runtime/runtime` separately

`@babel/polyfill` 废弃，使用 `core-js` 和 `regenerator-runtime`

```bash
npm i --save core-js regenerator-runtime
```

在 `main.js` 中添加

```javascript
// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'
```

配置 `babel.config.js`

```javascript
const plugins = []

module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', { useBuiltIns: 'usage', corejs: 3 }]],
  plugins
}
```

[▲ 回顶部](#top)

### <span id="pettier">✅ Eslint + Pettier 统一开发规范 </span>

VScode （版本 1.51.1）安装 `eslint` `prettier` `vetur` 插件 `.vue` 文件使用 vetur 进行格式化，其他使用`prettier`,

在文件 `.eslintrc.js` 里简单配置eslint规则

在vs code中有插件配合 `pettier` `Eslint`进行代码格式化检查。这里不在赘述，也没有配置，请google和百度。

[▲ 回顶部](#top)

# 鸣谢 ​

[vue-h5-template](https://github.com/sunniejs/vue-h5-template)  
[vue-cli4-config](https://github.com/staven630/vue-cli4-config)  
[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

# 关于我

扫描添加下方的微信并备注 github 加交流群，交流学习，及时获取代码最新动态。

<p>
  <img src="http://test2.huiche51.com/githubimg/group.jpg" width="256" style="display:inline;">
  <img src="./src/assets/image/mentals.jpg" width="256" style="display:block;">
</p>
 
如果对你有帮助送我一颗小星星（づ￣3￣）づ╭❤～
