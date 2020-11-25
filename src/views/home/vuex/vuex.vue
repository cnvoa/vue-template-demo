<template>
  <div class="vuex">
    <Nav-header></Nav-header>
    <van-cell-group title="同步触发vuex">
      <van-cell>
        <template #title>
          {{syncTest}}
        </template>
        <template #default>
          <van-stepper :value="syncTest" min="1" @change="onchange"></van-stepper>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="异步延时触发vuex">
      <van-cell>
        <template #title>
          {{asyncTest}}
        </template>
        <template #default>
          <van-stepper :value="asyncTest" min="1" disable-input async-change @change="onchangeAsync"></van-stepper>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
/**
 * vuex需要注意两点  
 * 一 mutations和actions的区别 
 * 1 直接调用mutations的方法立即生效
 * 2 直接调用actions里面的方法 此方法可以异步操作, 最后在此方法中调用mutations里面的方法
 * 二 大项目数据很多的情况下 vuex store 最好Module分块封装 方便数据管理 (暂不做演示)
 */
import { Stepper } from "vant";
import { mapState, mapActions, mapMutations} from "vuex";
export default {
  components: {
    [Stepper.name]: Stepper
  },
  data() {
    return {
      asyncCount: 0, // 异步触发开关 防止vant stepper组件异步方法二次触发
    };
  },
  methods: {
    ...mapMutations(['SYNC']),
    ...mapActions(['longSet']),
    /**
     * 异步触发vuex方法
     */
    onchangeAsync(value){

      if (this.asyncCount == value) {
        return
      }
      this.asyncCount = value

      this.$toast.loading({
        message: '改变中...',
        forbidClick: true,
      });
      
      // 将 `this.longSet()` 映射为 `this.$store.dispatch('longSet')`
      this.longSet({  
        value: value
      })
    },

    onchange(value) {
      // 将 `this.SYNC()` 映射为 `this.$store.commit('SYNC')`
      this.SYNC({
        value: value
      })
    }
  },
  created() {},
  computed: {
    ...mapState(['asyncTest', 'syncTest']),
  },
  mounted(){},
  watch: {}
};
</script>

<style lang="stylus" scoped>
    
</style>