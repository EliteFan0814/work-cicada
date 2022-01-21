<template>
  <div class="dialog-wrap">
    <el-dialog :title="title" :visible="true" :close-on-click-modal="false" width="800px" @close="handleSubmit(false)">
      <div slot="title" class="title-wrap">
        {{title}}
      </div>
      <div class="form-wrap">
        <div class="common-wrap">
          <div class="form-item flex-sc">
            <div class="label">监控条件：</div>
            <div class="value">
              <BaseDialogCondition></BaseDialogCondition>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">申请号：</div>
            <div class="value">
              <BaseTextarea width="100%" placeholder="请输入申请号（若有多个申请号，请以英文分号隔开）"></BaseTextarea>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">商标名称：</div>
            <div class="value">
              <BaseInput class="input-style" width="100%" placeholder="请输入商标名称"></BaseInput>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">商标图样：</div>
            <div class="value">
              <BaseUpImg></BaseUpImg>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">申请主体：</div>
            <div class="value more-show">
              <BaseInputRemote class="input-style" width="100%" multi placeholder="若不输入，默认为所有申请主体"></BaseInputRemote>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">代理机构：</div>
            <div class="value more-show">
              <BaseInputRemote class="input-style" width="100%" placeholder="若不输入，默认为所有代理机构"></BaseInputRemote>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">申请标号：</div>
            <div class="value">
              <BaseInput class="input-style" width="100%" placeholder="输入商标号（50个以内，多个请以英文分号隔开）"></BaseInput>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">申请类别：</div>
            <div class="value">
              <classList showAll></classList>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">法律状态：</div>
            <div class="value">
              <classList></classList>
            </div>
          </div>
        </div>
        <div class="email-wrap">
          <div class="form-item flex-sc">
            <div class="label">发送邮箱：</div>
            <div class="value">
              <BaseInput class="input-style" width="100%" placeholder="请输入您的电子邮箱"></BaseInput>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">发送频率：</div>
            <div class="value">
              <el-radio v-model="radio" label="1">每周</el-radio>
              <el-radio v-model="radio" label="2">每月</el-radio>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">发送格式：</div>
            <div class="value">
              <span>Excel</span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSubmit(false)" size="mini" round>重 置</el-button>
        <el-button type="primary" @click="handleSubmit(true)" size="mini" round>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import classList from './classList'
export default {
  components: { classList },
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      radio: '1'
    }
  },
  methods: {
    handleSubmit(flag) {
      this.$emit('submit', flag)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-wrap {
  ::v-deep .el-dialog__header {
    padding: 0;
  }
  ::v-deep .el-dialog__body {
    padding: 0;
  }
  ::v-deep .el-dialog__close {
    &::before {
      color: #fff;
    }
  }
  .title-wrap {
    padding: 20px;
    // border: 1px solid red;
    background-color: #3168d9;
    font-size: 16px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .form-wrap {
    .form-item {
      padding: 8px 0;
      .label {
        width: 70px;
        flex-shrink: 0;
        padding-right: 10px;
      }
      .value {
        overflow: hidden;
        flex-grow: 1;
        .input-style {
          padding: 5px 10px;
        }
      }
      .more-show {
        overflow: unset;
      }
    }
    .common-wrap {
      padding: 15px 20px;
    }
    .email-wrap {
      padding: 15px 20px;
      background-color: #f7f7f7;
    }
  }
}
</style>
