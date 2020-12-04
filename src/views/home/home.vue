<template>
  <div class="home pb-50">
    <div class="home-header">
      <img src="https://s3.ax1x.com/2020/11/19/DuKPSI.gif" alt="">
      <h2>vue-cli-4 h5移动端开发模板</h2>
    </div>
    <van-collapse v-model="activeNames" :accordion="true">
      <van-collapse-item :title="item.title" :name="index + 1"
       v-for="(item, index) in list" :key="index" :class="{'red': item.jump}">
        <van-cell v-if="item.jump" is-link :to="item.jump">{{item.message}}</van-cell>
        <template v-else>{{item.message}}</template>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return {
      activeNames: 1,
      list: [
        {
          title: 'Vue-cli4',
          message: '项目基于vue脚手架4.5.8, @vue/cli, v4.5.8',
        }
        ,{
          title: '配置多环境变量',
          message: '配置了三种环境: dev开发环境, staging预发布环境, production生产环境',
        }
        ,{
          title: 'VantUI 组件按需加载',
          message: '只加载需要的组件, 修改css属性',
        }
        ,{
          title: 'Sass 全局样式',
          message: 'sass配置，sass全局混入',
        }
        ,{
          title: 'Vuex 状态管理和转场动画',
          message: 'vuex 状态管理缓存常用用法',
          jump: '/vuex'
        }
        ,{
          title: 'Axios 封装及接口管理',
          message: '对axios进行二次封装, 能处理超时, 重复的请求',
          jump: '/category'
        }
        ,{
          title: 'Vue-router',
          message: '拆分打包',
        }
        ,{
          title: 'Webpack 4 vue.config.js 基础配置',
          message: '各种基础配置',
        }
        ,{
          title: '配置 proxy 跨域',
          message: '配置开发环境 proxy 跨域',
        }
        ,{
          title: '配置 alias 别名',
          message: '各个文件夹 alias别名',
        }
        ,{
          title: '配置 打包分析',
          message: '拆分第三方ui组件打包, 拆分指定文件打包',
        }
        ,{
          title: '配置 externals 引入 cdn 资源',
          message: '抽离cdn资源',
        }
        ,{
          title: '去掉 console.log',
          message: '一键去掉项目 console.log',
        }
        ,{
          title: '压缩图片',
          message: '可能会遇到常见的两个问题，请注意查看README',
        }
        ,{
          title: 'splitChunks 单独打包第三方模块',
          message: '拆分第三方ui组件打包, 拆分指定文件打包',
        }
        ,{
          title: '添加 IE 兼容',
          message: '向下兼容到ie9, 兼容和不兼容打包后, 兼容后打包体积大了145KB',
        }
        ,{
          title: 'Eslint',
          message: 'Eslint 简单代码规范',
        }
      ]
    }
  },
  mounted(){
    // console.log(document.documentElement.clientWidth);
  }
}
</script>

<style lang="scss" scoped>
.home-header{
  display: flex;
  align-items: center;
  padding: 20px;
  h2{
    margin: 0 0 0 20px;
    font-size: 28px;
    font-weight: 500;
  }
}
.red{
  ::v-deep i{
    color: red;
  }
}
</style>