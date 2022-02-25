<template>
  <div class="layout-wrap">
    <Header :class="{absolute:headerInfo.absolute}" :opacity="headerInfo.opacity" :bgColor="headerInfo.bgColor">
    </Header>
    <div class="content-wrap">
      <router-view />
    </div>
    <Footer></Footer>
    <!-- 登录弹框 -->
    <BaseLogin v-if="showLoginDialog" @closeDialog="closeDialog"></BaseLogin>
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
    showLoginDialog() {
      return this.$store.state.showLoginDialog
    },
    headerInfo() {
      if (this.$route.path === '/home') {
        return {
          absolute: true,
          bgColor: 'rgba(9, 33, 135,0.35)'
        }
      } else {
        return {
          absolute: false,
          bgColor: 'rgba(49, 104, 217,1)'
        }
      }
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit('SET_IS_LOGIN_DIALOG', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-wrap {
  position: relative;
  .absolute {
    position: absolute;
    width: 100%;
    z-index: 2;
  }
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
    z-index: 5;
    i {
      font-size: 26px;
      line-height: 50px;
    }
  }
}
</style>
