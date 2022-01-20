<template>
  <div class="base-search-list">
    <div class="filter-key-wrap">
      <div class="filter-list" ref="filterList">
        <div class="item-wrap" ref="itemWrap">
          <div class="item" v-for="(item,index) in filterKeyList" :key="item.value">
            <div>
              <span>{{item.label}}</span>
              <i class="el-icon-close clear" @click="handleDelete(index)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BasePopover v-if="showMore" :width="400" placement="bottom-end">
      <div slot="popContent" class="filter-pop-wrap">
        <ul>
          <li v-for="item in filterKeyList" :key="item.value">
            <div>
              <span>{{item.label}}</span>
              <i class="el-icon-close clear" @click="handleDelete(index)"></i>
            </div>
          </li>
        </ul>
      </div>
    </BasePopover>
  </div>
</template>
<script>
export default {
  name: 'BaseDialogCondition',
  data() {
    return {
      active: false,
      filterKeyList: [
        { label: '百岁鱼', value: 1 },
        { label: '二分', value: 2 },
        { label: '打发打发', value: 3 },
        { label: '百岁鱼', value: 4 },
        { label: '百百岁', value: 5 },
        { label: '百岁鱼', value: 6 },
        { label: '打发打发', value: 7 },
        { label: '百岁鱼', value: 8 },
        { label: '百百岁', value: 9 },
        { label: '打发打发', value: 10 },
        { label: '百岁鱼', value: 11 },
        { label: '百百岁', value: 12 }
      ],
      showMore: false,
      popshowflag: new Date()
    }
  },
  watch: {
    filterKeyList: {
      handler: function() {
        const filterListLength = this.$refs.filterList.scrollWidth
        const itemWrapLength = this.$refs.itemWrap.scrollWidth
        if (filterListLength < itemWrapLength) {
          this.showMore = true
        } else {
          this.showMore = false
        }
      },
      deep: true
    }
  },
  methods: {
    // 删除搜索条件关键词
    handleDelete(index) {
      this.filterKeyList.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.base-search-list {
  display: flex;
  align-items: center;
  .filter-key-wrap {
    overflow: hidden;
    .filter-list {
      overflow: hidden;
      .item-wrap {
        display: flex;
        overflow: hidden;
        .item {
          flex-shrink: 0;
          padding: 0 5px;
          > div {
            display: flex;
            color: #fff;
            background-color: #3168d9;
            padding: 3px 0 3px 5px;
            border-radius: 15px;
            font-size: 14px;
            &:hover {
              background-color: #4f84ec;
            }
            .clear {
              cursor: pointer;
              padding: 0 5px;
            }
            span {
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.filter-pop-wrap {
  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .key-item {
      padding: 0 10px;
      color: #3168d9;
    }
    li {
      > div {
        display: flex;
        align-items: center;
        color: #fff;
        background-color: #3168d9;
        margin: 5px;
        padding: 0px 0 0px 5px;
        border-radius: 15px;
        font-size: 14px;
        &:hover {
          background-color: #4f84ec;
        }
        .clear {
          cursor: pointer;
          padding: 0 5px;
        }
        span {
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>
