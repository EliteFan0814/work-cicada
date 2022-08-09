<template>
  <!-- <header class="header-wrap" :style="{backgroundColor:`rgba(49, 104, 217,${opacity})`}"> -->
  <header class="header-wrap" :style="{ backgroundColor: `${bgColor}` }">
    <img src="@/assets/imgs/logo.png" class="logo" />
    <ul>
      <li
        v-for="item in routerList"
        :key="item.name"
        :class="{ normal: true, 'normal-active': item.router === activeRouter }"
        @click="handleNormalRouter(item.router)"
      >
        {{ item.name }}
      </li>
      <li
        v-if="!isLogin"
        :class="{ normal: true }"
        @click="handleNormalRouter('Home')"
      >
        登录
      </li>
      <li v-else :class="{ normal: true }">
        <el-popover placement="bottom" trigger="hover">
          <div class="more-info">
            <div class="logout" @click="logout">退出登录</div>
          </div>
          <span slot="reference">个人信息</span>
        </el-popover>
      </li>
      <!-- 开通会员 -->
      <!-- <li class="member">
        <img src="@/assets/imgs/crown.png" alt />
        <span>开通会员</span>
      </li>
      <li class="free">全模块免费试用</li> -->
    </ul>
  </header>
</template>

<script>
import { MessageBox, Message } from 'element-ui'

export default {
  name: 'Header',
  props: {
    opacity: {
      type: Number,
      default: 1
    },
    bgColor: {
      type: String,
      default: 'rgba(49, 104, 217,1)'
    }
  },
  data() {
    return {
      routerList: [
        { name: '首页', router: 'Home' },
        { name: '商标查询', router: 'TrademarkSearch' }
        // { name: '图形查询', router: 'Graphics' },
        // { name: '商标监控', router: 'TrademarkWatch' },
        // { name: '商标分析', router: 'TrademarkAnalyse' }
        // { name: '登录', router: 'Login' }
      ],
      activeRouter: 'Home'
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  watch: {
    $route(newVal) {
      this.activeRouter = newVal.name
    }
  },
  mounted() {
    this.activeRouter = this.$route.name
  },
  methods: {
    handleNormalRouter(router) {
      this.activeRouter = router
      this.$router.push({ name: router })
      if (!this.isLogin) {
        this.$store.commit('SET_IS_LOGIN_DIALOG', true)
      }
      // if (this.isLogin) {
      //   this.activeRouter = router
      //   this.$router.push({ name: router })
      // } else {
      //   if (this.$route.path.includes('trademark-business')) {
      //     this.activeRouter = router
      //     this.$router.push({ name: router })
      //     // this.$router.push({ name: 'Home' })
      //   }
      //   this.$store.commit('SET_IS_LOGIN_DIALOG', true)
      // }
    },
    logout() {
      MessageBox.confirm('确认退出登录？', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('logout').then((res) => {
          Message({
            message: '登出成功',
            type: 'success',
            duration: 1 * 1000
          })
          this.$router.push({ name: 'Home' })
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrap {
  height: 60px;
  // background-color: #3168d9;
  // opacity: 0.8;
  padding: 15px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  .logo {
    width: 121px;
  }
  ul {
    display: flex;
    font-size: 14px;
    align-items: center;
    li {
      margin: 0 15px;

      &:hover {
        cursor: pointer;
      }
    }
    .normal {
      color: #e6e6e6;
      opacity: 0.9;
      &:hover {
        color: #ffffff;
        opacity: 1;
      }
    }
    .normal-active {
      color: #ffffff;
      opacity: 1;
      font-weight: bold;
    }
    .member {
      color: #cb9b04;
      position: relative;
      img {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .free {
      background-color: #58c4ff;
      border-radius: 4px;
      border: solid 1px #44b7f6;
      padding: 6px 8px;
    }
  }
}
.more-info {
  .logout {
    cursor: pointer;
    &:hover {
      color: #3168d9;
      font-weight: bold;
    }
  }
}
</style>
