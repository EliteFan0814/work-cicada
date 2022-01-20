<template>
  <div class="first-wrap">
    <el-table :data="tableData" border size="small" :header-cell-style="{background:'#fafafa',color: '#666666'}"
      row-class-name="row-style">
      <el-table-column v-for="(item,index) in tableHead" :key="index" show-overflow-tooltip :prop="item.prop"
        :label="item.label">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="address" label="操作">
        <template slot-scope="scope">
          <div class="operate-wrap">
            <i class="el-icon-edit"></i>
            <i class="el-icon-delete"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'firstTable',
  data() {
    return {
      tableHead: [
        { label: '任务编号', prop: 'id' },
        { label: '商标名称', prop: 'name' },
        { label: '近似配置', prop: 'similar' },
        { label: '商标图形', prop: 'img' },
        { label: '申请主体', prop: 'main' },
        { label: '代理机构', prop: 'agent' },
        { label: '申请标号', prop: 'mark' },
        { label: '申请类别', prop: 'class' },
        { label: '接收邮箱', prop: 'email' },
        { label: '发送频率', prop: 'frequency' }
      ],
      tableData: [
        {
          id: '15284574',
          name: '王小虎',
          similar: '王小虎',
          img: '2016-05-02',
          main: true,
          agent: '42',
          mark: '已注册',
          class: '已注册',
          email:
            '上海市普陀上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄区金沙江路 1518 弄',
          frequency: '已注册'
        },
        {
          id: '15284574',
          name: '王小虎',
          similar: '王小虎',
          img: '2016-05-02',
          main: true,
          agent: '42',
          mark: '已注册',
          class: '已注册',
          email:
            '上海市普陀上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄区金沙江路 1518 弄',
          frequency: '已注册'
        },
        {
          id: '15284574',
          name: '王小虎',
          similar: '王小虎',
          img: '2016-05-02',
          main: true,
          agent: '42',
          mark: '已注册',
          class: '已注册',
          email:
            '上海市普陀上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄区金沙江路 1518 弄',
          frequency: '已注册'
        }
      ]
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
