<template>
  <div class="home">
    <div class="search">
      <div class="input-wrap flex-ccc">
        <BaseSearchClass></BaseSearchClass>
        <BaseInput icon="search"></BaseInput>
      </div>
    </div>
    <div class="ai bg">
      <div class="base-title">
        <img class="title-1" src="@/assets/imgs/trademark.png" alt="">
        <span class="title-2">商标大数据AI分析平台</span>
      </div>
      <div class="ai-list flex-cc">
        <div v-for="(item,index) in alList" :key="index" class="ai-item flex-ccc">
          <div class="img-wrap flex-cc">
            <img :src="item.img" alt="">
          </div>
          <span class="ai-text">{{item.label}}</span>
        </div>
      </div>
    </div>
    <div class="swipper bg">
      <div class="carousel">
        <el-carousel indicator-position="outside" height="540px">
          <el-carousel-item v-for="item in 4" :key="item">
            <img src="https://dummyimage.com/960x540/000/fff" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      loginForm: { username: 'fpc', password: '123456' },
      alList: [
        {
          label: '商标大数据AI分析平台',
          img: require('@/assets/imgs/ai0.png')
        },
        {
          label: '商标信息快速查询',
          img: require('@/assets/imgs/ai1.png')
        },
        {
          label: '商标状态时刻监控',
          img: require('@/assets/imgs/ai2.png')
        },
        {
          label: '商标布局维护防护',
          img: require('@/assets/imgs/ai3.png')
        },
        {
          label: '商标文件一站搜索',
          img: require('@/assets/imgs/ai4.png')
        },
        {
          label: '官文对比快速处理',
          img: require('@/assets/imgs/ai5.png')
        }
      ]
    }
  },
  methods: {
    handleLogin() {
      this.$store
        .dispatch('login', this.loginForm)
        .then(() => {
          this.$router.push({
            path: this.redirect || '/',
            query: this.otherQuery
          })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .search {
    height: 780px;
    .input-wrap {
      padding-top: 200px;
      margin: 0 auto;
      width: 700px;
    }
  }
  .base-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title-1 {
      display: block;
      width: 556px;
    }
    .title-2 {
      display: block;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      letter-spacing: 0px;
      font-size: 44px;
      margin-top: -30px;
      color: #1b2052;
    }
  }
  .bg {
    background-image: url(../assets/imgs/aibg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    padding: 80px 0;
  }
  .ai {
    background-image: url(../assets/imgs/aibg.png);
    .base-title {
      margin-bottom: 70px;
    }
    .ai-list {
      width: 1000px;
      margin: 0 auto;
      // border: 1px solid red;
      flex-wrap: wrap;
      .ai-item {
        width: 33.33%;
        .img-wrap {
          width: 200px;
          height: 200px;
          img {
            max-width: 200px;
            max-height: 200px;
          }
        }
        span {
          font-size: 18px;
          letter-spacing: 0px;
          color: #333333;
        }
      }
    }
  }
  .swipper {
    background-image: url(../assets/imgs/swipperbg.png);
    .carousel {
      width: 960px;
      margin: 0 auto;
      .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
  }
}
</style>
