<template>
  <div class="base-search-list">
    <div class="title common">搜索条件：</div>
    <div class="common">
      <el-popover placement="bottom" width="300" trigger="click" popper-class="search-list-pop" @show="handleClick"
        @hide="handleClick">
        <div class="pop-wrap">
          <ul class="pop">
            <li v-for="item in popData" :key="item.value" :class="{'pop-item':true,'selected-item':item.selected}"
              @click="handlePopSelect(item)">
              {{item.label}}</li>
          </ul>
          <div class="operate">
            <el-button size="mini" round @click="handleCancel">取消</el-button>
            <el-button size="mini" round @click="handleSelectAll">全选</el-button>
            <el-button size="mini" round type="primary" @click="handleConfirm">确定</el-button>
          </div>
        </div>
        <div slot="reference" class="linkages common">
          <span>关联检索</span>
          <img src="@/assets/imgs/arrow.png" :class="{active:active}">
        </div>
      </el-popover>
    </div>
    <div class="key-list common">
      <span class="key-item">{{searchKey}}</span>
    </div>
    <div class="filter-key-wrap">
      <el-button size="mini" round @click="handleCancel" class="reset">重置</el-button>
      <div class="filter-list" ref="filterList">
        <div class="item-wrap" ref="itemWrap">
          <div class="item" v-for="item in 3" :key="item">
            <div>
              <span>百岁鱼</span>
              <i class="el-icon-close clear"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showMore" class="more">更多</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: false,
      popData: [
        { label: '22', value: '22', selected: false },
        { label: '3', value: '3', selected: false },
        { label: '6', value: '6', selected: false },
        { label: '3', value: '7', selected: false },
        { label: '3', value: '8', selected: false },
        { label: '3', value: '9', selected: false },
        { label: '3', value: '10', selected: false },
        { label: '3', value: '11', selected: false },
        { label: '4', value: '44', selected: false }
      ],
      searchKey: '百岁鱼',
      showMore: false
    }
  },
  methods: {
    handleClick() {
      this.active = !this.active
    },
    handlePopSelect(item) {
      item.selected = !item.selected
    },
    handleCancel() {
      const filterListLength = this.$refs.filterList.scrollWidth
      const itemWrapLength = this.$refs.itemWrap.scrollWidth
      console.log(filterListLength, itemWrapLength)
      if (filterListLength < itemWrapLength) {
        this.showMore = true
      } else {
        this.showMore = false
      }

      this.popData.map((item) => {
        item.selected = false
      })
    },
    handleSelectAll() {
      this.popData.map((item) => {
        item.selected = true
      })
    },
    handleConfirm() {
      console.log(this.$refs.filterList.width)
    }
  }
}
</script>
<style lang="scss" scoped>
.base-search-list {
  padding: 20px;
  // width: 100%;
  border: 1px solid red;
  display: flex;
  align-items: center;
  .common {
    flex-shrink: 0;
  }
  .linkages {
    display: inline-flex;
    align-items: center;
    color: #999999;
    border-radius: 12px;
    border: solid 1px #cccccc;
    padding: 4px 10px;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 9px;
      height: 5px;
      margin-left: 5px;
      display: block;
      transition: all 0.5s;
    }
    .active {
      transform: rotate(180deg);
    }
  }
  .key-list {
    display: flex;
    align-items: center;
    padding: 0 10px;
    .key-item {
      color: #3168d9;
    }
  }
  .filter-key-wrap {
    border: 1px solid red;
    overflow: hidden;
    flex-grow: 1;
    display: flex;
    align-items: center;
    .reset {
      margin-right: 10px;
    }
    .filter-list {
      display: flex;
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
  .more {
    padding-left: 5px;
    flex-shrink: 0;
  }
}
</style>
<style lang="scss">
.search-list-pop {
  .pop-wrap {
    ul {
      display: flex;
      flex-wrap: wrap;
      .pop-item {
        box-sizing: border-box;
        padding: 5px;
        width: 60px;
        text-align: center;
        color: #000;
        &:hover {
          cursor: pointer;
          color: #3168d9;
          font-weight: bold;
        }
      }
      .selected-item {
        color: #3168d9;
        font-weight: bold;
      }
    }
    .operate {
      text-align: right;
      padding: 10px 0 0;
    }
  }
}
</style>
