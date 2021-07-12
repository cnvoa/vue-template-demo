<template>
  <div class="scroll-b">
    <Nav-header></Nav-header>
    <van-cell-group>
      <van-cell v-for="(i, index) in 30" 
      :key="index" :title="i" is-link to="/about">就要喝大力</van-cell>
    </van-cell-group>
    <van-cell is-link to="/scrollA">我是push到A</van-cell>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      data: {}
    };
  },
  methods: {},
  created() {
    console.log('B created: ');
    console.log(document.documentElement.scrollTop);
  },
  mounted(){
    console.log('B mounted: ');
    console.log(document.documentElement.scrollTop);
  },
  beforeDestroy(){
    console.log('B beforeDestroy: ');
    console.log(document.documentElement.scrollTop);
  },
  destroyed(){
    console.log('B destroyed: ');
    console.log(document.documentElement.scrollTop);
  },
  computed: {

  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.scroll-b{
  padding-top: 46px;
}
</style>