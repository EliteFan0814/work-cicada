<template>
  <div class="pop-confirm">
    <el-dialog :close-on-click-modal="false" center :visible="true" :show-close="true" width="440px">
      <div class="content">
        <div class="img"><img src="@/assets/imgs/logo-login.png" alt=""></div>
        <div class="info flex-cc">
          <img src="@/assets/imgs/qr-login.png" alt="">
        </div>
        <div class="tips">企业微信扫码登录</div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="handleConfirm(false)" size="mini" round>取 消</el-button>
        <el-button type="primary" @click="handleConfirm(true)" size="mini" round>确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BaseLogin',
  methods: {
    handleConfirm(flag) {
      this.$emit('close', flag)
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
}
</style>
