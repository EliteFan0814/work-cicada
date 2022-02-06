<template>
  <div class="base-input" :style="`width:${width}`">
    <input type="text" v-model="value" :placeholder="placeholder" @input="handleChange">
    <i :class="['iconfont',`icon-${icon}`]" @click="handleEmit"></i>
    <span v-if="validType === 'email'&&!validEmail" class="err-tips">邮箱格式不正确</span>
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
    validType: {
      type: String,
      default: ''
    },
    initValue: {
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
      value: this.initValue,
      validEmail: true,
      inputTimer: null
    }
  },
  watch: {
    initValue(newVal) {
      this.value = newVal
      this.handleChange()
    }
  },
  methods: {
    handleEmit() {
      if (this.value) {
        this.$emit('search', this.value)
      }
    },
    // 监听input更改
    handleChange() {
      if (this.value) {
        this.$emit('changeValue', this.value)
      }
      if (this.validType === 'email') {
        clearInterval(this.inputTimer)
        this.inputTimer = setTimeout(() => {
          if (this.value) {
            const res = this.handleValidEmail(this.value)
            if (!res) {
              this.validEmail = false
            } else {
              this.validEmail = true
            }
            this.$emit('changeValue', this.value, this.validEmail)
          } else {
            this.validEmail = true
          }
        }, 500)
      } else {
        if (this.value) {
          this.$emit('changeValue', this.value, this.validEmail)
        }
      }
    },
    // 验证邮箱
    handleValidEmail(email) {
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
        email
      )
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
  .err-tips {
    position: absolute;
    left: 0;
    bottom: -20px;
    color: #fd576a;
  }
}
</style>
