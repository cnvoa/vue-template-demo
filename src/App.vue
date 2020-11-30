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
import { mapState } from "vuex";
import tabbar from "@components/nav/tabbar"
export default {
  components: {
    tabbar
  },
  data(){
    return {
      transitionName: 'slide-left'
    }
  },
  computed: {
    ...mapState(['keepAlive'])
  },
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
}
</script>

<style lang="scss">
#app{
  position: relative;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {

 will-change: transform;
 transition: all 0.2s;
 width: 100%;
 position: absolute;
}
.slide-right-enter {
 opacity: 0;
 transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
 opacity: 0;
 transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
 opacity: 0;
 transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
 opacity: 0;
 transform: translate3d(-100%, 0, 0);
}
</style>
