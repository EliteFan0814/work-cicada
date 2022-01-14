<template>
  <div class="base-form">
    <BasePagination :total="100" :nowPageNum.sync="nowPageNum" :pageSize.sync="pageSize"></BasePagination>
    <div class="show-operate">
      <div class="left">
        <div class="text-wrap pointer" :class="{'selected-style':selectedStyle==='list'}"
          @click="handleSelectStyle('list')"><i class="el-icon-s-fold text"></i><span class="text">列表</span></div>
        <div class="text-wrap pointer" :class="{'selected-style':selectedStyle==='img'}"
          @click="handleSelectStyle('img')"><i class="el-icon-picture-outline text"></i><span class="text">图样</span>
        </div>
      </div>
      <div class="right">
        <div class="common">已勾选0条</div>
        <div class="common contrast"><span>档案对比</span></div>
        <div class="common select-wrap">
          <span class="pointer" :class="{selected:selected==='all'}" @click="handleSelectType('all')">全部</span>
          <span class="pointer" :class="{selected:selected==='focus'}" @click="handleSelectType('focus')">聚焦</span>
        </div>
      </div>
    </div>
    <el-table :data="tableData" border size="small " :header-cell-style="{background:'#fafafa',color: '#666666'}"
      row-class-name="row-style" style="width: 100%">
      <el-table-column show-overflow-tooltip type="selection" width="55">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="date" label="商标名称" width="180">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="图样" width="180">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="address" label="类别">
        <template slot="header" slot-scope="scope">
          <div class="class-wrap">
            <span>类别</span>
            <span class="operate">
              <i class="el-icon-sort"></i>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="address" label="申请号">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="address" label="申请人">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="address" label="申请日">
        <template slot="header" slot-scope="scope">
          <div class="class-wrap">
            <span>申请日</span>
            <span class="operate">
              <i class="el-icon-sort"></i>
              <BaseDatePick></BaseDatePick>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="address" label="注册日">
        <template slot="header" slot-scope="scope">
          <div class="class-wrap">
            <span>注册日</span>
            <span class="operate">
              <i class="el-icon-sort"></i>
              <i class="el-icon-date"></i>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="address" label="群组">
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
      </el-table-column>
    </el-table>
    <BaseDatePick></BaseDatePick>
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
          address:
            '上海市普陀上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄区金沙江路 1518 弄'
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
      ],
      nowPageNum: 2,
      pageSize: 30,
      selectedStyle: 'list',
      selected: 'all'
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
::v-deep .el-table__body tr:hover > td {
  background-color: #eef7fe !important;
}
</style>
