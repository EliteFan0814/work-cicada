<template>
  <div class="dialog-wrap">
    <el-dialog :title="title" :visible="true" :close-on-click-modal="false" width="800px" @close="handleSubmit(false)">
      <div slot="title" class="title-wrap">
        {{isAdd?'添加':'修改当前'}}{{title}}
      </div>
      <div class="form-wrap">
        <div class="common-wrap">
          <!-- <div class="form-item flex-sc">
            <div class="label">监控条件：</div>
            <div class="value">
              <BaseDialogCondition></BaseDialogCondition>
            </div>
          </div> -->
          <div class="form-item flex-sc">
            <div class="label">监控类型：</div>
            <div class="value">
              <el-radio-group v-model="genre">
                <el-radio v-if="genre === 1" :label="1">初审监控</el-radio>
                <el-radio v-if="genre === 2" :label="2">业务监控</el-radio>
                <el-radio v-if="genre === 3" :label="3">流程监控</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">业务类型：</div>
            <div class="value">
              <el-radio-group v-model="biz_genre">
                <el-radio :label="1">可提撤三</el-radio>
                <el-radio :label="2">可提续展</el-radio>
                <el-radio :label="3">可提异议</el-radio>
                <el-radio :label="4">可提无效</el-radio>
                <el-radio :label="5">注册五年</el-radio>
              </el-radio-group>
            </div>
          </div>
          <!-- <div class="form-item flex-sc">
            <div class="label">申请号：</div>
            <div class="value">
              <BaseTextarea width="100%" placeholder="请输入申请号（若有多个申请号，请以英文分号隔开）"></BaseTextarea>
            </div>
          </div> -->
          <div class="form-item flex-sc">
            <div class="label">商标名称：</div>
            <div class="value">
              <BaseInput class="input-style" :initValue="name" width="100%" placeholder="请输入商标名称"
                @changeValue="handleName">
              </BaseInput>
            </div>
          </div>
          <!-- <div class="form-item flex-sc">
            <div class="label">商标图样：</div>
            <div class="value">
              <BaseUpImg></BaseUpImg>
            </div>
          </div> -->
          <div class="form-item flex-sc">
            <div class="label">持有人：</div>
            <div class="value more-show">
              <BaseInputRemote class="input-style" width="100%" :outSelectList="owners" multi
                placeholder="若不输入，表示监控全部持有人" @selectListChange="ownersChange"></BaseInputRemote>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">代理机构：</div>
            <div class="value more-show">
              <BaseInputRemote class="input-style" width="100%" :outSelectList="agents" multi
                placeholder="若不输入，默认为所有代理机构" @selectListChange="agentsChange"></BaseInputRemote>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">注册号：</div>
            <div class="value more-show">
              <BaseInputRemote class="input-style" width="100%" :outSelectList="reg_ids" multi
                placeholder="若不输入，表示不具体到特定商标" @selectListChange="regIdsChange"></BaseInputRemote>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">国际分类：</div>
            <div class="value">
              <classList showAll :outSelectList="categories" @classChange="categoriesChange"></classList>
            </div>
          </div>

          <div class="form-item flex-sc">
            <div class="label">法律状态：</div>
            <div class="value">
              <el-checkbox-group v-model="status">
                <el-checkbox :label="1">申请中</el-checkbox>
                <el-checkbox :label="2">已注册</el-checkbox>
                <el-checkbox :label="3">已无效</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="form-item flex-sc">
            <div class="label">流程类型：</div>
            <div class="value">
              <el-checkbox-group v-model="flows">
                <el-checkbox :label="1">驳回通知</el-checkbox>
                <el-checkbox :label="2">驳回复审</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>

        </div>
        <div class="email-wrap">
          <div class="form-item flex-sc">
            <div class="label">发送邮箱：</div>
            <div class="value more-show">
              <BaseInput class="input-style" :initValue="email" validType="email" width="100%" placeholder="请输入您的电子邮箱"
                @changeValue="handleEmail">
              </BaseInput>
            </div>
          </div>
          <!-- <div class="form-item flex-sc">
            <div class="label">发送频率：</div>
            <div class="value">
              <el-radio v-model="radio" label="1">每周</el-radio>
              <el-radio v-model="radio" label="2">每月</el-radio>
            </div>
          </div> -->
          <!-- <div class="form-item flex-sc">
            <div class="label">发送格式：</div>
            <div class="value">
              <span>Excel</span>
            </div>
          </div> -->
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset" size="mini" round>重 置</el-button>
        <el-button type="primary" @click="handleSubmit(true)" size="mini" round>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import watch from '@/api/watch'
import classList from './classList'
export default {
  components: { classList },
  props: {
    title: {
      type: String
    },
    isAdd: {
      type: Boolean
    },
    genre: {
      type: [String, Number],
      require: true
    }
  },
  data() {
    return {
      radio: '1',
      email: '',
      categories: [],
      agents: [],
      owners: [],
      reg_ids: [],
      name: '',
      status: [],
      biz_genre: 1,
      flows: [],
      validEmail: false
    }
  },
  methods: {
    handleReset() {
      this.email = ''
      this.categories = []
      this.agents = []
      this.owners = []
      this.reg_ids = []
      this.name = ''
      this.status = []
      this.biz_genre = 1
      this.flows = []
    },
    handleSubmit(flag) {
      const {
        categories,
        agents,
        owners,
        reg_ids,
        name,
        status,
        biz_genre,
        flows
      } = this.$data
      const condition = {
        categories,
        agents,
        owners,
        reg_ids,
        name,
        status,
        biz_genre,
        flows
      }
      console.log({ genre: this.genre, email: this.email, condition })
      if (this.isAdd) {
        this.addNewWatch(flag)
      } else {
        this.editWatch(flag)
      }
    },
    // 处理名字改变
    handleName(value) {
      this.name = value
    },
    // 处理邮箱改变
    handleEmail(value, validEmail) {
      this.email = value
      this.validEmail = validEmail
    },
    // 持有人变更
    ownersChange(ownersList) {
      this.owners = ownersList
      // const tempList = ownersList.map((item) => {
      //   return item.label
      // })
      // this.owners = tempList
    },
    // 代理机构变更
    agentsChange(agentsList) {
      this.agents = agentsList
      // const tempList = agentsList.map((item) => {
      //   return item.label
      // })
      // this.agents = tempList
    },
    // 国际分类数组变更
    categoriesChange(categoriesList) {
      this.categories = categoriesList
      // this.categories = categoriesList.map((item) => {
      //   return item.value
      // })
    },
    // 注册号数组变更
    regIdsChange(regIdsList) {
      this.reg_ids = regIdsList
      // this.reg_ids = regIdsList.map((item) => {
      //   return item.value
      // })
    },
    // 添加新的监听
    addNewWatch(flag) {
      this.$emit('submit', flag)
      // watch
      //   .watchListAdd({ genre: this.genre, email: this.email, condition })
      //   .then((res) => {
      //     console.log(res)
      //   })
    },
    // 修改监听
    editWatch(flag) {
      this.$emit('submit', flag)
      // watch
      //   .watchListAdd({ genre: this.genre, email: this.email, condition })
      //   .then((res) => {
      //     console.log(res)
      //   })
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
