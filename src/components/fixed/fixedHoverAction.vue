<template>
  <!--
    带有slot的信息提示弹窗位于元素右侧
    效果：hover显示消失
  -->
  <div class="fixed-slot-action">
    <div class="slot-box" ref="slotBox" @mouseleave.stop="hideFn" @mouseenter.stop="enterShowFn"
      :class="{cur: slotShow}" :style="{left: left, top: top, bottom: bottom, right: right}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { api } from '@/assets/js/util.js'
const API = api()
var timer
export default {
  data() {
    return {
      left: 'auto',
      top: 'auto',
      bottom: 'auto',
      right: 'auto',
      slotShow: false,
      fixedShow: false
    }
  },
  methods: {
    showFn(el, size) {
      if (timer) {
        clearTimeout(timer)
        timer = null
        this.slotShow = false
      }
      this.slotShow = true
      const box = el
      const rect = box.getBoundingClientRect()
      const Hh = document.documentElement.clientHeight
      const Ww = document.documentElement.clientWidth
      const boxH = box.offsetHeight
      const boxW = box.offsetWidth
      const slotW = this.$refs.slotBox.clientWidth
      const slotH = this.$refs.slotBox.clientHeight
      if (rect.left + boxW + slotW < Ww) {
        this.left = rect.left + boxW - 5 + 'px'
        this.right = 'auto'
      } else {
        this.right = Ww - rect.left - 5 + 'px'
        this.left = 'auto'
      }
      if (rect.top + boxH + slotH < Ww) {
        this.top = rect.top + 'px'
        this.bottom = 'auto'
      } else {
        this.bottom = rect.bottom + 'px'
        this.top = 'auto'
      }
    },
    hideFn() {
      const that = this
      timer = setTimeout(() => {
        that.slotShow = false
      }, 100)
    },
    enterShowFn() {
      if (timer) {
        clearTimeout(timer)
        timer = null
        return false
      }
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
