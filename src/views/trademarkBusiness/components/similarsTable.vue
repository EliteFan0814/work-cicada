<template>
  <el-table :data="tableData" border style="width: 100%" size="small">
    <el-table-column
      prop="reg_id"
      label="近似商标注册号"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="category"
      label="近似商标国际分类"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="agent_name"
      label="近似商标代理机构"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="issue"
      label="近似商标初审公告期号"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="name"
      label="近似商标名"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="owner"
      label="持有人"
      align="center"
    ></el-table-column>
    <el-table-column prop="issue_at" label="近似商标初审时间" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.issue_at | $formatDate }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="issue_at"
      label="近似商标异议截止日期"
      align="center"
    >
      <template slot-scope="scope">
        <span>
          {{ $dayjs(scope.row.issue_at).add(3, 'month') | $formatDate }}
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
