<template>
  <van-tabbar v-model="active" route border v-if="visible">
    <van-tabbar-item replace v-for="(item, index) in list" :key="index" 
    :icon="item.icon" :to="item.link">
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
          link: '/home',
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
          icon: 'good-job-o'
        }
      ],
      active: 0
    };
  },
  methods: {
  },
  created() {},
  computed: {
    visible () {
      return this.$route.meta.showFooter
    }
  },
  mounted(){},
  watch: {}
};
</script>

<style lang="scss" scoped>
    
</style>