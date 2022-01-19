<template>
  <div class="trademark-watch">
    <div class="update flex-cc  pointer">
      <img src="@/assets/img/update.png" alt="">
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="初审公告监测" name="first"></el-tab-pane>
        <el-tab-pane label="具体商标监控" name="second"></el-tab-pane>
        <el-tab-pane label="撤三商标监控" name="third"></el-tab-pane>
        <el-tab-pane label="持续商标监控" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <!-- 顶部分页和下载 -->
      <div class="top-pagination">
        <BasePagination :total="100" :nowPageNum.sync="nowPageNum" :pageSize.sync="pageSize"></BasePagination>
        <BaseDownload></BaseDownload>
      </div>
      <div class="table-list"></div>
      <BasePagination :total="100" :nowPageNum.sync="nowPageNum" :pageSize.sync="pageSize"></BasePagination>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      nowPageNum: 2,
      pageSize: 30
    }
  }
}
</script>
<style lang="scss" scoped>
.trademark-watch {
  padding: 30px;
  .update {
    margin: 0 auto;
    width: 80px;
    height: 80px;
    background-color: #f5f5f5;
    border-radius: 50%;
    img {
      width: 31px;
    }
  }
  .top-pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
