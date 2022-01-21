<template>
  <!--带有slot的信息提示弹窗位于元素下方-->
  <div class="fixed-slot-action">
    <div class="slot-box" ref="slotBox" :class="{cur: slotShow}"
      :style="{left: left, top: top, bottom: bottom, right: right}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { api } from '@/assets/js/util.js'
const API = api()

export default {
  data() {
    return {
      left: 'auto',
      top: 'auto',
      bottom: 'auto',
      right: 'auto',
      slotShow: false
    }
  },
  methods: {
    showFn(el) {
      const box = el
      const rect = box.getBoundingClientRect()
      const slot = this.$refs.slotBox
      const Hh = document.documentElement.clientHeight
      const Ww = document.documentElement.clientWidth
      const boxH = box.offsetHeight
      const boxW = box.offsetWidth
      const slotW = slot.clientWidth
      const slotH = slot.clientHeight

      if (rect.left + boxW + slotW < Ww) {
        this.left = rect.left + 'px'
        this.right = 'auto'
      } else {
        this.right = boxW + 'px'
        this.left = 'auto'
      }
      if (rect.top + boxH + slotH < Hh) {
        this.top = rect.top + boxH + 'px'
        this.bottom = 'auto'
      } else {
        this.bottom = rect.bottom + 'px'
        this.top = 'auto'
      }
      this.slotShow = true
    },
    hideFn() {
      this.slotShow = false
    }
  }
}
</script>

<style lang="scss" scoped >
@import '@/assets/sass/base.scss';
.slot-box {
  position: fixed;
  z-index: -100;
  opacity: 0;
  transition: opacity 0.3s;
  &.cur {
    opacity: 1;
    z-index: 999;
  }
}
</style>
