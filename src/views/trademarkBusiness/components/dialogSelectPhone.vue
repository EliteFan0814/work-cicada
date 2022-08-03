<template>
  <div class="phone-wrap">
    <el-dialog
      :title="title"
      :visible="true"
      :close-on-click-modal="false"
      width="800px"
      @close="handleSubmit(false)"
    >
      <div v-loading="loading" class="phone-list">
        <div class="list-wrap">
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              v-for="item in phoneList"
              :key="item.mobile"
              :label="item.mobile"
            >
              <span>
                {{ item.mobile }}
                <el-tag size="mini" class="tag">{{ item.area }}</el-tag>
                <el-tag size="mini" class="tag" type="success">
                  {{ item.operator }}
                </el-tag>
                <el-tag size="mini" class="tag" type="info">
                  {{ item.status_text }}
                </el-tag>
              </span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleReset" size="mini" round>重 置</el-button>
          <el-button
            type="primary"
            @click="handleSubmit(true)"
            size="mini"
            round
            :disabled="checkList.length === 0"
          >
            确 定
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import search from '@/api/search'

export default {
  props: {
    eid: {
      type: String,
      default: ''
    },
    phoneList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      title: '一键转CRM客户',
      checkList: []
    }
  },
  methods: {
    handleSubmit(flag) {
      if (flag) {
        this.loading = true
        search
          .busCreateCustomer(this.eid, this.checkList)
          .then((res) => {
            this.loading = false
            this.$message({ type: 'success', message: '转接成功' })
            this.$emit('submit', flag)
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        this.$emit('submit', flag)
      }
    },
    handleReset() {
      this.checkList = []
    }
  }
}
</script>
<style lang="scss" scoped>
.phone-wrap {
  .phone-list {
    .list-wrap {
      padding: 10px 0;
      min-height: 300px;
      .el-checkbox {
        width: 45%;
        padding: 5px 0;
      }
      .tag {
        margin: 0 2px;
      }
    }
  }
}
</style>
