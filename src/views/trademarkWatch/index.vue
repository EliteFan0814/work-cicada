<template>
  <div class="trademark-watch">
    <div class="update flex-cc  pointer">
      <el-popover placement="bottom" width="200" trigger="click">
        <img slot="reference" src="@/assets/img/update.png" alt="">
        <div class="pop-wrap">
          <div @click="openDialog(1,'初审监控',true)">初审监控</div>
          <div @click="openDialog(2,'业务监控',true)">业务监控</div>
          <div @click="openDialog(3,'流程监控',true)">流程监控</div>
        </div>
      </el-popover>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="初审监控" name="1"></el-tab-pane>
        <el-tab-pane label="业务监控" name="2"></el-tab-pane>
        <el-tab-pane label="流程监控" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <!-- 顶部分页和下载 -->
      <div class="top-pagination">
        <BasePagination :total="total" :nowPageNum.sync="nowPageNum" :pageSize.sync="pageSize"
          @pageChange="handlePageChange"></BasePagination>
        <BaseDownload></BaseDownload>
      </div>
      <div class="table-list">
        <firstTable :tableData="tableData" :dialogTitle="changeDialogTitle" :genre="activeName" v-loading="loading">
        </firstTable>
      </div>
      <BasePagination :total="total" :nowPageNum.sync="nowPageNum" :pageSize.sync="pageSize"
        @pageChange="handlePageChange"></BasePagination>
    </div>
    <dialogCommit v-if="showDialog" :title="dialogTitle" :isAdd="isAdd" :genre="addWatchClass" @submit="handleSubmit">
    </dialogCommit>
    <BasePopConfirm v-if="showDel" @close="handleConfirm"></BasePopConfirm>
  </div>
</template>
<script>
import watch from '@/api/watch'
import firstTable from './firstTable'
import dialogCommit from './dialogCommit'
export default {
  components: { firstTable, dialogCommit },
  data() {
    return {
      loading: false,
      activeName: '1',
      nowPageNum: 1,
      pageSize: 10,
      total: 0,
      showDialog: false,
      addWatchClass: null,
      showDel: false,
      tableData: [],
      dialogTitle: '',
      isAdd: false
    }
  },
  computed: {
    changeDialogTitle() {
      if (this.activeName === '1') {
        return '初审监控'
      } else if (this.activeName === '2') {
        return '业务监控'
      } else {
        return '流程监控'
      }
    }
  },
  watch: {
    activeName(newVal) {
      console.log(newVal)
    }
  },
  mounted() {
    this.getWatchList()
  },
  methods: {
    // 获取监控列表
    getWatchList() {
      this.loading = true
      watch
        .getWatchList({
          page: this.nowPageNum,
          size: this.pageSize,
          genre: this.activeName
        })
        .then((res) => {
          this.tableData = res.data
          this.total = res.total
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handlePageChange() {
      this.getWatchList()
    },
    // 切换列表
    handleClick(value) {
      console.log(value)
      this.nowPageNum = 1
      this.genre = value
      this.getWatchList()
    },
    // 新增监控
    handleSubmit(flag) {
      this.showDialog = false
      this.getWatchList()
    },
    // 打开 dialog
    openDialog(flag, title, isAdd) {
      this.showDialog = true
      this.addWatchClass = flag
      this.dialogTitle = title
      this.isAdd = isAdd
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
