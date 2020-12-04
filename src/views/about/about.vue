<template>
  <div class="about">
    <div class="logo">
      <img v-lazy="`${$cdn}/2020/11/19/DuKPSI.gif`" alt="">
      <h2>vue-cli-4 h5开发模板</h2>
      <div class="github">
        <span>项目地址: </span>
        <a href="https://github.com/cnvoa/vue-template-demo" target="_bank">https://github.com/cnvoa/vue-template-demo</a>
        <p>如果您觉得模板对您有用的话, 就点个小星星吧</p>
      </div>
      <div class="wxchat-group">
        <img src="@assets/image/group.jpg" alt="">
        <p>加入微信群, 群里的大佬都在等你</p>
      </div>
      <div class="qrcode" v-if="!disabled">
        如果上面的群二维码失效了, 
        <van-button size="small" type="warning" :disabled="disabled" @click.native.once="showAuthor">点我</van-button>
      </div>
      <div class="author" v-if="disabled"></div>
    </div>
  </div>
</template>

<script>
import {trahs} from "@/http/api";
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      disabled: false
    };
  },
  methods: {
    showAuthor(){
      this.disabled = !this.disabled
    }
  },
  created() {
    // 显示自定义文字loading
    trahs({
      m: '大力'
    }).then(() => {
      // console.log(res);
    })

    console.log(this.count);
  },
  computed: {
    ...mapGetters(['count'])
  },
  mounted(){},
  watch: {}
};
</script>

<style lang="scss" scoped>
.about{
  padding: 40px 10px;
  text-align: center;
}
.logo{
  img{
    width: 80px;
  }
  h2{
    margin: 10px 0 0 20px;
    font-size: 28px;
    font-weight: 500;
    color: #666;
  }
  .github{
    margin-top: 30px;
    color: $text-color-gray;
    p{
      margin-top: 15px;
    }
    a{
      color: -webkit-link;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .wxchat-group{
    margin-top: 10px;
    color: $text-color-gray;
    img{
      width: 150px;
    }
  }
  .qrcode{
    margin-top: 20px;
    vertical-align: middle;
    color: lighten($color: #000000, $amount: 60%);
    .van-button{
      background: #ff5500;
    }
  }
  .author{
    display: inline-block;
    width: 250px;
    height: 250px;
    background-image: url($cdn + '/2020/11/23/DJL4UI.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}

</style>