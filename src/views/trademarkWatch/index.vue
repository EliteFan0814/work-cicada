<template>
  <div class="trademark-watch">
    <div class="update flex-cc  pointer">
      <el-popover placement="bottom" width="200" trigger="click">
        <img slot="reference" src="@/assets/img/update.png" alt="">
        <div class="pop-wrap">
          <div @click="openDialog('first')">初审公告监测</div>
          <div @click="openDialog('second')">具体商标监控</div>
          <div @click="openDialog('third')">撤三商标监控</div>
          <div @click="openDialog('fourth')">持续商标监控</div>
        </div>
      </el-popover>
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
      <div class="table-list">
        <firstTable></firstTable>
      </div>
      <BasePagination :total="100" :nowPageNum.sync="nowPageNum" :pageSize.sync="pageSize"></BasePagination>
    </div>
    <dialogCommit v-if="showDialog" title="初审公告监控" @submit="handleSubmit"></dialogCommit>
    <BasePopConfirm v-if="showDel" @close="handleConfirm"></BasePopConfirm>
  </div>
</template>
<script>
import firstTable from './firstTable'
import dialogCommit from './dialogCommit'
export default {
  components: { firstTable, dialogCommit },
  data() {
    return {
      activeName: 'first',
      nowPageNum: 2,
      pageSize: 30,
      showDialog: false,
      showDel: true
    }
  },
  watch: {
    activeName(newVal) {
      console.log(newVal)
    }
  },
  methods: {
    handleClick(value) {
      console.log(value)
    },
    handleSubmit(flag) {
      this.showDialog = false
    },
    openDialog(flag) {
      this.showDialog = true
    },
    handleConfirm(flag) {
      this.showDel = false
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
.pop-wrap {
  div {
    padding: 8px 0;
    cursor: pointer;
    text-align: center;
    &:hover {
      color: #3168d9;
      font-weight: bold;
    }
  }
}
</style>
