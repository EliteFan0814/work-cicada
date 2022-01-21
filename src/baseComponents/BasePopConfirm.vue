<template>
  <div class="pop-confirm">
    <el-dialog :close-on-click-modal="false" center :visible="true" :show-close="false" width="440px"
      :before-close="handleClose">
      <div class="content flex-ccc">
        <div class="img flex-cc"><img src="@/assets/imgs/notice.png" alt=""></div>
        <div class="info flex-ccc">
          <span class="title">确认删除监控任务？</span>
          <span class="sub">删除后不可恢复</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleConfirm(false)" size="mini" round>取 消</el-button>
        <el-button type="primary" @click="handleConfirm(true)" size="mini" round>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BasePopConfirm',
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
      width: 50px;
      height: 50px;
      background-color: #f5f5f5;
      border-radius: 50%;
      margin-bottom: 15px;
      img {
        width: 25px;
      }
    }
    .info {
      .title {
        font-size: 16px;
        line-height: 44px;
        letter-spacing: 0px;
        color: #3168d9;
      }
      .sub {
        font-size: 14px;
        letter-spacing: 0px;
        color: #999999;
      }
    }
  }
}
</style>
