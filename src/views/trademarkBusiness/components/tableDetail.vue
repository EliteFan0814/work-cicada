<template>
  <div class="table-detail-wrap">
    <el-table
      ref="detail-table"
      border
      :data="tableData"
      style="width: 100%"
      row-key="reg_id"
      :expand-row-keys="expands"
      :highlight-current-row="true"
      :header-cell-style="headerCellStyle"
    >
      <!-- 隐藏展开列，自己实现点击展开 -->
      <el-table-column width="1" type="expand">
        <template slot-scope="scope">
          <div class="bus-expand">
            <!-- 流程类展示 genre值为1-5 -->
            <div v-if="genre > 0 && genre < 6" class="expand-wrap">
              <flowsTable :tableData="scope.row.flows"></flowsTable>
            </div>
            <!-- 初审近似类展示 genre值为6 -->
            <div v-else-if="genre === 6" class="expand-wrap">
              <similarsTable :tableData="scope.row.similars"></similarsTable>
            </div>
            <!-- 变更展示 genre值为8 -->
            <div v-else-if="genre === 8" class="expand-wrap">
              <el-form
                size="small"
                style="background-color: #fff; padding: 10px"
              >
                <el-form-item label="持有人名称:">
                  <span>{{ scope.row.owner.name }}</span>
                </el-form-item>
                <el-form-item label="持有人地址:">
                  <span>{{ scope.row.owner.addr }}</span>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="50px"
        label="序号"
        type="index"
        align="center"
      ></el-table-column>
      <el-table-column label="商机" prop="name" align="center">
        <template slot-scope="scope">
          <div class="bus-wrap">
            <div>{{ scope.row.description }}</div>
            <!-- genre为7 没有详情按钮 -->
            <div
              v-if="genre !== 7"
              class="bus-detail"
              @click="expandRow(scope.row)"
            >
              <span>详情</span>
              <i
                class="iconfont icon-arrow-down"
                :class="{ 'arrow-up': checkRowExpand(scope.row.reg_id) }"
              ></i>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="注册号"
        prop="reg_id"
        align="center"
      ></el-table-column>
      <el-table-column
        label="类别"
        prop="category"
        align="center"
        width="50px"
      ></el-table-column>
      <el-table-column
        label="商标状态"
        prop="desc"
        align="center"
        width="100px"
      >
        <template slot-scope="scope">
          <div>
            <el-tag effect="dark" type="warning" size="small">
              {{ scope.row.status }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商标名称" prop="desc" align="center">
        <template slot-scope="scope">
          <div>
            <div>{{ scope.row.name }}</div>
            <div>dfdfdfd</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="desc" align="center">
        <template slot-scope="scope">
          <div class="table-time">
            <div class="table-time-item">
              <span>申请日期：</span>
              <span>{{ scope.row.date_app | $formatDate }}</span>
            </div>
            <div class="table-time-item">
              <span>初审日期：</span>
              <span>{{ scope.row.date_pre | $formatDate }}</span>
            </div>
            <div class="table-time-item">
              <span>注册日期：</span>
              <span>{{ scope.row.date_reg | $formatDate }}</span>
            </div>
            <div class="table-time-item">
              <span>有 效 期：</span>
              <span>{{ scope.row.date_end | $formatDate }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="代理机构"
        prop="agent_name"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import similarsTable from './similarsTable.vue'
import flowsTable from './flowsTable.vue'
export default {
  components: { similarsTable, flowsTable },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    genre: {
      type: Number,
      default: undefined
    }
  },
  watch: {
    // 当数据更改时，重置已展开列表的数据
    tableData() {
      this.expands = []
    }
  },
  data() {
    return {
      // tableData: [
      //   {
      //     id: '12987122',
      //     name: '好滋好味鸡蛋仔',
      //     category: '江浙小吃、小吃零食',
      //     desc: '荷兰优质淡奶，奶香浓而不腻',
      //     address: '上海市普陀区真北路',
      //     shop: '王小虎夫妻店',
      //     shopId: '10333'
      //   },
      //   {
      //     id: '12987123',
      //     name: '好滋好味鸡蛋仔',
      //     category: '江浙小吃、小吃零食',
      //     desc: '荷兰优质淡奶，奶香浓而不腻',
      //     address: '上海市普陀区真北路',
      //     shop: '王小虎夫妻店',
      //     shopId: '10333'
      //   },
      //   {
      //     id: '12987125',
      //     name: '好滋好味鸡蛋仔',
      //     category: '江浙小吃、小吃零食',
      //     desc: '荷兰优质淡奶，奶香浓而不腻',
      //     address: '上海市普陀区真北路',
      //     shop: '王小虎夫妻店',
      //     shopId: '10333'
      //   },
      //   {
      //     id: '12987126',
      //     name: '好滋好味鸡蛋仔',
      //     category: '江浙小吃、小吃零食',
      //     desc: '荷兰优质淡奶，奶香浓而不腻',
      //     address: '上海市普陀区真北路',
      //     shop: '王小虎夫妻店',
      //     shopId: '10333'
      //   }
      // ],
      expands: [],
      headerCellStyle: {
        backgroundColor: '#f3f9fc',
        textAlign: 'center',
        color: '#2b2d32'
      }
    }
  },
  methods: {
    expandRow(row) {
      // this.$refs['detail-table'].toggleRowExpansion(row)
      if (this.expands.indexOf(row.reg_id) < 0) {
        this.expands = []
        this.expands.push(row.reg_id)
      } else {
        this.expands = []
      }
    },
    // 判定当前行是否展开
    checkRowExpand(id) {
      if (this.expands.includes(id)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.table-detail-wrap {
  ::v-deep .el-table__expand-icon {
    display: none;
    // visibility: hidden;
  }
  ::v-deep .el-table__expanded-cell {
    padding: 0px;
  }
  .bus-expand {
    padding: 15px 20px;
    background-color: #fafafa;
  }
  .bus-wrap {
    .bus-detail {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      line-height: 1;
      color: #368cf0;
      .icon-arrow-down {
        transition: all 0.3s;
      }
      .arrow-up {
        transform: rotate(-180deg);
      }
    }
  }
  .table-time {
    .table-time-item {
      margin: 0 auto;
      width: 160px;
      text-align: right;
    }
  }
}
</style>
