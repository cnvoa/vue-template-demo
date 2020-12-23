<style lang="scss" scoped>
.little-tip {
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  padding: 11px 13px;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  // max-width:300px;
  word-break: keep-all;
  word-wrap: break-word;
  z-index: 9999;
  img {
    width: 36px;
    margin-top: 3px;
    margin-bottom: 3px;
  }
  span {
    text-align: center;
    display: block;
    color: #ffffff;
    font-size: 16px;
    line-height: 24px;
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
<template>
  <div>
    <transition name="fade">
      <div class="little-tip" v-show="showLittleTip">
        <img src="@/assets/loading/success.png" alt="" width="36" v-if="type=='success'">
        <img src="@/assets/loading/fail.png" alt="" width="36" v-if="type=='fail'">
        <img src="@/assets/loading/warning.png" alt="" width="36" v-if="type=='warning'">
        <img src="@/assets/loading/loading.png" alt="" width="36" v-if="type=='loading'" class="loading">
        <span>{{msg}}</span>
      </div>
    </transition>
  </div>

</template>

<script>
export default {
  name: 'little-tip',
  data () {
    return {
      showLittleTip: true,
      msg: '',
      type: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.showLittleTip = false
    }, 1500)
  }
}
</script>
