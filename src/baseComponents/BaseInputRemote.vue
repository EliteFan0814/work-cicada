<template>
  <div class="base-input" :style="`width:${width}`">
    <!-- 已选择列表 -->
    <div class="selected-list flex">
      <div v-for="(item,index) in selectList" :key="item" class="select-item">
        <span>{{item}}</span>
        <i class="el-icon-close clear" @click="handleDelete(index)"></i>
      </div>
    </div>
    <input type="text" v-model="value" :placeholder="placeholder" @input="handleShowSuggest">
    <i slot="reference" :class="['iconfont',`icon-${icon}`]" @click="handleEmit"></i>
    <!-- 远程搜索结果列表 -->
    <div v-if="showSuggest" class="remote-res">
      <template v-if="suggestList.length">
        <div v-for="(item) in suggestList" :key="item" class="res-item" @click="handleSelect(item)">
          {{item}}</div>
      </template>
      <template v-else>
        <div class="empty">
          暂无数据
        </div>
      </template>
    </div>
    <!-- <el-popover placement="bottom-end" width="200" trigger="click">
      <div class="pop-wrap">
        <div @click="openDialog('first')">初审公告监测</div>
        <div @click="openDialog('second')">具体商标监控</div>
        <div @click="openDialog('third')">撤三商标监控</div>
        <div @click="openDialog('fourth')">持续商标监控</div>
      </div>
    </el-popover> -->
  </div>
</template>
<script>
import watch from '@/api/watch'
export default {
  name: 'BaseInputRemote',
  props: {
    multi: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: '请输入搜索关键字'
    },
    searchClass: {
      type: String,
      required: true,
      default: 'owner'
    },
    width: {
      type: [String, Number],
      required: false,
      default: '400px'
    },
    outSelectList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      value: null,
      showSuggest: false,
      selectList: this.outSelectList,
      suggestList: [],
      searchTimer: null
    }
  },
  watch: {
    outSelectList: {
      handler(newVal) {
        this.selectList = newVal
      },
      deep: true
    },
    value(newVal) {
      if (!newVal) {
        this.showSuggest = false
      }
    }
  },
  methods: {
    handleEmit() {
      if (this.value) {
        this.$emit('search', this.value)
      }
    },
    handleDelete(index) {
      this.selectList.splice(index, 1)
      this.$emit('selectListChange', this.selectList)
    },
    // 处理结果的展示
    handleShowSuggest() {
      if (this.value) {
        this.searchSuggest()
      }
    },
    // 搜索建议查询防抖
    searchSuggest() {
      clearInterval(this.searchTimer)
      if (this.value.length > 1) {
        this.searchTimer = setTimeout(() => {
          watch
            .watchListSuggest(this.searchClass, this.value)
            .then((res) => {
              this.showSuggest = true
              if (res) {
                this.suggestList = res
              } else {
                this.suggestList = []
              }
            })
            .catch((err) => {
              this.showSuggest = false
              console.log(err)
            })
        }, 500)
      }
    },
    // 处理选择
    handleSelect(item) {
      // 多选
      if (this.multi) {
        this.selectList.push(item)
      } else {
        // 单选
        this.selectList = [item]
      }
      this.value = ''
      this.showSuggest = false
      this.$emit('selectListChange', this.selectList)
    }
  }
}
</script>
<style lang="scss" scoped>
.base-input {
  position: relative;
  background-color: #fff;
  box-sizing: border-box;
  padding: 12px 20px;
  border-radius: 22px;
  border: solid 1px #cccccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    border: solid 1px #3168d9;
  }
  .selected-list {
    max-width: 70%;
    flex-wrap: wrap;
    .select-item {
      margin: 3px;
      margin-left: 0;
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
  input {
    flex-grow: 1;
    box-shadow: none; /*去除阴影*/
    outline: none; /*聚焦input的蓝色边框*/
    resize: none; /*textarea 禁止拖拽*/
    border: none; /*去除边框*/
    -webkit-appearance: none; /*常用于IOS下移除原生样式*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /*点击高亮的颜色*/
    // border: 1px solid red;
    min-width: 30%;
    &::placeholder {
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #bfbfbf;
    }
  }
  .iconfont {
    font-size: 20px;
    cursor: pointer;
  }
  .remote-res {
    box-sizing: border-box;
    position: absolute;
    bottom: -5px;
    transform: translateY(100%);
    left: 0;
    width: 100%;
    min-height: 100px;
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    z-index: 2;
    box-shadow: 0px 0px 9px 0px rgba(50, 50, 50, 0.57);
    padding: 10px;
    font-size: 14px;
    .res-item {
      padding: 5px 0;
      cursor: pointer;
      &:hover {
        background: rgba(140, 197, 255, 0.1);
      }
    }
    .empty {
      text-align: center;
      padding-top: 10px;
    }
  }
}
</style>
