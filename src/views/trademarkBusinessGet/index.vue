<template>
  <div v-loading="loading" class="busget-list">
    <div class="table-wrap">
      <el-table
        border
        :data="tableData"
        style="width: 100%"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column
          label="序号"
          width="50"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="商机" align="center">
          <template slot-scope="scope">
            <div class="bus-list">
              <span
                v-for="item in scope.row.biz"
                :key="item.name"
                class="bus-item"
              >
                <span class="bus-type">{{ item.name }}</span>
                <span class="bus-num">{{ item.count }}</span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="被放弃次数" width="150" align="center">
          <template slot-scope="scope">
            <div>
              <el-tag type="danger" size="small" effect="dark">
                {{ scope.row.take_num }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="handleToDetail(scope.row.eid)">
                领取查看
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
  </div>
</template>

<script>
import search from '@/api/search'

export default {
  data() {
    return {
      loading: false,
      totalNum: 0,
      nowPageNum: 1,
      pageSize: 10,
      headerCellStyle: {
        backgroundColor: '#f3f9fc',
        textAlign: 'center',
        color: '#2b2d32',
        fontWeight: 'bold'
      },
      tableData: []
    }
  },
  created() {
    this.crmLoginAndGetDataAsync()
  },
  methods: {
    // 是否使用CRM登录
    async crmLoginAndGetDataAsync() {
      // 获取查询字符串中的token
      const crmToken = this.$route.query.token || ''
      const isLogin = this.$store.getters.isLogin
      // 如果未登录，crmToken换token进行登录
      if (!isLogin) {
        // crmToken存在 则进行CRM登录
        if (crmToken) {
          try {
            const res = await this.$store.dispatch('crmLogin', crmToken)
            // 若登录成功，请求数据
            if (res) {
              this.getTableData()
            }
          } catch (err) {}
        } else {
          this.$message({ type: 'error', message: '缺失token，CRM登录失败' })
        }
      } else {
        this.getTableData()
      }
    },
    // 获取表格数据
    getTableData() {
      this.loading = true
      search
        .getBusinessList(this.nowPageNum, this.pageSize)
        .then((res) => {
          this.loading = false
          this.tableData = res.data
          this.totalNum = res.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 跳转到商机详情
    handleToDetail(eid) {
      this.$router.push({
        name: 'TrademarkBusiness',
        query: { eid, type: 'other' }
      })
    },
    // 处理页码选择
    handlePageChange() {
      this.crmLoginAndGetDataAsync()
    }
  }
}
</script>
<style lang="scss" scoped>
.busget-list {
  min-height: 700px;
  background: #f7f9fc;
  padding: 10px;
  .table-wrap {
    padding: 10px;
    background-color: #fff;
    .bus-list {
      padding: 5px;
      text-align: left;
      .bus-item {
        margin: 5px;
        padding: 5px 15px;
        border: 1px solid #ddd;
        .bus-num {
          color: red;
        }
      }
    }
    .pagination-wrap {
      padding: 15px 0 0;
    }
  }
}
</style>
