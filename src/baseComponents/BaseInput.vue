<template>
  <div class="base-input" :style="`width:${width}`">
    <input type="text" v-model="value" :placeholder="placeholder">
    <i :class="['iconfont',`icon-${icon}`]" @click="handleEmit"></i>
  </div>
</template>
<script>
export default {
  name: 'BaseInput',
  props: {
    icon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: '请输入搜索关键字'
    },
    width: {
      type: [String, Number],
      required: false,
      default: '400px'
    }
  },
  data() {
    return {
      value: null
    }
  },
  methods: {
    handleEmit() {
      if (this.value) {
        this.$emit('search', this.value)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.base-input {
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
  input {
    box-shadow: none; /*去除阴影*/
    outline: none; /*聚焦input的蓝色边框*/
    resize: none; /*textarea 禁止拖拽*/
    border: none; /*去除边框*/
    -webkit-appearance: none; /*常用于IOS下移除原生样式*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /*点击高亮的颜色*/
    width: 90%;
    // border: 1px solid red;
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
}
</style>
