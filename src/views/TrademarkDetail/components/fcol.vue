<template>
  <div class="col" :style="`width:${width}%`">
    <div class="key" :class="{ key: true, link: link }">
      {{ name }}<span class="sub">{{ sub }}</span>
    </div>
    <div class="value">
      <div :class="{ val: true, 'is-list': isList }">
        <slot>
          <!-- 非列表模式 -->
          <div v-if="!isList" class="s-rol-wrap">
            <span v-for="(item, index) in value" :key="index" class="s-rol">
              <span
                :class="{ 'value-link': valueLink }"
                @click="handleClick(item.value)"
                >{{ item.value }}</span
              >
              <span v-if="item.subText" class="sub-text">{{
                item.subText
              }}</span>
            </span>
          </div>
          <!-- 列表模式 -->
          <div v-else class="m-rol-wrap">
            <span v-for="(item, index) in value" :key="index" class="s-rol">
              <span
                :class="{ 'value-link': valueLink }"
                @click="handleClick(item.value)"
                >{{ item.value }}</span
              >
              <span v-if="item.subText" class="sub-text">{{
                item.subText
              }}</span>
            </span>
          </div>
        </slot>
        <div class="operate">
          <div class="flex">
            <span
              v-if="copy"
              class="iconfont icon-copy"
              title="复制"
              @click="handleCopy"
            ></span>
            <span
              v-if="qiye"
              class="iconfont icon-qiye"
              title="企业信用"
              @click="handleCredit"
            ></span>
            <span
              v-if="baidu"
              class="iconfont icon-baidu"
              title="百度一下"
              @click="handleBaidu"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'fcol',
  props: {
    isList: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: undefined
    },
    copy: {
      type: Boolean,
      default: true
    },
    qiye: {
      type: Boolean,
      default: false
    },
    baidu: {
      type: Boolean,
      default: false
    },
    valueLink: {
      type: Boolean,
      default: false
    },
    // 跳转搜索类型
    linkType: {
      type: String,
      default: undefined
    },
    name: {
      type: String
    },
    sub: {
      type: String
    },
    value: {
      type: [Array],
      default() {
        return []
      }
    },
    width: {
      type: [String, Number],
      default: 100
    }
  },
  methods: {
    // 复制
    handleCopy() {
      this.$copyText(this.value[0].value)
        .then((e) => {
          this.$message({ type: 'success', message: '复制成功！' })
        })
        .catch((e) => {
          this.$message({ type: 'error', message: '复制失败！' })
        })
    },
    // 企业信用
    handleCredit() {
      const href = `https://www.qcc.com/web/search?key=${this.value[0].value}`
      window.open(href, '_blank')
    },
    // 百度一下
    handleBaidu() {
      const href = `https://www.baidu.com/s?wd=${this.value[0].value}`
      window.open(href, '_blank')
    },
    // 搜索
    handleClick(keyword) {
      // 代理机构搜索
      if (this.linkType === 'agencySearch') {
        const routeData = this.$router.resolve({
          name: 'TrademarkSearch',
          query: { searchKey: keyword, searchClass: 4 }
        })
        window.open(routeData.href, '_blank')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
span {
  display: inline-block;
  font-size: 14px;
  line-height: 18px;
}
.col {
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-right: 1px dashed #e8e8e8;
  &:last-child {
    border-right: none;
  }
  &:not(:first-child) {
    .key {
      padding-left: 10px;
    }
  }
  .key {
    flex-shrink: 0;
    width: 105px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    .sub {
      font-weight: normal;
      display: inline-block;
      padding-left: 3px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.85);
      cursor: default;
    }
  }
  .link {
    cursor: pointer;
    color: #3287c8;
  }
  .value {
    flex-grow: 1;
    color: #595959;
    padding-right: 10px;
    position: relative;

    .value-link {
      cursor: pointer;
      color: #3287c8;
    }
    .sub-text {
      padding-left: 5px;
    }
    .val {
      display: inline-block;
      position: relative;
      .s-rol-wrap {
        .s-rol {
          padding: 0 3px;
        }
      }
      .m-rol-wrap {
        .s-rol {
          padding: 5px 3px;
          display: block;
          border-bottom: 1px dashed #ccc;
          &:last-child {
            border-bottom: none;
          }
        }
      }
      .operate {
        position: absolute;
        right: 0px;
        transform: translateX(100%) translateY(-50%);
        top: 50%;
        display: none;
        font-size: 20px;
        .iconfont {
          padding: 0 2px;
          font-size: 20px;
          cursor: pointer;
          color: #ccc;
          &:hover {
            color: #333;
          }
        }
      }
    }
    .is-list {
      width: 100%;
    }
    &:hover {
      .operate {
        display: inline-block;
      }
    }
  }
}
</style>
