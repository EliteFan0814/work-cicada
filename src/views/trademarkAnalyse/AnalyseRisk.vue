<template>
  <div class="analyse-risk">
    <div class="title-wrap">
      <div class="title flex-ccc">
        <span>中细软注册风险报告</span>
        <span class="sub">分析日期：2021-08-08</span>
      </div>
      <div class="close pointer">关闭本页</div>
    </div>
    <div class="download flex-ec">
      <BaseDownload></BaseDownload>
    </div>
    <div class="table-wrap">
      <div class="header flex">
        <div class="h-item">分析类别</div>
        <div class="h-item">同名商标数</div>
        <div class="h-item">近似商标数量</div>
        <div class="h-item">已覆盖群组</div>
        <div class="h-item">申请风险</div>
      </div>
      <div class="content">
        <div v-for="item in dataList" :key="item" class="c-wrap ">
          <div class="list-wrap flex">
            <div class="c-item flex-sc">
              <img v-if="item.spread" src="@/assets/imgs/jian.png" class="pointer" @click="handleToggle(item,false)">
              <img v-else src="@/assets/imgs/jia.png" class="pointer" @click="handleToggle(item,true)">
              <span>1类</span>
            </div>
            <div class="c-item">1</div>
            <div class="c-item">1</div>
            <div class="c-item">8/11</div>
            <div class="c-item">中</div>
          </div>
          <div v-if="item.spread" class="more flex">
            <div class="more-item first">
              <div class="title">群组覆盖情况</div>
              <div class="list">
                <div v-for="item in 20" :key="item" class="l-item flex-cc">
                  <span class="l-common">0201</span>
                  <span class="l-common l-text">的非发射点发射点分</span>
                  <span class="l-common">未覆盖</span>
                </div>
              </div>
            </div>
            <div class="more-item second">
              <div class="title">已注册商标情况</div>
              <div class="list">
                <div v-for="item in 20" :key="item" class="l-item flex-cc">
                  <span class="l-common right-color"><span class="icon-btn">相同</span>0201</span>
                  <div class="l-common l-text l-center">点分的非发射点发射点分的非发射点发射点分射点分</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="notice">
      <i class="el-icon-warning-outline"></i><span>商标数据存在延迟，分析结果仅供参考</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnalyseRisk',
  data() {
    return {
      dataList: [
        {
          spread: true
        },
        {
          spread: false
        },
        {
          spread: false
        },
        {
          spread: false
        },
        {
          spread: false
        }
      ]
    }
  },
  methods: {
    handleToggle(item, flag) {
      item.spread = flag
    }
  }
}
</script>

<style lang="scss" scoped>
$borderColor: #ebeef5;
.analyse-risk {
  width: 1090px;
  margin: 0 auto;
  padding: 10px 0;
  .title-wrap {
    position: relative;
    .title {
      font-size: 18px;
      line-height: 44px;
      letter-spacing: 0px;
      color: #333333;
      .sub {
        font-size: 14px;
        line-height: 1;
        letter-spacing: 0px;
        color: #a6a6a6;
      }
    }
    .close {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      padding: 5px;
      background-color: #ffffff;
      border-radius: 4px;
      border: solid 1px #e3e6ef;
    }
  }
  .table-wrap {
    .header {
      .h-item {
        width: 20%;
        box-sizing: border-box;
        padding: 16px 20px;
        background-color: #fafafa;
        border: solid 1px $borderColor;
        color: #4d4d4d;
      }
    }
    .content {
      border: solid 1px $borderColor;
      border-top: none;
      border-bottom: none;
      .c-wrap {
        .list-wrap {
          .c-item {
            padding: 16px 20px;
            width: 20%;
            border-right: solid 1px $borderColor;
            border-bottom: solid 1px $borderColor;
            &:last-child {
              border-right: none;
            }
          }
          .flex-sc {
            img {
              margin-right: 5px;
              width: 14px;
            }
          }
        }
        .more {
          border-bottom: 1px solid $borderColor;
          padding: 16px 20px;
          .more-item {
            .title {
              color: #999999;
              margin-bottom: 12px;
            }
            .list {
              width: 370px;
              max-height: 337px;
              overflow-y: auto;
              &::-webkit-scrollbar {
                width: 5px;
                background-color: transparent;
              }
              &::-webkit-scrollbar-thumb {
                background-color: #cccccc;
                border-radius: 5px;
              }
              border-radius: 4px;
              border: solid 1px #ebeef5;
              padding: 10px;
              .l-item {
                flex-wrap: nowrap;
                border-bottom: 1px solid #ebeef5;
                padding: 10px 0;
                color: #000;
                .l-common {
                  flex-shrink: 0;
                  padding: 0 3px;
                  color: #999999;
                  .icon-btn {
                    display: inline-block;
                    margin-right: 10px;
                    font-size: 12px;
                    padding: 3px 6px;
                    background-color: #58c4ff;
                    border-radius: 4px;
                    color: #fff;
                  }
                  .equal {
                    background-color: #58c4ff;
                  }
                  .similar {
                    background-color: #62e9e9;
                  }
                }
                .right-color {
                  color: #333333;
                }
                .l-text {
                  color: #000;
                  flex-shrink: 1;
                  flex-grow: 1;
                }
                .l-center {
                  text-align: center;
                }
              }
            }
          }
          .first {
            margin-right: 10px;
          }
          .second {
            flex-grow: 1;
            .list {
              width: auto;
            }
          }
        }
      }
    }
  }
  .notice {
    text-align: right;
    font-size: 12px;
    line-height: 16px;
    color: #aaa;
    padding: 20px 0;
  }
}
</style>
