<template>
  <div class="base-search">
    <div class="search">
      <div v-if="showClass" class="dropdown">
        <el-dropdown @command="handleSelect">
          <span class="el-dropdown-link">
            {{selectedInfo.label}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in classList" :key="item.value" :command="item">{{item.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="input">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="btn" :style="`background-color:${btnColor}`">
        {{btnName}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSearch',
  props: {
    showClass: {
      type: Boolean,
      default: true
    },
    classList: {
      type: Array,
      default() {
        return []
      }
    },
    btnName: {
      type: String,
      default: '立即分析'
    },
    btnColor: {
      type: String,
      default: '#3168d9'
    }
  },
  data() {
    return {
      input: '',
      selectedInfo: this.classList[0]
    }
  },
  computed: {
    selectedLabel() {
      return this.selectedInfo.label
    }
  },
  methods: {
    handleSelect(info) {
      this.selectedInfo = info
    }
  }
}
</script>

<style lang="scss" scoped>
.base-search {
  width: 470px;
  height: 40px;
  background-color: #f0f2f6;
  border-radius: 4px;
  overflow: hidden;
  .search {
    display: flex;
    align-items: center;
    .dropdown {
      padding-left: 10px;
    }
    .input {
      flex-grow: 1;
      ::v-deep .el-input__inner {
        border: none;
        background-color: #f0f2f6;
      }
    }
    .btn {
      width: 110px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      letter-spacing: 0px;
      color: #ffffff;
      text-align: center;
      // background-color: #3168d9;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
