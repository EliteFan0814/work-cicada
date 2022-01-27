<template>
  <div class="pop-confirm">
    <el-dialog :close-on-click-modal="false" center :visible="true" :show-close="true" width="440px"
      @close="handleClose">
      <!-- <div class="content">
        <div class="img"><img src="@/assets/imgs/logo-login.png" alt=""></div>
        <div class="info flex-cc">
          <img src="@/assets/imgs/qr-login.png" alt="">
        </div>
        <div class="tips">企业微信扫码登录</div>
      </div> -->
      <div class="content2">
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
              <!-- <img src="@/assets/imgs/qr-login.png" alt=""> -->
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
              <el-button type="primary" size="medium">立即登录</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BaseLogin',
  data() {
    return {
      activeName: 'first',
      account: '',
      password: ''
    }
  },
  methods: {
    handleClose() {
      this.$store.commit('SET_SHOW_LOGIN', false)
    },
    handleForget() {
      alert(2)
    },
    handleClick(value) {
      if (value.name === 'first') {
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
      .img {
      }
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
          .img {
          }
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
