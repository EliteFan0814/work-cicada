<template>
  <div class="base-form">
    <!-- 顶部分页和下载 -->
    <div class="top-pagination">
      <BasePagination :total="100" :nowPageNum.sync="nowPageNum" :pageSize.sync="pageSize"></BasePagination>
      <BaseDownload></BaseDownload>
    </div>
    <!-- 操作按钮 -->
    <BaseOperate :selectedStyle.sync="selectedStyle" :selected.sync="selected" :showDrop="true" :showSearch="true">
    </BaseOperate>
    <!-- table 列表 -->
    <div v-if="selectedStyle === 'list'" class="table-style">
      <el-table :data="tableData" border size="small" :header-cell-style="{background:'#fafafa',color: '#666666'}"
        row-class-name="row-style">
        <el-table-column show-overflow-tooltip type="selection">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="date" label="分析类别">
        </el-table-column>
        <!-- <el-table-column show-overflow-tooltip label="图样">
          <template slot-scope="scope">
            <div class="pre-img-wrap">
              <el-popover placement="right" trigger="hover">
                <div class="pre-max-img">
                  <img src="@/assets/imgs/doc.png">
                </div>
                <img slot="reference" src="@/assets/imgs/doc.png" alt="">
              </el-popover>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column show-overflow-tooltip prop="address" label="名称">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="address" label="操作">
          <template slot-scope="scope">
            <div class="operate-wrap">
              <span class="operate">
                <i class="el-icon-download"></i>
                <span>下载报告</span>
              </span>
              <span class="operate">
                <i class="el-icon-delete"></i>
                <span>删除</span>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 图样列表 -->
    <div v-if="selectedStyle === 'img'" class="img-style">
      <div v-for="(item,index) in tableData" :key="index" class="img-item base-hb">
        <div class="img-wrap">
          <img src="https://dummyimage.com/120x110/000/fff" alt="">
        </div>
        <div class="content">
          <div class="l">
            <el-checkbox v-model="item.selected"></el-checkbox>
          </div>
          <div class="r omit-1">{{item.name}}</div>
        </div>
        <div class="content">
          <div class="l">
            {{item.grade}}
          </div>
          <div class="r"><span class="r-id">{{item.id}}</span><span class="r-status">{{item.statusStr}}</span></div>
        </div>
      </div>
    </div>
    <BasePagination :total="100" :nowPageNum.sync="nowPageNum" :pageSize.sync="pageSize"></BasePagination>
  </div>
</template>
<script>
export default {
  name: 'BaseTableAnaly',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          selected: true,
          id: '15284574',
          grade: '42',
          statusStr: '已注册',
          address:
            '上海市普陀上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          selected: true,
          id: '15284574',
          grade: '42',
          statusStr: '已注册',
          address:
            '上海市普陀上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          selected: true,
          id: '15284574',
          grade: '42',
          statusStr: '已注册',
          address:
            '上海市普陀上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          selected: true,
          id: '15284574',
          grade: '42',
          statusStr: '已注册',
          address:
            '上海市普陀上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          selected: true,
          id: '15284574',
          grade: '42',
          statusStr: '已注册',
          address:
            '上海市普陀上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          selected: true,
          id: '15284574',
          grade: '42',
          statusStr: '已注册',
          address:
            '上海市普陀上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          selected: true,
          id: '15284574',
          grade: '42',
          statusStr: '已注册',
          address:
            '上海市普陀上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          selected: true,
          id: '15284574',
          grade: '42',
          statusStr: '已注册',
          address:
            '上海市普陀上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄区金沙江路 1518 弄'
        }
      ],
      nowPageNum: 2,
      pageSize: 30,
      selectedStyle: 'list',
      selected: 'all',
      checked: true
    }
  },
  methods: {
    handleSelectStyle(value) {
      this.selectedStyle = value
    },
    handleSelectType(value) {
      this.selected = value
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
  .operate-wrap {
    display: flex;
    align-items: center;
    font-size: 14px;
    .operate {
      &:hover {
        cursor: pointer;
      }
      padding: 0 5px;
      i {
        padding: 0 3px;
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
