<template>
  <!--hover显式的信息提示弹窗-->
  <div class="fixed-slot-hover" ref="slotBox" @mouseenter="showFn()">
    <slot name="show"></slot>
    <div class="slot-box" ref="fixedBox" :style="{left: left, top: top, bottom: bottom, right: right}">
      <slot name="none"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: 'auto',
      top: 'auto',
      bottom: 'auto',
      right: 'auto'
    }
  },
  methods: {
    showFn() {
      const box = this.$refs.slotBox
      const rect = box.getBoundingClientRect()
      const Hh = document.documentElement.clientHeight
      const Ww = document.documentElement.clientWidth
      const boxH = this.$refs.fixedBox.offsetHeight - 100
      const boxW = this.$refs.fixedBox.offsetWidth - 100
      if (rect.left + boxW < Ww) {
        this.left = rect.left + boxW + 'px'
        this.right = 'auto'
      } else {
        this.right = boxW + 'px'
        this.left = 'auto'
      }
      if (rect.top + boxH < Ww) {
        this.top = rect.top + 'px'
        this.bottom = 'auto'
      } else {
        this.bottom = rect.bottom + 'px'
        this.top = 'auto'
      }
    }
  }
}
</script>

<style lang="scss" scoped >
.fixed-slot-hover {
  .slot-box {
    position: fixed;
    display: none;
    z-index: 10;
  }
  &:hover {
    .slot-box {
      display: block;
    }
  }
}
</style>
