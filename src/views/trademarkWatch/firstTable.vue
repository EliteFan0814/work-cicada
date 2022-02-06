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
              v-else-if="item.prop === 'categories'">{{scope.row.condition.categories?scope.row.condition.categories.toString():'全部类别'}}</span>
            <span v-else>{{scope.row[item.prop]}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="address" label="操作">
        <template slot-scope="scope">
          <div class="operate-wrap">
            <i class="el-icon-edit"></i>
            <i class="el-icon-delete" @click="handleShowDel(scope.row.id,scope)"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <delConfirm v-if="showDel" @close="handleDel"></delConfirm>
  </div>
</template>

<script>
import delConfirm from './delConfirm.vue'
import watch from '@/api/watch'
export default {
  name: 'firstTable',
  components: { delConfirm },
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoading: false,
      showDel: false,
      delId: null,
      delIndex: null,
      tableHead: [
        { label: '任务编号', prop: 'id' },
        { label: '商标名称', prop: 'name' },
        { label: '近似配置', prop: 'similar' },
        { label: '商标图形', prop: 'img' },
        { label: '申请主体', prop: 'owners' },
        { label: '代理机构', prop: 'agents' },
        { label: '申请标号', prop: 'mark' },
        { label: '申请类别', prop: 'categories' },
        { label: '接收邮箱', prop: 'email' },
        { label: '发送频率', prop: 'frequency' }
      ]
    }
  },
  methods: {
    handleShowDel(id, scope) {
      this.showDel = true
      this.delId = id
      this.delIndex = scope.$index
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
