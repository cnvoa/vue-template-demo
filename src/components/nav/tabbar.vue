<template>
  <van-tabbar v-model="active" border v-if="visible" 
  inactive-color="#000" active-color="#ee0a24" @change="onChange">
    <van-tabbar-item v-for="(item, index) in list" :key="index" 
    :icon="item.icon">
      {{item.title}}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      list: [
        {
          title: '首页',
          link: '/',
          icon: 'home-o'
        }
        ,{
          title: '效果',
          link: '/category',
          icon: 'fire-o'
        }
        ,{
          title: '关于',
          link: '/about',
          __target: '/about/',
          icon: 'good-job-o'
        }
      ],
      active: 0
    };
  },
  methods: {
    /**
     * 有__target用window跳转
     * 无则使用vue-router路由
     */
    onChange(e){
      const {link, __target} = this.list[e];

      if (process.env.NODE_ENV == "production" && __target) {
        window.location.replace(this.$linkURL + __target)
      }else{
        this.$router.replace(link)
      }
    }
  },
  created() {},
  computed: {
    visible () {
      return this.$route.meta.showFooter
    }
  },
  mounted(){},
  watch: {
    // 守护tabbar选中的颜色
    $route(n){
      switch (n.name) {
        case "home":
          this.active = 0
          break;
        case "category":
          this.active = 1
          break;
        case "about":
          this.active = 2
          break;
      
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
    
</style>