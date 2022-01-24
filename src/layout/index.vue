<template>
  <div class="layout-wrap">
    <Header></Header>
    <div class="content-wrap">
      <router-view />
    </div>
    <Footer></Footer>
    <!-- 登录弹框 -->
    <BaseLogin v-if="isLogin"></BaseLogin>
    <!-- 在线客服 -->
    <div class="serve">
      <i class="iconfont icon-kefu"></i>
    </div>
  </div>
</template>

<script>
import Header from '@/baseComponents/Header'
import Footer from '@/baseComponents/Footer'
export default {
  name: 'Layout',
  components: {
    Header,
    Footer
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-wrap {
  .content-wrap {
    min-height: 700px;
  }
  .serve {
    position: fixed;
    bottom: 120px;
    right: 30px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    text-align: center;
    background-color: #3168d9;
    border-radius: 50%;
    color: #fff;
    i {
      font-size: 26px;
      line-height: 50px;
    }
  }
}
</style>
