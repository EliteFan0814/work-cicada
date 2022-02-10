<template>
  <div class="base-form">
    <!-- 顶部分页和下载 -->
    <div class="top-pagination">
      <BasePagination :total="totalNum" :nowPageNum.sync="nowPageNum" :pageSize.sync="pageSize"
        @pageChange="handlePageChange"></BasePagination>
      <!-- <BaseDownload></BaseDownload> -->
    </div>
    <!-- 操作按钮 -->
    <BaseOperate :selectedStyle.sync="selectedStyle" :selected.sync="selected" :selectedNum="selectedNum"></BaseOperate>
    <!-- table 列表 -->
    <div v-if="selectedStyle === 'list'" class="table-style">
      <el-table :data="tableData" ref="searchList" border size="small"
        :header-cell-style="{background:'#fafafa',color: '#666666'}" row-class-name="row-style"
        @selection-change="handleSelectionChange">
        <el-table-column show-overflow-tooltip type="selection">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="商标名称">
        </el-table-column>
        <el-table-column show-overflow-tooltip label="图样">
          <template slot-scope="scope">
            <div class="pre-img-wrap">
              <el-popover placement="right" trigger="hover">
                <div class="pre-max-img">
                  <img :src="scope.row.imgUrl">
                </div>
                <img slot="reference" :src="scope.row.imgUrl" alt="">
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="category" label="类别">
          <template slot="header" slot-scope="scope">
            <div class="class-wrap">
              <span>类别</span>
              <span class="operate">
                <i class="el-icon-sort" @click="sort('category')"></i>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="reg_id" label="申请号">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="owner" label="持有人">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="agent" label="代理机构">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="date_app" label="申请日">
          <template slot="header" slot-scope="scope">
            <div class="class-wrap">
              <span>申请日</span>
              <span class="operate">
                <i class="el-icon-sort" @click="sort('date_app')"></i>
                <!-- <BaseDatePick></BaseDatePick> -->
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="date_reg" label="注册日">
          <template slot="header" slot-scope="scope">
            <div class="class-wrap">
              <span>注册日</span>
              <span class="operate">
                <i class="el-icon-sort" @click="sort('date_reg')"></i>
                <!-- <BaseDatePick></BaseDatePick> -->

              </span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column show-overflow-tooltip prop="address" label="群组">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="address" label="项目">
          <template slot="header" slot-scope="scope">
            <div class="class-wrap">
              <span>项目</span>
              <span class="operate">
                <i class="el-icon-sort"></i>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="address" label="流程">
        </el-table-column> -->
      </el-table>
    </div>
    <!-- 图样列表 -->
    <div v-if="selectedStyle === 'img'" class="img-style">
      <div v-for="(item,index) in tableData" :key="index" class="img-item base-hb">
        <div class="img-wrap">
          <img :src="item.imgUrl" alt="">
        </div>
        <div class="content">
          <div class="l">
            <el-checkbox v-model="item.selected"></el-checkbox>
          </div>
          <div class="r omit-1">{{item.name}}</div>
        </div>
        <div class="content">
          <div class="l">
            {{item.category}}
          </div>
          <div class="r"><span class="r-id">{{item.reg_id}}</span><span class="r-status">{{item.statusStr}}</span></div>
        </div>
      </div>
    </div>
    <BasePagination :total="totalNum" :nowPageNum.sync="nowPageNum" :pageSize.sync="pageSize"
      @pageChange="handlePageChange"></BasePagination>
  </div>
</template>
<script>
export default {
  name: 'BaseTable',
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    total: {
      type: [Number, String],
      default: 0
    },
    setSelect: {
      type: Date
    },
    pageInfo: {
      type: Object
    }
  },
  data() {
    return {
      totalNum: 0,
      nowPageNum: 1,
      pageSize: 10,
      selectedStyle: 'list',
      selected: 'all',
      selectedNum: 0,
      checked: true,
      selectedRow: []
    }
  },
  watch: {
    total(newVal) {
      this.totalNum = newVal
    },
    pageInfo: {
      handler: function(val, oldVal) {
        this.nowPageNum = val.page
        this.pageSize = val.size
      },
      deep: true
    },
    selected(newVal) {
      if (newVal === 'all') {
        this.$emit('handleFocus', 'all', [])
      } else {
        this.$emit('handleFocus', 'focus', this.selectedRow)
        this.$refs.searchList.clearSelection()
        this.$refs.searchList.toggleAllSelection()
      }
    },
    setSelect() {
      this.selected = 'all'
    }
  },
  methods: {
    handleSelectStyle(value) {
      this.selectedStyle = value
    },
    handleSelectType(value) {
      this.selected = value
    },
    handlePageChange() {
      this.$emit('pageChange', { page: this.nowPageNum, size: this.pageSize })
    },
    sort(sortKey) {
      this.$emit('sort', sortKey)
    },
    // 记录勾选的行信息
    handleSelectionChange(selectedRow) {
      // 选择的个数
      this.selectedNum = selectedRow.length
      this.selectedRow = selectedRow
    }
  }
}
</script>
<style lang="scss" scoped>
.base-form {
  .top-pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .show-operate {
    padding: 10px 0;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left,
    .right {
      display: flex;
      align-items: center;
    }
    .left {
      .text-wrap {
        margin-right: 8px;
        .text {
          padding-left: 3px;
        }
      }
      .selected-style {
        font-weight: bold;
      }
    }
    .right {
      .common {
        margin-right: 8px;
      }
      .contrast {
        font-size: 12px;
        padding: 3px 5px;
        border: 1px solid #c3c3c3;
        border-radius: 12px;
        cursor: pointer;
        &:hover {
          background: #e8e8e8;
        }
      }
      .select-wrap {
        font-size: 12px;
        padding: 2px 5px;
        background-color: #e9e9e9;
        border-radius: 12px;
        > span {
          display: inline-block;
          padding: 2px 5px;
          &:first-child {
            margin-right: 5px;
          }
        }
        .selected {
          background-color: #fff;
          border-radius: 12px;
        }
      }
    }
  }
  .table-style {
    .pre-img-wrap {
      &:hover {
        cursor: pointer;
      }
      .el-image {
        max-width: 100px;
      }
      img {
        max-width: 100px;
      }
    }
  }
  .img-style {
    font-size: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .img-item {
      margin-right: 10px;
      margin-bottom: 10px;
      width: 170px;
      border: 1px solid #ccc;
      .img-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        width: 160px;
        height: 160px;
        img {
          max-width: 160px;
          max-height: 160px;
        }
      }
      .content {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          padding: 0 3px;
        }
        .l {
          height: 16px;
          line-height: 16px;
          padding: 5px;
          flex-shrink: 0;
          border-top: 1px solid #ccc;
          border-right: 1px solid #ccc;
          width: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .r {
          height: 16px;
          line-height: 16px;
          padding: 5px;
          border-top: 1px solid #ccc;
          flex-grow: 1;
          .r-status {
            color: rgb(50, 135, 200);
          }
        }
      }
    }
  }
  .class-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .operate {
      i {
        padding: 0 3px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
::v-deep .el-table {
  font-size: 14px;
}
::v-deep .el-table__body tr:hover > td {
  background-color: #eef7fe !important;
}
</style>

<style lang="scss">
.pre-max-img {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
  }
}
</style>
