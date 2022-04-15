<template>
  <div class="dialog-wrap">
    <el-dialog :title="title" :visible="true" :close-on-click-modal="false" width="800px" @close="handleSubmit(false)">
      <div slot="title" class="title-wrap">
        {{isAdd?'添加':'修改当前'}}{{title}}
      </div>
      <div v-loading="loading">
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
            <!-- 业务类型 -->
            <!-- <div class="form-item flex-sc">
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
            </div> -->
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
                <BaseInputRemote class="input-style" width="100%" :outSelectList="owners" multi searchClass="owner"
                  placeholder="若不输入，默认监控全部持有人" @selectListChange="ownersChange"></BaseInputRemote>
              </div>
            </div>
            <div class="form-item flex-sc">
              <div class="label">代理机构：</div>
              <div class="value more-show">
                <BaseInputRemote class="input-style" width="100%" :outSelectList="agents" multi searchClass="agent"
                  placeholder="若不输入，默认监控所有代理机构" @selectListChange="agentsChange"></BaseInputRemote>
              </div>
            </div>
            <div class="form-item flex-sc">
              <div class="label">注册号：</div>
              <div class="value more-show">
                <BaseInput class="input-style" :initValue="reg_ids.join(';')" width="100%"
                  placeholder="请输入注册号，多个请以英文分号隔开" @changeValue="handleRegIds">
                </BaseInput>
                <!-- <BaseInputRemote class="input-style" width="100%" :outSelectList="reg_ids" multi
                placeholder="若不输入，表示不具体到特定商标" @selectListChange="regIdsChange"></BaseInputRemote> -->
              </div>
            </div>
            <div class="form-item flex-sc">
              <div class="label">国际分类：</div>
              <div class="value">
                <classList showAll :outSelectList="categories" @classChange="categoriesChange"></classList>
              </div>
            </div>
            <!-- 法律状态 -->
            <!-- <div class="form-item flex-sc">
              <div class="label">法律状态：</div>
              <div class="value">
                <el-checkbox-group v-model="status">
                  <el-checkbox :label="1">申请中</el-checkbox>
                  <el-checkbox :label="2">已注册</el-checkbox>
                  <el-checkbox :label="3">已无效</el-checkbox>
                </el-checkbox-group>
              </div>
            </div> -->
            <!-- 流程类型 -->
            <!-- <div class="form-item flex-sc">
              <div class="label">流程类型：</div>
              <div class="value">
                <el-checkbox-group v-model="flows">
                  <el-checkbox :label="1">驳回通知</el-checkbox>
                  <el-checkbox :label="2">驳回复审</el-checkbox>
                </el-checkbox-group>
              </div>
            </div> -->
          </div>
          <!-- <div class="email-wrap">
            <div class="form-item flex-sc">
              <div class="label">发送邮箱：</div>
              <div class="value more-show">
                <BaseInput class="input-style" :initValue="email" width="100%" placeholder="请输入邮箱，留空则发送至企业微信邮箱"
                  @changeValue="handleEmail">
                </BaseInput>
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
          </div> -->
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleReset" size="mini" round>重 置</el-button>
          <el-button type="primary" @click="handleSubmit(true)" size="mini" round>保 存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'

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
    id: {
      type: [String, Number]
    },
    genre: {
      type: [String, Number],
      require: true
    },
    editSourceInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
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
      validEmail: false,
      allCategories: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45
      ]
    }
  },
  watch: {
    editSourceInfo: {
      handler(newValue) {
        console.log('newValue', newValue)
        if (this.isAdd) {
          this.email = newValue.email || ''
          this.categories = newValue.categories || []
          this.agents = newValue.agents || []
          this.owners = newValue.owners || []
          this.reg_ids = newValue.reg_ids || []
          this.name = newValue.name || ''
          this.status = newValue.status || []
          this.biz_genre = newValue.biz_genre || 1
          this.flows = newValue.flows || []
        } else {
          this.email = newValue.email || ''
          this.categories = newValue.categories || this.allCategories
          this.agents = newValue.agents || []
          this.owners = newValue.owners || []
          this.reg_ids = newValue.reg_ids || []
          this.name = newValue.name || ''
          this.status = newValue.status || []
          this.biz_genre = newValue.biz_genre || 1
          this.flows = newValue.flows || []
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 重置
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
    // 处理提交
    handleSubmit(flag) {
      if (flag) {
        if (this.genre === 1) {
          // 新增初审监控
          if (
            this.agents.length < 1 &&
            this.owners.length < 1 &&
            this.reg_ids.length < 1 &&
            this.name.length < 1
          ) {
            Message({
              message: '持有人、代理机构、注册号、商标名称至少一个不能为空！',
              type: 'warn',
              duration: 3 * 1000
            })
            return false
          }
        } else if (this.genre === 2) {
          // 新增初审监控
          if (
            this.reg_ids.length < 1 &&
            this.status.length < 1 &&
            this.biz_genre
          ) {
            Message({
              message: '业务类型、注册号、法律状态为必填项！',
              type: 'warn',
              duration: 3 * 1000
            })
            return false
          }
        } else if (this.genre === 3) {
          if (
            this.agents.length < 1 &&
            this.owners.length < 1 &&
            this.reg_ids.length < 1 &&
            this.name.length < 1
          ) {
            Message({
              message: '持有人、代理机构、注册号、商标名称至少一个不能为空！',
              type: 'warn',
              duration: 3 * 1000
            })
            return false
          }
          if (this.flows.length < 1) {
            Message({
              message: '流程类型为必填项！',
              type: 'warn',
              duration: 3 * 1000
            })
            return false
          }
        }
        if (this.isAdd) {
          // 如果是新增
          this.addNewWatch(flag)
        } else {
          // 如果是修改
          this.editWatch(flag)
        }
      } else {
        this.$emit('submit', flag)
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
      console.log('ownersList', ownersList)
      this.owners = ownersList
    },
    // 代理机构变更
    agentsChange(agentsList) {
      this.agents = agentsList
    },
    // 国际分类数组变更
    categoriesChange(categoriesList) {
      this.categories = categoriesList
    },
    // 注册号数组变更
    handleRegIds(value) {
      const tempArr = value.split(';')
      this.reg_ids = tempArr
    },
    regIdsChange(regIdsList) {
      this.reg_ids = regIdsList
    },
    // 添加新的监听
    addNewWatch(flag) {
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
      // console.log({ genre: this.genre, email: this.email, condition })
      this.loading = true
      watch
        .watchListAdd({ genre: this.genre, email: this.email, condition })
        .then((res) => {
          Message({
            message: '添加成功！',
            type: 'success',
            duration: 1 * 1000
          })
          this.loading = false
          this.$emit('submit', flag)
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    // 修改监听
    editWatch(flag) {
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
      this.loading = true
      watch
        .watchListEdit({
          id: this.id,
          genre: this.genre,
          email: this.email,
          condition
        })
        .then((res) => {
          this.loading = false
          Message({
            message: '修改成功！',
            type: 'success',
            duration: 1 * 1000
          })
          this.$emit('submit', flag)
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
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
  .dialog-footer {
    text-align: right;
    padding: 20px 20px;
  }
}
</style>
