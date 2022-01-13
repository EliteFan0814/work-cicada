<template>
  <div class="base-popover">
    <el-popover v-model="visible" placement="bottom" :width="width" trigger="click" @show="handleClick"
      @hide="handleClick">
      <slot name="popContent"></slot>
      <div slot="reference">
        <div v-if="plain">
          <img src="@/assets/imgs/arrow.png" :class="{active:active}">
        </div>
        <div v-else class="linkages">
          <span>{{title}}</span>
          <img src="@/assets/imgs/arrow.png" :class="{active:active}">
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: 'BasePopover',
  props: {
    plain: {
      type: Boolean,
      default: true
    },
    popshowflag: {
      type: Date
    },
    title: {
      type: String,
      default: '关联检索'
    },
    width: {
      type: [String, Number],
      default: '300'
    }
  },
  data() {
    return {
      active: false,
      visible: false
    }
  },
  // 使用时间戳来触发pop框内关闭当前pop
  watch: {
    popshowflag(val) {
      this.visible = false
    }
  },
  methods: {
    handleClick() {
      this.active = !this.active
    }
  }
}
</script>
<style lang="scss" scoped>
.base-popover {
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
  }
  img {
    width: 10px;
    height: 6px;
    margin-left: 5px;
    display: block;
    transition: all 0.5s;
    &:hover {
      cursor: pointer;
    }
  }
  .active {
    transform: rotate(-180deg);
  }
}
</style>
