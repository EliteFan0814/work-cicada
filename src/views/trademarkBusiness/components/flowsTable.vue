<template>
  <div class="flows-wrap">
    <div class="expand-head">
      <div class="head-item header1">流程</div>
      <div class="head-item header3">业务名称</div>
      <div class="head-item header3">环节</div>
      <div class="head-item header3">日期</div>
    </div>
    <div class="expand-body">
      <div v-for="item in showData" :key="item.name" class="body-item">
        <div class="progress header1">
          <i class="iconfont icon-radiobuttonselect"></i>
          <div class="line"></div>
        </div>
        <div class="bus-name header3">
          <span>{{ item.name }}</span>
        </div>
        <div class="bus-step header3">
          <span>{{ item.process }}</span>
        </div>
        <div class="bus-date header3">
          <span>{{ item.flow_at }}</span>
        </div>
      </div>
    </div>
    <div v-if="showMoreBtn" class="body-more" @click="handleShowMore">
      <span>更多</span>
      <i
        class="iconfont icon-arrow-down"
        :class="{ 'arrow-up': showMoreFlag }"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      localData: [],
      showData: [],
      // 是否展示更多 按钮
      showMoreBtn: false,
      // 是否展示更多 展示状态
      showMoreFlag: false
    }
  },
  watch: {
    tableData: {
      handler: function(newVal) {
        this.localData = newVal || []
        if (this.localData.length > 3) {
          this.showMoreBtn = true
          this.showData = this.localData.slice(0, 3)
        } else {
          this.showMoreBtn = false
          this.showData = this.localData
        }
      },
      immediate: true
    }
  },
  methods: {
    handleShowMore() {
      // 全部展开
      if (!this.showMoreFlag) {
        this.showData = this.localData
      } else {
        // 收起
        this.showData = this.localData.slice(0, 3)
      }
      this.showMoreFlag = !this.showMoreFlag
    }
  }
}
</script>
<style lang="scss" scoped>
.flows-wrap {
  .expand-head {
    padding: 10px 20px;
    width: 100%;
    background-color: #f3f9fc;
    border: 1px solid #e5eef6;
    border-bottom: none;
    display: flex;
    .head-item {
      padding: 5px 0;
      text-align: center;
    }
    .header1 {
      width: 10%;
    }
    .header3 {
      width: 30%;
    }
  }
  .expand-body {
    padding: 10px 20px;
    background-color: #fff;
    border: 1px solid #e5eef6;
    overflow: hidden;
    transition: height 0.5s;
    .body-item {
      padding-bottom: 5px;
      background-color: #fff;
      display: flex;
      align-items: center;
      .progress {
        position: relative;
        .icon-radiobuttonselect {
          font-size: 20px;
          color: #3285ff;
        }
        .line {
          box-sizing: border-box;
          position: absolute;
          top: 32px;
          left: 50%;
          transform: translateX(-50%);
          height: 38px;
          width: 0px;
          border-left: 3px dashed #e5eef6;
        }
      }
      .bus-name {
        background-color: #f3f9fc;
        position: relative;
        ::before {
          position: absolute;
          top: 50%;
          left: -10px;
          transform: translateY(-50%);
          display: block;
          content: '';
          border: 5px solid;
          border-color: transparent #f3f9fc transparent transparent;
        }
      }
      .header1 {
        text-align: center;
        padding: 15px 0;
        width: 10%;
      }
      .header3 {
        padding: 15px 0;
        background-color: #f3f9fc;
        text-align: center;
        width: 30%;
      }
      &:last-child {
        .progress {
          .line {
            display: none;
          }
        }
      }
    }
  }
  .body-more {
    background-image: url(../../../assets/img/trapezoid.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 93px;
    height: 28px;
    margin: -1px auto 0;
    color: #3285ff;
    cursor: pointer;
    .icon-arrow-down {
      transition: all 0.3s;
    }
    .arrow-up {
      transform: rotate(-180deg);
    }
  }
}
</style>
