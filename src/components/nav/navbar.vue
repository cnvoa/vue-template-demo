<template>
  <van-nav-bar :title="$route.meta.title" 
  :left-arrow="$route.meta.showHeader" @click-left="$router.back()">
</van-nav-bar>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
  },
  created() {},
  computed: {
  },
  mounted(){},
  watch: {}
};
</script>

<style lang="scss" scoped>
    
</style>