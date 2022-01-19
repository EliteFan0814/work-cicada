<template>
  <div class="ftitle">
    <div class="r-title-wrap flex">
      <div class="title"><span>{{title}}</span></div>
      <div class="operate flex">
        <div v-if="duan" :class="{'o-item':true, 'flex-cc':true,'active':!isList}" @click="handleShowSet('duan')">
          <span class="iconfont icon-duan"></span>
          <span class="o-text">段落</span>
        </div>
        <div v-if="lie" :class="{'o-item':true, 'flex-cc':true,'active':isList}" @click="handleShowSet('lie')">
          <span class="iconfont icon-lie"></span>
          <span class="o-text">列表</span>
        </div>
        <div v-if="bing" :class="{'o-item':true, 'flex-cc':true,'activeGroup':activeGroup}" @click="handleShowGroup">
          <span class="iconfont icon-bing"></span>
          <span class="o-text">未审群组</span>
        </div>
        <div v-if="en" :class="{'o-item':true, 'flex-cc':true,'activeGroup':activeEn}" @click="handleShowEn">
          <span class="iconfont icon-en"></span>
          <span class="o-text">英文翻译</span>
        </div>
        <div v-if="time" :class="{'o-item':true, 'flex-cc':true,'active':!isClass}" @click="handleTimeClass('time')">
          <span class="iconfont icon-time"></span>
          <span class="o-text">时间</span>
        </div>
        <div v-if="more" :class="{'o-item':true, 'flex-cc':true,'active':isClass}" @click="handleTimeClass('more')">
          <span class="iconfont icon-more"></span>
          <span class="o-text">分类</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ftitle',
  props: {
    title: {
      type: String
    },
    duan: {
      type: Boolean,
      default: false
    },
    lie: {
      type: Boolean,
      default: false
    },
    bing: {
      type: Boolean,
      default: false
    },
    en: {
      type: Boolean,
      default: false
    },
    time: {
      type: Boolean,
      default: false
    },
    more: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isList: false,
      activeGroup: false,
      activeEn: false,
      isClass: false
    }
  },
  methods: {
    handleShowSet(value) {
      if (value === 'duan') {
        this.isList = false
      } else if (value === 'lie') {
        this.isList = true
      }
      this.$emit('showSet', value)
    },
    handleTimeClass(value) {
      if (value === 'time') {
        this.isClass = false
      } else if (value === 'more') {
        this.isClass = true
      }
      this.$emit('timeClass', value)
    },
    handleShowGroup() {
      this.activeGroup = !this.activeGroup
      this.$emit('activeGroup', this.activeGroup)
    },
    handleShowEn() {
      this.activeEn = !this.activeEn
      this.$emit('activeEn', this.activeEn)
    }
  }
}
</script>
<style lang="scss" scoped>
.ftitle {
  .r-title-wrap {
    padding: 10px 0;
    .title {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
      &::before {
        content: '';
        display: block;
        width: 5px;
        height: 14px;
        background-color: #58c4ff;
        border-radius: 2px;
        margin-right: 8px;
      }
    }
    .operate {
      margin-left: 30px;
      .o-item {
        cursor: pointer;
        margin: 0 5px;
        &:hover {
          .iconfont,
          .o-text {
            color: #333;
          }
        }
        .iconfont {
          padding: 0 2px;
          font-size: 20px;
          line-height: 1;
          color: #ccc;
        }
        .o-text {
          font-size: 14px;
          color: #ccc;
          cursor: pointer;
        }
      }
      .active,
      .activeGroup,
      .activeEn {
        .iconfont,
        .o-text {
          color: #333;
        }
      }
    }
  }
}
</style>
