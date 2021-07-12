<template>
  <div class="">
    <Nav-header></Nav-header>
    <van-cell-group class="scroll-a">
      <van-cell v-for="(i, index) in 30" 
      :key="index" :title="i" is-link to="/scrollB">大力出奇迹</van-cell>
    </van-cell-group>
  </div>
</template>

<script>

export default {
  name: "scrollA",
  components: {},
  data() {
    return {
      data: {
        top: document.documentElement.scrollTop
      }
    };
  },
  methods: {},
  created() {
    console.log('A created: ');
    console.log(document.documentElement.scrollTop);
    console.log("1");
  },
  mounted(){
    console.log('A mounted: ');
    console.log(document.documentElement.scrollTop);
    console.log("2");
  },
  beforeDestroy(){
    console.log('A beforeDestroy: ');
    console.log(document.documentElement.scrollTop);
    console.log("3");
  },
  destroyed(){
    console.log('A destroyed: ');
    console.log(document.documentElement.scrollTop);
    console.log("4");
  },
  computed: {

  },
  // mounted() {},
  watch: {
    top(n, o){
      console.log("watch:" + n);
      console.log("watch:" + o);
    }
  },
};
</script>

<style lang="scss" scoped>
.scroll-a{
  padding-top: 46px;
}
</style>