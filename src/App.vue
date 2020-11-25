<template>
  <div id="app">
    <router-view/>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "@components/nav/tabbar"
export default {
  components: {
    tabbar
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
}
</style>
