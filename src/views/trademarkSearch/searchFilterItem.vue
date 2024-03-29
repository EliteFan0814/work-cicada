<template>
  <div class="base-filter-item">
    <span class="title">{{ title }}：</span>
    <div class="key-list-wrap" ref="filterList">
      <div class="key-list" ref="itemWrap">
        <span
          v-for="item in dataList"
          :key="item.value"
          @click="handleClick(item)"
          :class="{
            'key-item': true,
            'base-hover': true,
            'base-active': item.selected
          }"
          >{{ item.label }}</span
        >
      </div>
    </div>
    <BasePopover v-if="showMore" width="400" :popshowflag="popshowflag">
      <!-- 简单的展示所有数据 -->
      <div v-if="show" slot="popContent">
        <div class="more-wrap">
          <span
            v-for="item in dataList"
            :key="item.value"
            @click="handleClick(item)"
            :class="{
              'key-item': true,
              'base-hover': true,
              'base-active': item.selected
            }"
            >{{ item.label }}</span
          >
        </div>
      </div>
      <!-- 带有搜索的复杂操作 -->
      <div v-else slot="popContent">
        <div v-loading="filterLoading" class="more-operate-wrap">
          <BaseInput
            width="100%"
            class="search"
            icon="search"
            @search="handleSearch"
          ></BaseInput>
          <div v-if="innerDataList.length" class="checkbox-wrap">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              class="checkall"
              >全选
            </el-checkbox>
            <el-checkbox-group
              v-model="checkList"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="item in innerDataList"
                :key="item.value"
                :label="item.value"
                >{{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-else style="text-align: center">
            <span>暂无数据</span>
          </div>
          <div class="confirm-wrap">
            <el-button size="mini" round @click="handleConfirm(false)"
              >取消</el-button
            >
            <el-button
              size="mini"
              round
              @click="handleConfirm(true)"
              type="primary"
              >确定</el-button
            >
          </div>
        </div>
      </div>
    </BasePopover>
  </div>
</template>
<script>
import apiSearch from '@/api/search'

export default {
  name: 'searchFilterItem',
  props: {
    filterClass: {
      type: String,
      require: false
    },
    title: {
      type: String,
      require: true
    },
    dataList: {
      type: Array,
      default() {
        return []
      }
    },
    outFilter: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否是简单的展示所有数据
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showMore: false,
      checkList: [],
      checkAll: false,
      isIndeterminate: false,
      innerDataList: [],
      popshowflag: new Date(),
      filterLoading: false
    }
  },
  watch: {
    dataList(newVal) {
      this.innerDataList = newVal
    }
  },
  mounted() {
    this.loopJudgeShowMore()
  },
  methods: {
    // 循环判断是否显示更多按钮
    loopJudgeShowMore() {
      setInterval(() => {
        if (this.$refs.filterList) {
          const filterListLength = this.$refs.filterList.scrollWidth
          const itemWrapLength = this.$refs.itemWrap.scrollWidth
          if (filterListLength < itemWrapLength) {
            this.showMore = true
          } else {
            this.showMore = false
          }
        }
      }, 500)
    },
    handleClick(item) {
      item.selected = !item.selected
      this.$emit('changeFilter')
    },
    // 全选或全不选
    handleCheckAllChange(val) {
      const tempList = this.innerDataList.map((item) => {
        return item.value
      })
      this.checkList = val ? tempList : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.innerDataList.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.innerDataList.length
    },
    handleConfirm(flag) {
      if (flag) {
        this.$emit('moreFilter', this.filterClass, this.checkList)
      }
      this.checkList = []
      this.checkAll = false
      this.isIndeterminate = false
      this.popshowflag = new Date()
    },
    // 内部过滤搜索
    handleSearch(value) {
      if (value.length < 2) {
        return this.$message({
          message: '请输入至少两个关键字',
          type: 'warn'
        })
      }
      this.filterLoading = true
      if (this.filterClass === 'owners') {
        apiSearch
          .getSecondFilter(this.outFilter, value, 1)
          .then((res) => {
            this.filterLoading = false
            res = res || []
            this.innerDataList = res.map((item) => {
              return { label: item, selected: false, value: item }
            })
          })
          .catch(() => {
            this.filterLoading = false
          })
      } else if (this.filterClass === 'agents') {
        // apiSearch
        //   .agentsSuggest(value)
        //   .then((res) => {
        //     this.filterLoading = false
        //     res = res || []
        //     this.innerDataList = res.map((item) => {
        //       return { label: item, selected: false, value: item }
        //     })
        //   })
        //   .catch(() => {
        //     this.filterLoading = false
        //   })

        apiSearch
          .getSecondFilter(this.outFilter, value, 2)
          .then((res) => {
            this.filterLoading = false
            res = res || []
            this.innerDataList = res.map((item) => {
              return { label: item, selected: false, value: item }
            })
          })
          .catch(() => {
            this.filterLoading = false
          })
      } else if (this.filterClass === 'addrs') {
        apiSearch
          .getSecondFilter(this.outFilter, value, 4)
          .then((res) => {
            this.filterLoading = false
            res = res || []
            this.innerDataList = res.map((item) => {
              return { label: item, selected: false, value: item }
            })
          })
          .catch(() => {
            this.filterLoading = false
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.base-filter-item {
  padding: 8px 0;
  display: flex;
  align-items: center;
  .title {
    flex-shrink: 0;
    font-size: 14px;
    letter-spacing: 0px;
    // color: #bfbfbf;
    color: rgba(0, 0, 0, 0.85);
  }
  .key-list-wrap {
    width: 100px; //解决纯英文字符过长bug fpcbug
    flex-grow: 1;
    .key-list {
      overflow: hidden;
      color: rgba(0, 0, 0, 0.65);
      display: flex;
      .key-item {
        min-width: 33px;
        flex-shrink: 0;
        padding-right: 10px;
        cursor: pointer;
      }
    }
  }
}
.more-wrap {
  color: rgba(0, 0, 0, 0.65);
  display: flex;
  flex-wrap: wrap;
  max-height: 300px;
  overflow-y: scroll;
  .key-item {
    min-width: 33px;
    padding-right: 15px;
    cursor: pointer;
    &:hover {
      color: #3168d9;
      font-weight: bold;
    }
  }
  .base-active {
    color: #3168d9;
    font-weight: bold;
  }
}
.more-operate-wrap {
  .search {
    padding: 5px 20px;
    margin-bottom: 10px;
  }
  .checkbox-wrap {
    max-height: 300px;
    overflow-y: auto;
    .checkall {
      // margin-bottom: 10px;
      font-weight: bold;
    }
    .el-checkbox-group {
      display: flex;
      flex-direction: column;
      .el-checkbox {
        padding: 2px 0;
      }
    }
  }
  .confirm-wrap {
    padding: 10px 0;
    text-align: right;
  }
}
</style>
