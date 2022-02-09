<template>
  <div class="base-search-list">
    <div class="title common">搜索条件：</div>
    <div class="common">
      <!-- 关联检索 -->
      <!-- <BasePopover :plain="false" width="300" :popshowflag="popshowflag">
        <div slot="popContent" class="link-pop-wrap">
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
      </BasePopover> -->
    </div>
    <div class="key-list common">
      <span class="key-item">{{searchKey}}</span>
    </div>
    <div class="filter-key-wrap">
      <el-button v-if="filterKeyList.length" size="mini" round @click="handleReset" class="reset">重置</el-button>
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
    <BasePopover v-if="!showMore" :width="800">
      <div slot="popContent" class="filter-pop-wrap">
        <ul>
          <li class="key-item">{{searchKey}}</li>
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
  name: 'searchKeyList',
  props: {
    searchKey: {
      type: String
    },
    categoryList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      active: false,
      popData: [],
      filterKeyList: [],
      showMore: false,
      popshowflag: new Date()
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
      this.popshowflag = new Date()
    },
    // 重置搜索关键词
    handleReset() {
      this.filterKeyList.splice(0)
    },
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
}
</style>
<style lang="scss">
.link-pop-wrap {
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
