<template>
  <div class="">
    <h1 class="title">毒鸡汤</h1>
    <div class="logo">
      <img v-lazy="`${$cdn}/2021/06/15/IPb544.gif`" alt="">
    </div>
    <p class="du">{{data.comment}}</p>
    <div class="warn">
      <p class="msg">重复的请求: 此页面同时发起3个请求, 只有第一个会成功, 其余两个会被拦截</p>
      <p class="msg">超时的请求: 请在本地运行, 并使用charles设置弱网环境即可查看效果</p>
    </div>
    <div class="scroll" v-for="(item,index) in 30" :key="index">
      <van-button type="primary" block to="/scrollA">{{`测试滚动 ${item}`}}</van-button>
    </div>
  </div>
</template>

<script>
import {slang} from "@/http/api";
export default {
  components: {},
  data() {
    return {
      data: {}
    };
  },
  methods: {},
  created() {
    // 三次相同的请求 只有一次发送成功
    slang().then(res => {
      if (res.code == 200) {
        this.data = res.data
      }
    })
    slang().then(res => {
      console.log(res);
    })
    slang().then((res) => {
      console.log(res);
    })
  },
  computed: {

  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.title{
  padding: 20px 10px;
  text-align: center;
  font-size: 20px;
}
.logo{
  text-align: center;
  img{
    width: 100px;
    height: 100px;
  }
}
.du{
  padding: 20px 10px 10px;
}
.msg{
  padding: 10px;
  font-size: 14px;
}
.warn{
  padding: 100px 0 0 0;
  p{
    color: red;
  }
}
.scroll{
  padding: 20px;
}
</style>