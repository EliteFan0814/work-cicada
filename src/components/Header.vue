<template>
  <header class="header-wrap">
    <img
      src="@/assets/imgs/logo.png"
      class="logo"
    />
    <ul>
      <li
        v-for="item in routerList"
        :key="item.name"
        :class="{ normal: true, 'normal-active': item.router === activeRouter }"
        @click="handleNormalRouter(item.router)"
      >{{ item.name }}</li>
      <li class="member">
        <img
          src="@/assets/imgs/crown.png"
          alt
        />
        <span>开通会员</span>
      </li>
      <li class="free">全模块免费试用</li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      routerList: [
        { name: '首页', router: 'Home' },
        { name: '商标查询', router: 'TrademarkSearch' },
        { name: '图形查询', router: 'Graphics' },
        { name: '商标监控', router: 'TrademarkWatch' },
        { name: '商标分析', router: 'TrademarkAnalyse' },
        { name: '会员登录', router: 'MemberLogin' }
      ],
      activeRouter: 'Home'
    }
  },
  methods: {
    handleNormalRouter(router) {
      this.$router.push({ name: router })
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrap {
  height: 60px;
  background-color: #3168d9;
  // opacity: 0.6;
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
</style>
