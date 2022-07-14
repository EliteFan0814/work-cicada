<template>
  <div class="busget-list">
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
              <span class="bus-item">
                <span class="bus-type">异议</span>
                <span class="bus-num">13</span>
              </span>
              <span class="bus-item">
                <span class="bus-type">异议</span>
                <span class="bus-num">13</span>
              </span>
              <span class="bus-item">
                <span class="bus-type">异议</span>
                <span class="bus-num">13</span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="被放弃次数" width="150" align="center">
          <template slot-scope="scope">
            <div>
              <el-tag type="danger" size="small" effect="dark">5</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text">领取查看</el-button>
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
export default {
  data() {
    return {
      totalNum: 0,
      nowPageNum: 1,
      pageSize: 10,
      headerCellStyle: {
        backgroundColor: '#f3f9fc',
        textAlign: 'center',
        color: '#2b2d32',
        fontWeight: 'bold'
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    handlePageChange() {}
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
