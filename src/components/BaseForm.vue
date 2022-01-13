<template>
  <div class="base-form">
    <el-table :data="tableData" border :header-cell-style="{background:'#fafafa',color: '#666666'}" style="width: 100%">
      <el-table-column prop="date" label="商标名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="图样" width="180">
      </el-table-column>
      <el-table-column prop="address" label="类别">
        <template slot="header" slot-scope="scope">
          <div class="class-wrap">
            <span>类别</span>
            <i class="el-icon-sort"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="申请号">
      </el-table-column>
      <el-table-column prop="address" label="申请人">
      </el-table-column>
      <el-table-column prop="address" label="申请日">
        <template slot="header" slot-scope="scope">
          <div class="class-wrap">
            <span>申请日</span>
            <i class="el-icon-sort"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="注册日">
        <template slot="header" slot-scope="scope">
          <div class="class-wrap">
            <span>注册日</span>
            <i class="el-icon-sort"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="群组">
      </el-table-column>
      <el-table-column prop="address" label="项目">
        <template slot="header" slot-scope="scope">
          <div class="class-wrap">
            <span>项目</span>
            <i class="el-icon-sort"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="流程">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'BaseForm',
  data() {
    return {
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
  }
}
</script>
<style lang="scss" scoped>
.class-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
