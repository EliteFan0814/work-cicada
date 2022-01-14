<template>
  <div class="base-pagination">
    <div class="total-info">
      <span class="total">共{{total}}条</span>
      <span>第{{nowPageNum}} / {{totalPage}}页</span>
    </div>
    <div class="page-num">
      <el-pagination background small layout="prev, pager, next" :page-size="pageSize" :current-page="nowPageNum"
        :total="total" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <div class="page-size">
      <span>单页</span>
      <BasePopover class="poppage" :plain="false" :title="pageSize" :width="50" :popshowflag="popshowflag">
        <div slot="popContent" class="page-size-list">
          <ul>
            <li v-for="item in pageSizeList" :key="item" :class="{active:pageSize === item}" @click="handleClick(item)">
              {{item}}</li>
          </ul>
        </div>
      </BasePopover>
      <span>行</span>
    </div>
  </div>
</template>
<script>
// 父组件引用时使用 v-bind:nowPageNum.sync="nowPageNum" 来双向绑定 nowPageNum
export default {
  name: 'BasePagination',
  props: {
    // 总条数
    total: {
      type: Number,
      require: true
    },
    // 设置单页多少条
    pageSize: {
      type: Number,
      default: 10
    },
    // 设置单页多少条选择列表
    pageSizeList: {
      type: Array,
      default() {
        return [10, 20, 30, 50, 100]
      }
    },
    nowPageNum: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      popshowflag: new Date()
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    // 设置单页数量
    handleClick(value) {
      this.$emit('update:pageSize', value)
      this.$emit('update:nowPageNum', 1)
      this.popshowflag = new Date()
    },
    // 触发页数改变
    handleCurrentChange(value) {
      this.$emit('update:nowPageNum', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.base-pagination {
  padding: 5px;
  display: flex;
  align-items: center;
  color: #666666;
  .total-info {
    .total {
      padding-right: 15px;
    }
  }
  .page-num {
    padding: 0 15px;
  }
  .page-size {
    display: flex;
    align-items: center;
    .poppage {
      padding: 0 5px;
    }
  }
  ::v-deep .el-pager li {
    border-radius: 50%;
    &:not(.disabled).active {
      background-color: #58c4ff;
    }
  }
}

.page-size-list {
  ul {
    li {
      font-size: 14px;
      padding: 3px;
      text-align: center;
      cursor: pointer;
    }
    .active {
      color: #58c4ff;
      font-weight: bold;
    }
  }
}
</style>
