<template>
  <div :class="{'base-input':true, 'has-border':border}" :style="`width:${width};backgroundColor:${bgColor}`">
    <input type="text" v-model="value" :placeholder="placeholder" @input="handleChange" @keyup.enter="handleEmit"
      :style="`backgroundColor:${bgColor}`" class="no-close-remote">
    <i :class="['iconfont',`icon-${icon}`,isHome?'ishome':'']" @click="handleEmit"></i>
    <span v-if="validType === 'email'&&!validEmail" class="err-tips">邮箱格式不正确</span>
    <!-- 远程搜索结果列表 -->
    <div v-show="showSuggest" v-loading="remoteLoading" class="remote-res no-close-remote">
      <template v-if="suggestList.length">
        <div v-for="(item) in suggestList" :key="item" class="res-item no-close-remote" @click="handleSelect(item)">
          {{item}}</div>
      </template>
      <template v-else>
        <div class="empty no-close-remote">
          暂无建议
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import search from '@/api/search'

export default {
  name: 'BaseInput',
  props: {
    border: {
      type: Boolean,
      default: true
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    searchClass: {
      type: Number
    },
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
    },
    isHome: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: this.initValue,
      validEmail: true,
      inputTimer: null,
      showSuggest: false,
      suggestList: [],
      remoteLoading: false
    }
  },
  watch: {
    initValue(newVal) {
      this.value = newVal
      this.handleChange()
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  mounted() {
    this.watchDocClick()
  },
  methods: {
    // 监听全局点击事件
    watchDocClick() {
      document.addEventListener('click', (e) => {
        // 点击边框以外区域就关闭
        if (e.target.className.indexOf('no-close-remote') === -1) {
          this.showSuggest = false
        }
      })
    },
    handleEmit() {
      this.$emit('search', this.value)
    },
    // 监听input更改
    handleChange() {
      // 如果是申请人和代理机构的搜索，则开启远程搜索
      if ([3, 4].includes(this.searchClass)) {
        if (
          this.value.length > 1 &&
          this.initValue !== this.value &&
          this.isLogin
        ) {
          if (this.searchClass === 3) {
            clearTimeout(this.inputTimer)
            this.inputTimer = setTimeout(() => {
              this.showSuggest = true
              this.ownersSuggest()
            }, 500)
          } else if (this.searchClass === 4) {
            this.inputTimer = setTimeout(() => {
              this.showSuggest = true
              this.agentsSuggest()
            }, 500)
          }
        }
      } else if (this.value) {
        this.$emit('changeValue', this.value)
      }
      // if (this.validType === 'email') {
      //   clearTimeout(this.inputTimer)
      //   this.inputTimer = setTimeout(() => {
      //     if (this.value) {
      //       const res = this.handleValidEmail(this.value)
      //       if (!res) {
      //         this.validEmail = false
      //       } else {
      //         this.validEmail = true
      //       }
      //       this.$emit('changeValue', this.value, this.validEmail)
      //     } else {
      //       this.validEmail = true
      //     }
      //   }, 500)
      // } else {
      //   if (this.value) {
      //     this.$emit('changeValue', this.value, this.validEmail)
      //   }
      // }
    },
    ownersSuggest() {
      if (this.value.length > 1) {
        this.remoteLoading = true
        search.ownersSuggest(this.value).then((res) => {
          console.log(res)
          this.remoteLoading = false
          this.suggestList = res || []
        })
      }
    },
    agentsSuggest() {
      if (this.value.length > 1) {
        this.remoteLoading = true
        search.agentsSuggest(this.value).then((res) => {
          console.log(res)
          this.remoteLoading = false
          this.suggestList = res || []
        })
      }
    },
    // 验证邮箱
    handleValidEmail(email) {
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
        email
      )
    },
    // 处理选择
    handleSelect(item) {
      this.value = item
      this.showSuggest = false
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
  border-radius: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    font-size: 16px;
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
  .ishome {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(
        120deg,
        #4af175 1%,
        #4fe3c0 50%,
        #51dbee 100%
      ),
      linear-gradient(#f7f7f7, #f7f7f7);
    background-blend-mode: normal, normal;
  }
  .err-tips {
    position: absolute;
    left: 0;
    bottom: -20px;
    color: #fd576a;
  }
  .remote-res {
    box-sizing: border-box;
    position: absolute;
    z-index: 3;
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
.has-border {
  border: solid 1px #cccccc;
  &:hover {
    border: solid 1px #3168d9;
  }
}
</style>
