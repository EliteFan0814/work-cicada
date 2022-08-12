<template>
  <div class="collect-dialog">
    <el-dialog
      :title="title"
      :visible="true"
      :close-on-click-modal="false"
      width="800px"
      @close="handleSubmit(false)"
    >
      <div v-loading="loading" class="list">
        <el-table
          border
          :data="tableData"
          height="500"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
        >
          <el-table-column
            label="序号"
            width="50"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            label="名称"
            prop="name"
            align="center"
          ></el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
              <div>
                {{ scope.row.created_at | $formatDate }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <div>
                <el-button type="text" @click="handleToDetail(scope.row.eid)">
                  查看详情
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-wrap">
          <BasePagination
            :total="totalNum"
            :nowPageNum.sync="nowPageNum"
            :pageSize.sync="pageSize"
            @pageChange="handlePageChange"
          ></BasePagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import search from '@/api/search'
export default {
  data() {
    return {
      title: '已领取商机列表',
      loading: false,
      totalNum: 0,
      nowPageNum: 1,
      pageSize: 10,
      tableData: [],
      headerCellStyle: {
        backgroundColor: '#f3f9fc',
        textAlign: 'center',
        color: '#2b2d32'
      }
    }
  },
  created() {
    this.getTableInfo()
  },
  methods: {
    // 获取列表数据
    getTableInfo() {
      this.loading = true
      search
        .getMyBusinessList(this.nowPageNum, this.pageSize)
        .then((res) => {
          this.loading = false
          this.tableData = res.compaines || []
          this.totalNum = res.count
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleSubmit(flag) {
      this.$emit('submit', flag)
    },
    // 跳转到商机详情
    handleToDetail(eid) {
      const routeData = this.$router.resolve({
        name: 'TrademarkBusiness',
        query: { eid, type: 'other' }
      })
      window.open(routeData.href, '_blank')
    },
    handlePageChange() {
      this.getTableInfo()
    }
  }
}
</script>
