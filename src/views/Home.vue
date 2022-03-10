<template>
  <div v-loading="loading" class="home">
    <div class="search">
      <img src="@/assets/imgs/search-bg.jpg" alt="" class="wave-bg">
      <canvas id="waves"></canvas>
      <div class="input-wrap flex-ccc">
        <div class="flex-cc iknow"><span>知了</span></div>
        <BaseSearchClass class="search-class" type="home" @selectClass="handleClass"></BaseSearchClass>
        <BaseInput icon="search" width="450px" :isHome="true" :border="false" :searchClass="searchClass"
          @search="handleSearch" bgColor="#f7f7f7" placeholder="">
        </BaseInput>
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
    <!-- 轮播图 -->
    <div class="swipper bg">
      <!-- <img src="@assets/imgs/swipperbg.png" class="bg"> -->
      <div class="tabs flex-cc">
        <div v-for="(item,index) in tabsList" :key="item.label"
          :class="{tab:true,'tab-active':activeTab===index?true:false}" @click="ManualChange(index)">{{item.label}}
        </div>
      </div>
      <div class="tips-wrap flex-ccc">
        <span>{{tabsList[activeTab].tips}}</span>
      </div>
      <div class="carousel">
        <el-carousel ref="carousel" indicator-position="outside" height="540px" @change="handleChange">
          <el-carousel-item v-for="item in 3" :key="item">
            <img src="@/assets/imgs/swiper0.png" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- compony -->
    <div class="compony">
      <div class="base-title">
        <img class="title-1" src="@/assets/imgs/partner.png" alt="">
        <span class="title-2">企业用户</span>
      </div>
      <div class="content flex-cc">
        <img src="@/assets/imgs/all-company.png" alt="">
      </div>
    </div>
    <!-- member -->
    <div class="member">
      <div class="base-title">
        <img class="title-1" src="@/assets/imgs/partner.png" alt="">
        <span class="title-2">用户好评</span>
      </div>
      <div class="content flex-bc">
        <div class="c-item">
          <img class="yin" src="@/assets/imgs/yin.png" alt="">
          <div class="c-text">转轮方式展现全部的类别及群组，中细软，非常直观
            独特。公司可以通过中细软准确统计并自动监控公司
            名下商标情况，并且根据不同流程及程序进行分类筛选，
            非常值得推荐使用。</div>
          <div class="people flex-sc">
            <div class="logo">
              <img src="@/assets/imgs/momento.png" alt="">
            </div>
            <div class="info">
              <div class="name">马东强</div>
              <div class="level">MOMENTO 产品总监</div>
            </div>
          </div>
        </div>
        <div class="c-item">
          <img class="yin" src="@/assets/imgs/yin.png" alt="">
          <div class="c-text">转轮方式展现全部的类别及群组，中细软，非常直观
            独特。公司可以通过中细软准确统计并自动监控公司
            名下商标情况，并且根据不同流程及程序进行分类筛选，
            非常值得推荐使用。</div>
          <div class="people flex-sc">
            <div class="logo">
              <img src="@/assets/imgs/ifeng.png" alt="">
            </div>
            <div class="info">
              <div class="name">马东强</div>
              <div class="level">MOMENTO 产品总监</div>
            </div>
          </div>
        </div>
        <div class="c-item">
          <img class="yin" src="@/assets/imgs/yin.png" alt="">
          <div class="c-text">转轮方式展现全部的类别及群组，中细软，非常直观
            独特。公司可以通过中细软准确统计并自动监控公司
            名下商标情况，并且根据不同流程及程序进行分类筛选，
            非常值得推荐使用。</div>
          <div class="people flex-sc">
            <div class="logo">
              <img src="@/assets/imgs/sanyou.png" alt="">
            </div>
            <div class="info">
              <div class="name">马东强</div>
              <div class="level">MOMENTO 产品总监</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- more -->
    <div class="more">
      <div class="base-title">
        <img class="title-1" src="@/assets/imgs/information.png" alt="">
        <span class="title-2">更多中细软资讯</span>
      </div>
      <div class="content flex-bc">
        <div v-for="item in moreList" :key="item.id" class="c-item">
          <div class="img-wrap">
            <img :src="item.img" alt="">
            <div class="alt omit-1">{{item.alt}}</div>
          </div>
          <div class="c-text">
            <div class="title omit-1">{{item.title}}</div>
            <div class="time omit-1">{{item.time}}</div>
            <div class="sub omit-2">{{item.content}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- data -->
    <div class="data">
      <div class="base-title">
        <img class="title-1" src="@/assets/imgs/data.png" alt="">
        <span class="title-2">中细软，融入专业初心的数据</span>
      </div>
      <div class="content flex-bc">
        <div v-for="item in dataList" :key="item.label" class="c-item">
          <div class="num-wrap">
            <span class="num">{{item.num}} </span>
            <span class="han">万+</span>
          </div>
          <div class="explain">{{item.label}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'

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
      ],
      activeTab: 0,
      tabsList: [
        {
          label: '商标查询',
          tips: '关联检索、多维搜索、深层过滤商标信息，颠覆性检索模式，全类全群组只在一个页面'
        },
        {
          label: '图形查询',
          tips: '图形查询、多维搜索、深层过滤商标信息，颠覆性检索模式，全类全群组只在一个页面'
        },
        {
          label: '商标监控',
          tips: '商标监控、多维搜索、深层过滤商标信息，颠覆性检索模式，全类全群组只在一个页面'
        }
      ],
      moreList: [
        {
          id: 0,
          img: require('@/assets/imgs/more0.png'),
          alt: '细软课堂知多少？',
          title: '细软课堂2011全新《商标法细软课堂2011全新《商标法',
          time: '2021年12月24日',
          content:
            '本期“细软课堂”由北京中细软有本期“细软课堂”由北京中细软有本期“细软课堂”由北京中细软有本期“细软课堂”由北京中细软有'
        },
        {
          id: 1,
          img: require('@/assets/imgs/more0.png'),
          alt: '细软课堂知多少？',
          title: '细软课堂2011全新《商标法细软课堂2011全新《商标法',
          time: '2021年12月24日',
          content:
            '本期“细软课堂”由北京中细软有本期“细软课堂”由北京中细软有本期“细软课堂”由北京中细软有本期“细软课堂”由北京中细软有'
        },
        {
          id: 2,
          img: require('@/assets/imgs/more0.png'),
          alt: '细软课堂知多少？',
          title: '细软课堂2011全新《商标法细软课堂2011全新《商标法',
          time: '2021年12月24日',
          content:
            '本期“细软课堂”由北京中细软有本期“细软课堂”由北京中细软有本期“细软课堂”由北京中细软有本期“细软课堂”由北京中细软有'
        },
        {
          id: 3,
          img: require('@/assets/imgs/more0.png'),
          alt: '细软课堂知多少？',
          title: '细软课堂2011全新《商标法细软课堂2011全新《商标法',
          time: '2021年12月24日',
          content:
            '本期“细软课堂”由北京中细软有本期“细软课堂”由北京中细软有本期“细软课堂”由北京中细软有本期“细软课堂”由北京中细软有'
        }
      ],
      dataList: [
        {
          num: '4500',
          label: '最新商标申请数据'
        },
        {
          num: '4500',
          label: '最新商数据'
        },
        {
          num: '4500',
          label: '新商标申请数据'
        },
        {
          num: '4500',
          label: '最标申请数据'
        }
      ],
      searchClass: 1,
      searchKey: '',
      redirect: undefined,
      loading: false
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.handleQRLogin()
        }
      },
      immediate: true
    }
  },
  created() {
    this.handleQRLogin()
  },
  mounted() {
    this.initWaves()
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
    },
    handleChange(val) {
      this.activeTab = val
    },
    ManualChange(index) {
      this.$refs.carousel.setActiveItem(index)
    },
    // 处理选择搜索类
    handleClass(value) {
      this.searchClass = value
    },
    // 处理点击搜索
    handleSearch(value) {
      if (this.isLogin) {
        if (value.length > 1) {
          this.searchKey = value
          this.$router.push({
            name: 'TrademarkSearch',
            query: { searchKey: value, searchClass: this.searchClass }
          })
        } else {
          Message({
            message: '搜索关键字长度至少为2个字符',
            type: 'error',
            duration: 3 * 1000
          })
        }
      } else {
        this.$store.commit('SET_IS_LOGIN_DIALOG', true)
      }
    },
    // 处理扫码登录
    handleQRLogin() {
      // const isLogin = this.$store.getters.isLogin
      const code = this.$route.query.code
      console.log('this.$route.query.code', this.$route.query.code)
      if (!this.isLogin && code) {
        this.loading = true
        this.$store
          .dispatch('login', { code })
          .then(() => {
            this.$router.push({
              path: this.redirect || '/'
            })
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    // 初始化 波浪动画
    initWaves() {
      /**
       *3D海洋效应与 Canvas2D
       * 您可以更改注释 "效果属性" 下的属性
       */

      let size = 10
      let up = true
      setInterval(function() {
        if (up) {
          size += 10
          if (size >= 240) {
            up = false
          }
        } else {
          size -= 10
          if (size == 10) {
            up = true
          }
        }
      }, 500)

      // Init Context
      const c = document.createElement('canvas').getContext('2d')
      const postctx = document
        // .body.appendChild(document.createElement('canvas'))
        .getElementById('waves')
        .getContext('2d')
      const canvas = c.canvas
      const vertices = []

      // Effect Properties
      const vertexCount = 7000
      const vertexSize = 3
      const oceanWidth = 204
      const oceanHeight = -200
      const gridSize = 32
      const waveSize = 25
      const perspective = 100

      // Common variables
      const depth = (vertexCount / oceanWidth) * gridSize
      let frame = 0
      const { sin, cos, tan, PI } = Math

      // Render loop
      const loop = () => {
        const rad = (sin(frame / 100) * PI) / 20
        const rad2 = (sin(frame / 50) * PI) / 10
        frame++
        if (
          postctx.canvas.width !== postctx.canvas.offsetWidth ||
          postctx.canvas.height !== postctx.canvas.offsetHeight
        ) {
          postctx.canvas.width = canvas.width = postctx.canvas.offsetWidth
          postctx.canvas.height = canvas.height = postctx.canvas.offsetHeight
        }

        // 背景色
        // c.fillStyle = 'hsla(200deg, 100%, 2%, 60%)'
        // c.fillStyle = 'hsla(200deg, 100%, 25%, 60%)'
        c.fillStyle = 'rgba(255,255,255,0)'
        // c.fillStyle = '#0e227c'
        c.fillStyle = '#0e215c'
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.save()
        c.translate(canvas.width / 2, canvas.height / 2)

        c.beginPath()
        vertices.forEach((vertex, i) => {
          const ni = i + oceanWidth
          let x = vertex[0] - (frame % (gridSize * 2))
          let z =
            vertex[2] -
            ((frame * 2) % gridSize) +
            (i % 2 === 0 ? gridSize / 2 : 0)
          const wave =
            cos(frame / 45 + x / 50) -
            sin(frame / 20 + z / 50) +
            sin(frame / 30 + (z * x) / 10000)
          let y = vertex[1] + wave * waveSize
          const a = Math.max(0, 1 - Math.sqrt(x ** 2 + z ** 2) / depth)
          let tx, ty, tz

          y -= oceanHeight

          // 动画坐标系
          // Transformation variables
          tx = x
          ty = y
          tz = z

          // Rotation Y
          tx = x * cos(rad) + z * sin(rad)
          tz = -x * sin(rad) + z * cos(rad)

          x = tx
          y = ty
          z = tz

          // Rotation Z
          tx = x * cos(rad) - y * sin(rad)
          ty = x * sin(rad) + y * cos(rad)

          x = tx
          y = ty
          z = tz

          // Rotation X

          ty = y * cos(rad2) - z * sin(rad2)
          tz = y * sin(rad2) + z * cos(rad2)

          x = tx
          y = ty
          z = tz

          x /= z / perspective
          y /= z / perspective

          if (a < 0.01) return
          if (z < 0) return

          c.globalAlpha = a
          // 粒子颜色
          // c.fillStyle = `hsla(${size + wave * 2}deg, 100%, 100%, 100%)`
          c.fillStyle = `hsla(${size + wave * 2}deg, 100%, 100%, 100%)`
          // c.fillStyle = '#fff'
          c.fillRect(
            x - (a * vertexSize) / 2,
            y - (a * vertexSize) / 2,
            a * vertexSize,
            a * vertexSize
          )
          c.globalAlpha = 1
        })
        c.restore()

        // Post-processing
        postctx.drawImage(canvas, 0, 0)
        postctx.globalCompositeOperation = 'screen'
        postctx.filter = 'blur(16px)'
        postctx.drawImage(canvas, 0, 0)
        postctx.filter = 'blur(0)'
        postctx.globalCompositeOperation = 'source-over'

        requestAnimationFrame(loop)
      }

      // Generating dots
      for (let i = 0; i < vertexCount; i++) {
        const x = i % oceanWidth
        const y = 0
        const z = (i / oceanWidth) >> 0
        const offset = oceanWidth / 2
        vertices.push([(-offset + x) * gridSize, y * gridSize, z * gridSize])
      }

      loop()
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .bg {
    background-image: url(../assets/imgs/aibg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    padding: 80px 0;
  }
  .search {
    // background-image: url(../assets/imgs/search-bg.jpg);
    padding: 0 0;
    // background-color: #3168d9;
    height: 780px;
    position: relative;
    .input-wrap {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      // width: 100%;
      padding-top: 230px;
      margin: 0 auto;
      width: 700px;
      .iknow {
        font-size: 40px;
        letter-spacing: 15px;
        font-weight: bold;
        color: #ffffff;
        padding-bottom: 55px;
      }
      .search-class {
        margin-bottom: 20px;
      }
      z-index: 3;
    }
    .wave-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    #waves {
      position: absolute;
      top: 0px;
      left: 0;
      box-sizing: border-box;
      padding-top: 60px;
      // background-color: rgba(255, 255, 255, 0.3);
      background-color: transparent;
      width: 100%;
      height: 100%;
      opacity: 0.3;
      z-index: 2;
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
    box-sizing: border-box;
    background-image: url(../assets/imgs/swipperbg.png);
    .carousel {
      width: 960px;
      margin: 0 auto;
    }
    .tabs {
      font-size: 18px;
      line-height: 26px;
      letter-spacing: 0px;
      color: #ffffff;
      opacity: 0.9;
      .tab {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 35px 20px;
        &::after {
          content: '';
          margin-top: 10px;
          display: block;
          width: 50px;
          height: 1px;
          background-color: transparent;
        }
      }
      .tab-active {
        font-weight: bold;
        background-image: -webkit-linear-gradient(
          left,
          #4af175,
          #4fe3c0,
          #51dbee
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        &::after {
          background-image: linear-gradient(
              120deg,
              #4af175 1%,
              #4fe3c0 50%,
              #51dbee 100%
            ),
            linear-gradient(#ffffff, #ffffff);
          background-blend-mode: normal, normal;
        }
      }
    }
    .tips-wrap {
      font-size: 14px;
      letter-spacing: 0px;
      color: #ffffff;
      opacity: 0.8;
      padding: 20px 0 30px;
    }
  }
  .compony {
    background-color: #fafcff;
    padding: 80px 0;
    .base-title {
      margin-bottom: 30px;
      .title-1 {
        width: 402px;
      }
    }
    .content {
      img {
        width: 960px;
      }
    }
  }
  .member {
    background-color: #fff;
    padding: 80px 0;
    .base-title {
      margin-bottom: 30px;
      .title-1 {
        width: 374px;
      }
    }
    .content {
      width: 1200px;
      margin: 0 auto;
      .c-item {
        width: 30%;
        .yin {
          width: 25px;
        }
        .c-text {
          font-size: 14px;
          padding-left: 25px;
          line-height: 30px;
          margin-bottom: 20px;
        }
        .people {
          .info {
            margin-left: 15px;
            .name {
              font-size: 18px;
              letter-spacing: 0px;
              color: #333333;
              margin-bottom: 15px;
            }
            .level {
              font-size: 14px;
              letter-spacing: 0px;
              color: #65aef0;
            }
          }
        }
      }
    }
  }
  .more {
    padding: 80px 0;
    background-color: #fafcff;
    .base-title {
      margin-bottom: 30px;
      .title-1 {
        width: 630px;
      }
    }
    .content {
      width: 1000px;
      margin: 0 auto;
      .c-item {
        width: 210px;
        .img-wrap {
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          margin-bottom: 20px;
          img {
            height: 210px;
          }
          .alt {
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 11px 0;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.25);
          }
        }
        .c-text {
          .title {
            font-size: 16px;
            color: #333333;
            margin-bottom: 5px;
          }
          .time {
            margin-bottom: 5px;
            font-size: 14px;
            color: #4b98e2;
          }
          .sub {
            font-size: 14px;
            line-height: 18px;
            color: #7f7f7f;
          }
        }
      }
    }
  }
  .data {
    padding: 80px 0;
    background-color: #fff;
    .base-title {
      margin-bottom: 30px;
      .title-1 {
        width: 603px;
      }
    }
    .content {
      width: 900px;
      margin: 0 auto;
      .c-item {
        .num-wrap {
          margin-bottom: 30px;
          background-image: -webkit-linear-gradient(
            left,
            #4af175,
            #4fe3c0,
            #51dbee
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          .num {
            font-size: 40px;
          }
          .han {
            font-size: 24px;
          }
        }
        .explain {
          text-align: center;
          font-size: 16px;
          color: #666;
        }
      }
    }
  }
}
</style>
