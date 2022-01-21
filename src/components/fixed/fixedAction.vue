<template>
  <!--公用的表单以及信息提示随窗口弹出-->
  <div class="fixed-action">
    <div class="slot-box" v-if="layerSlotShow" :style="{left: left, top: top, bottom: bottom, right: right}">
      <header class="slot-header">
        <span class="name">{{slotName}}</span>
        <em btn @click="closeFn();" class="close icon-close"></em>
      </header>
      <!--form表单-->
      <div class="slot-form" v-show="slotShow == 'form'">
        <input type="text" class="slot-input" v-model="inputVal" :placeholder="slotPlace">
      </div>
      <!--/form表单-->
      <!--文字-->
      <div class="slot-txt" v-show="slotShow == 'txt'">
        <p class="txt-txt">{{slotTxt}}</p>
      </div>
      <!--/文字-->
      <div class="slot-btn" btn @click="hideFn()">确定</div>
    </div>

  </div>
</template>

<script>
import { api } from '@/assets/js/util.js'
const API = api()

export default {
  props: {
    slotName: {
      default: ''
    },
    slotShow: {
      default: ''
    },
    slotTxt: {
      default: ''
    },
    slotPlace: {
      default: ''
    }
  },
  data() {
    return {
      left: 'auto',
      top: 'auto',
      bottom: 'auto',
      right: 'auto',
      layerSlotShow: false,
      inputVal: ''
    }
  },
  methods: {
    showFn(el) {
      const box = el
      const rect = box.getBoundingClientRect()
      const Hh = document.documentElement.clientHeight
      const Ww = document.documentElement.clientWidth
      const boxH = box.offsetHeight
      const boxW = box.offsetWidth

      if (rect.left + boxW + 240 < Ww) {
        this.left = rect.left + 'px'
        this.right = 'auto'
      } else {
        this.right = boxW + 'px'
        this.left = 'auto'
      }
      if (rect.top + boxH + 180 < Hh) {
        this.top = rect.top + boxH + 'px'
        this.bottom = 'auto'
      } else {
        this.bottom = rect.bottom + 'px'
        this.top = 'auto'
      }
      this.layerSlotShow = true
    },
    closeFn() {
      this.layerSlotShow = false
      this.slotTxt = ''
    },
    hideFn() {
      if (this.slotShow == 'txt') {
        this.inputVal = ''
        this.closeFn()
      } else {
        this.$emit('update:slotTxt', this.inputVal)
        this.$parent.slotSubmitFn()
      }
    }
  }
}
</script>

<style lang="scss" scoped >
@import '@/assets/sass/base.scss';

.slot-box {
  @extend .radius;
  @extend %shadow;
  position: fixed;
  box-sizing: border-box;
  width: 240px;
  padding: 5px 15px 25px;
  z-index: 10;
  background-color: $white;
  .slot-header {
    @include flex(both, center);
    box-sizing: border-box;
    height: 40px;
    border-bottom: 1px solid $border;
    .name {
      font-weight: bold;
      font-size: 14px;
      line-height: 40px;
    }
    .close {
      line-height: 40px;
    }
  }
  .slot-form,
  .slot-txt {
    line-height: 1;
    margin-top: 10px;
  }
  .txt-txt {
    font-size: 14px;
    line-height: 18px;
    color: #333;
  }
  .slot-input {
    @extend .radius;
    box-sizing: border-box;
    width: 100%;
    height: $inpzhong;
    line-height: $inpzhong;
    padding-left: 15px;
    background-color: $bg;
    color: #333;
  }
  .slot-btn {
    @extend .slot-input;
    text-align: center;
    padding-left: 0;
    margin-top: 10px;
    background-color: $red2;
    color: $white;
    &:hover {
      background-color: $red2hoverbg;
    }
  }
}
</style>
