<template>
  <div class="base-operate">
    <div class="show-operate">
      <div class="left">
        <div v-if="showDrop" class="drop-wrap">
          <BasePopover :plain="false" title="全部报告" width="100">
            <div slot="popContent"></div>
          </BasePopover>
        </div>
        <!-- <div class="text-wrap">
          <el-checkbox v-model="checked"></el-checkbox>
          <span class="sellect-all">全选</span>
        </div> -->
        <div class="text-wrap pointer" :class="{'selected-style':selectedStyle==='list'}"
          @click="handleSelectStyle('list')"><i class="el-icon-s-fold text"></i><span class="text">列表</span></div>
        <div class="text-wrap pointer" :class="{'selected-style':selectedStyle==='img'}"
          @click="handleSelectStyle('img')"><i class="el-icon-picture-outline text"></i><span class="text">图样</span>
        </div>
      </div>
      <div v-if="!showSearch" class="right">
        <div class="common">已勾选{{selectedNum}}条</div>
        <!-- <div class="common contrast"><span>档案对比</span></div> -->
        <div class="common select-wrap">
          <span class="pointer" :class="{selected:selected==='all'}" @click="handleSelectType('all')">全部</span>
          <span class="pointer" :class="{selected:selected==='focus'}" @click="handleSelectType('focus')">聚焦</span>
        </div>
      </div>
      <div v-if="showSearch" class="right">
        <BaseInput width="200px" placeholder="客户名称/商标名称"></BaseInput>
      </div>
    </div>
  </div>
</template>
<script>
// import BasePopover from "./BasePopover.vue"

export default {
  name: 'BaseOperate',
  props: {
    showDrop: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    selectedStyle: {
      default: 'list'
    },
    selected: {
      default: 'all'
    },
    selectedNum: {
      default: 0
    }
  },
  data() {
    return { checked: undefined }
  },
  methods: {
    // 切换列表或图样
    handleSelectStyle(value) {
      this.$emit('update:selectedStyle', value)
    },
    handleSelectType(value) {
      this.$emit('update:selected', value)
    }
  }
}
</script>
<style lang="scss" scoped>
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
    .drop-wrap {
      margin-right: 10px;
      ::v-deep .base-popover {
        .linkages {
          border-radius: 4px;
        }
      }
    }
    .text-wrap {
      .sellect-all {
        padding-left: 5px;
      }
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
    ::v-deep .base-input {
      padding: 3px 5px;
    }
  }
}
</style>
