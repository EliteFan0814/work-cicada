<template>
  <div class="first-wrap">
    <el-table v-loading="isLoading" :data="tableData" border size="small"
      :header-cell-style="{background:'#fafafa',color: '#666666'}" row-class-name="row-style">
      <el-table-column v-for="(item,index) in tableHead" :key="index" show-overflow-tooltip :label="item.label">
        <template slot-scope="scope">
          <div class="operate-wrap omit-1">
            <span v-if="item.prop === 'name'">{{scope.row.condition.name}}</span>
            <span
              v-else-if="item.prop === 'owners'">{{scope.row.condition.owners?scope.row.condition.owners.toString():'全部'}}</span>
            <span
              v-else-if="item.prop === 'agents'">{{scope.row.condition.agents?scope.row.condition.agents.toString():'全部'}}</span>
            <span
              v-else-if="item.prop === 'reg_ids'">{{scope.row.condition.reg_ids?scope.row.condition.reg_ids.toString():''}}</span>
            <span
              v-else-if="item.prop === 'categories'">{{scope.row.condition.categories?scope.row.condition.categories.toString():'全部类别'}}</span>
            <span v-else>{{scope.row[item.prop]}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="address" label="操作">
        <template slot-scope="scope">
          <div class="operate-wrap">
            <i class="el-icon-edit" @click="handleEdit(scope.row.id)"></i>
            <i class="el-icon-delete" @click="handleShowDel(scope.row.id,scope)"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <delConfirm v-if="showDel" @close="handleDel"></delConfirm>
    <!-- 编辑当前监控 -->
    <dialogCommit v-if="showDialog" :title="dialogTitle" :isAdd="false" :id="editId" :genre="Number(genre)"
      :editSourceInfo="editSourceInfo" @submit="handleSubmit">
    </dialogCommit>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import delConfirm from './delConfirm.vue'
import dialogCommit from './dialogCommit'
import watch from '@/api/watch'
export default {
  name: 'firstTable',
  components: { delConfirm, dialogCommit },
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    dialogTitle: {
      type: String
    },
    genre: {
      type: [String, Number]
    }
  },
  data() {
    return {
      isLoading: false,
      showDel: false,
      delId: null,
      editId: null,
      delIndex: null,
      tableHead: [
        { label: '任务编号', prop: 'id' },
        { label: '商标名称', prop: 'name' },
        // { label: '近似配置', prop: 'similar' },
        // { label: '商标图形', prop: 'img' },
        { label: '持有人', prop: 'owners' },
        { label: '代理机构', prop: 'agents' },
        { label: '注册号', prop: 'reg_ids' },
        { label: '国际分类', prop: 'categories' },
        { label: '接收邮箱', prop: 'email' }
        // { label: '发送频率', prop: 'frequency' }
      ],
      showDialog: false,
      editSourceInfo: null
    }
  },
  methods: {
    handleShowDel(id, scope) {
      this.showDel = true
      this.delId = id
      this.delIndex = scope.$index
    },
    // 处理编辑
    handleEdit(id) {
      this.editId = id
      this.isLoading = true
      watch
        .watchListDetail(id)
        .then((res) => {
          this.isLoading = false
          this.showDialog = true
          this.editSourceInfo = { email: res.email, ...res.condition }
          console.log('editSourceInfo', this.editSourceInfo)
        })
        .catch(() => {
          this.isLoading = false
          this.showDialog = false
        })
    },
    // 处理删除
    handleDel(flag) {
      if (flag) {
        this.isLoading = true
        watch
          .watchListDel(this.delId)
          .then((res) => {
            this.isLoading = false
            this.tableData.splice(this.delIndex, 1)
            Message({
              message: '删除成功',
              type: 'success',
              duration: 1 * 1000
            })
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.isLoading = false
            this.showDel = false
          })
      } else {
        this.showDel = false
      }
    },
    // 修改
    handleSubmit(flag) {
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.first-wrap {
  .operate-wrap {
    i {
      font-size: 20px;
      padding-right: 10px;
      cursor: pointer;
    }
    .el-icon-edit {
      color: #99ccff;
    }
    .el-icon-delete {
      color: #ff6666;
    }
  }
}
</style>
