<template>
  <div class="pop-confirm">
    <el-dialog
      :close-on-click-modal="false"
      center
      :visible="true"
      :show-close="true"
      width="440px"
      @close="handleClose"
    >
      <div class="content">
        <div class="img"><img src="@/assets/imgs/logo-login.png" alt="" /></div>
        <div class="info flex-cc">
          <!-- <img src="@/assets/imgs/qr-login.png" alt=""> -->
          <!-- <div id="wxqrcode"></div> -->
          <iframe
            id="square"
            :src="iframeSrc"
            frameborder="0"
            scrolling="no"
            width="300px"
            height="400px"
          ></iframe>
        </div>
        <!-- <div class="tips" @click="handleLoginTemp">点击临时登录</div> -->
      </div>
      <!-- <div class="content2">
        <div class="img"><img src="@/assets/imgs/logo-login.png" alt=""></div>
        <div class="input-wrap">
          <div class="tabs-wrap">
            <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
              <el-tab-pane label="微信扫码登录" name="first"></el-tab-pane>
              <el-tab-pane label="账号密码登录" name="second"></el-tab-pane>
            </el-tabs>
          </div>
          <div v-show="activeName==='first'" class="qr-wrap">
            <div class="info flex-cc" id="wxqrcode">
            </div>
            <div class="tips">企业微信扫码登录</div>
          </div>
          <div v-show="activeName==='second'" class="psd-login">
            <div class="account-input">
              <el-input placeholder="请输入账号" v-model="account">
                <template slot="prepend">账号</template>
              </el-input>
              <div class="tips">请输入正确的账号</div>
            </div>
            <div class="account-input">
              <el-input placeholder="请输入账号" v-model="account">
                <template slot="prepend">密码</template>
                <span slot="append" @click="handleForget">忘记密码</span>
              </el-input>
              <div class="tips">密码错误</div>
            </div>
            <div class="slide-wrap">
              <BaseSlideVerify></BaseSlideVerify>
            </div>
            <div class="btn">
              <el-button type="primary" size="medium" @click="handleLogin">立即登录</el-button>
            </div>
          </div>
        </div>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import { getWxLoginConfig } from '@/utils/globaltools'
export default {
  name: 'BaseLogin',
  data() {
    return {
      activeName: 'first',
      account: '',
      password: '',
      appid: '',
      agentid: '',
      // 微信重定向地址源码（源码 编码请同时修改）
      redirect_uri_original: '',
      state: '',
      href: '',
      lang: 'zh',
      self_redirect: false,
      // 登录后重定向的路由地址
      redirectRoute: undefined
    }
  },
  computed: {
    // 重新编码微信重定向地址
    redirect_uri() {
      return encodeURIComponent(this.redirect_uri_original)
    },
    iframeSrc() {
      return `https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=${this.appid}&agentid=${this.agentid}&redirect_uri=${this.redirect_uri}&state=${this.state}&self_redirect=${this.self_redirect}`
    }
  },
  created() {
    this.handleWxLoginConfig()
    this.redirectRoute = this.$store.state.redirectRoute
    // 如果页面重定向参数存在
    if (this.redirectRoute) {
      // 二次加工微信重定向地址，若页面重定向参数存在，则加入此参数
      this.redirect_uri_original = `${this.redirect_uri_original}?redirect=${this.redirectRoute}`
      // 重新编码微信重定向地址
      // this.redirect_uri = encodeURIComponent(this.redirect_uri_original)
    }
    // this.handleClick({ name: 'first' })
    // this.getWxLoginImg()
  },
  methods: {
    // 获取微信授权登录配置信息
    handleWxLoginConfig() {
      const { appid, agentid, redirect_uri_original, state } =
        getWxLoginConfig()
      this.appid = appid
      this.agentid = agentid
      this.redirect_uri_original = redirect_uri_original
      this.state = state
    },
    handleClose() {
      this.$emit('closeDialog', false)
      // this.$store.commit('SET_IS_LOGIN', true)
    },
    handleForget() {},
    // 临时登录
    handleLoginTemp() {
      this.$store.dispatch('loginTemp').then((res) => {})
    },
    handleClick(value) {
      if (value.name === 'first') {
        this.getWxLoginImg()
      }
    },
    getWxLoginImg() {
      const wwLogin = new WwLogin({
        id: 'wxqrcode',
        appid: 'wxdf237e7c63de94bb',
        agentid: '1000032',
        redirect_uri: 'https%3A%2F%2Fiknow.d.gbicom.com%2F',
        state: '',
        href: '',
        lang: 'zh'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-confirm {
  ::v-deep .el-dialog__header {
    padding: 0;
  }
  ::v-deep .el-dialog__body {
    padding: 0;
  }
  ::v-deep .el-dialog__footer {
    border-top: 1px solid #e8e8e8;
    padding-left: 0;
    padding-right: 0;
  }
  .content {
    padding: 20px;
    .img {
      margin-bottom: 40px;
      img {
        width: 120px;
      }
    }
    .info {
      padding: 10px;
    }
    .tips {
      text-align: center;
    }
  }
  .content2 {
    padding: 20px;
    ::v-deep .el-input-group__prepend {
      background-color: #fff;
      border: none;
    }
    ::v-deep .el-input-group__append {
      cursor: pointer;
      background-color: #fff;
      border: none;
      color: #3168d9;
    }
    ::v-deep .el-input__inner {
      border: none;
    }
    .el-tabs {
      ::v-deep .el-tabs__active-bar {
        background-color: #3168d9;
      }
      ::v-deep .el-tabs__item {
        &:hover {
          color: #3168d9;
        }
      }
      ::v-deep .is-active {
        color: #3168d9;
      }
    }
    .input-wrap {
      padding: 20px;
      .tabs-wrap {
        display: flex;
        justify-content: center;
        .el-tabs {
          width: 100%;
        }
      }
      .qr-wrap {
        .info {
          padding: 10px;
        }
        .tips {
          text-align: center;
        }
      }
      .psd-login {
        .account-input {
          border-radius: 4px;
          border: solid 1px #ebeef5;
          margin-bottom: 30px;
          position: relative;
          .tips {
            font-size: 12px;
            position: absolute;
            bottom: -20px;
            left: 10px;
            color: #fa311a;
          }
        }
        .slide-wrap {
          margin-bottom: 30px;
        }
        .btn {
          .el-button {
            width: 100%;
            background-color: #3168d9;
            border: 1px solid #3168d9;
            &:hover {
              background-color: #5a88e4;
              border: 1px solid #5a88e4;
            }
          }
        }
      }
    }
  }
}
</style>
