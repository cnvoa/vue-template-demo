<template>
  <div class="mask" v-if="loading">
    <transition name="fade">
      <div class="little-tip">
        <img src="@/assets/loading/loading.png" alt class="loading">
        <span>{{tip}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {
      loading: true,
      tip: '正在加载'
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.little-tip {
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  padding: 15px 13px;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  img {
    width: 36px;
  }
  span {
    text-align: center;
    display: block;
    color: #ffffff;
    font-size: 16px;
    line-height: 22px;
    margin-top: 5px;
  }
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.5s;
  }
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
  }
}
.loading {
  transition: 0.5s;
  animation: rotate 1s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(200deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
