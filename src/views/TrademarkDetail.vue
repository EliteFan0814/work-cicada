<template>
  <div class="analyse-risk">
    <div class="content-wrap">
      <div class="close pointer">
        <span>关闭本页</span>
      </div>
      <div class="title-wrap">
        <div class="title flex-ccc">
          <span>中细软注册风险报告</span>
          <span class="sub">分析日期：2021-08-08</span>
          <span class="copy pointer">复制本商标号去中国商标网核查</span>
        </div>
        <div class="download">
          <BaseDownload></BaseDownload>
        </div>
      </div>
      <div class="content flex">
        <div class="left">
          <div class="img-wrap flex-cc">
            <img src="https://dummyimage.com/600x400/000/fff" alt="">
          </div>
          <div class="status flex-cc">
            <div class="btn-wrap">已注册</div>
          </div>
          <div class="chart"></div>
        </div>
        <div class="right">
          <div class="r-title-wrap">
            <div class="title"><span>基本信息</span></div>
            <div class="operate">
            </div>
          </div>
          <div class="detail-wrap">
            <div class="rol">
              <div class="col col75">
                <span class="key">商标名称</span>
                <span class="value">百岁百岁鱼百岁鱼百岁鱼百岁鱼百岁鱼鱼
                  <span class="copy">
                    <span>复制</span>
                  </span>
                </span>
              </div>
              <div class="col col25"><span class="key">商标名称</span><span class="value">百岁鱼百岁鱼百岁鱼<span class="copy">
                    <span>复制</span>
                  </span></span></div>
            </div>
            <div class="rol">
              <div class="col col25"><span class="key">商标名称</span><span class="value">百岁鱼</span></div>
              <div class="col col50"><span class="key">商标名称</span><span class="value">百岁鱼</span></div>
              <div class="col col25"><span class="key">商标名称</span><span class="value">百岁鱼</span></div>
            </div>
            <div class="rol">
              <div class="col col25"><span class="key">商标名称</span><span class="value">百岁鱼</span></div>
              <div class="col col50"><span class="key">商标名称</span><span class="value">百岁鱼</span></div>
              <div class="col col25"><span class="key">商标名称</span><span class="value">百岁鱼</span></div>
            </div>
            <div class="rol">
              <div class="col col100"><span class="key">商标名称</span><span class="value">百岁鱼</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrademarkDetail',
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
$activeColor: #3168d9;

.analyse-risk {
  min-height: 700px;
  background-color: #fafafb;
  .content-wrap {
    width: 1090px;
    margin: 0 auto;
    padding: 10px 0;
    .close {
      text-align: right;
      padding: 5px;
      span {
        display: inline-block;
        padding: 3px 10px;
        background-color: #3168d9;
        border-radius: 15px;
        color: #fff;
      }
    }
    .title-wrap {
      position: relative;
      .title {
        font-size: 18px;
        line-height: 44px;
        letter-spacing: 0px;
        color: #333333;
        font-weight: bold;
        .sub {
          font-weight: normal;
          font-size: 14px;
          line-height: 1;
          letter-spacing: 0px;
          color: #a6a6a6;
        }
        .copy {
          font-size: 12px;
          letter-spacing: 0px;
          color: #999999;
          line-height: 1.4;
          background-color: #fafafb;
          border-radius: 8px;
          border: solid 1px #e5e5e5;
          padding: 0 5px;
          margin-top: 20px;
        }
        .pointer {
          &:hover {
            border: solid 1px $activeColor;
            color: $activeColor;
          }
        }
      }
      .download {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .content {
      justify-content: space-between;
      .left {
        background-color: #fff;
        padding: 10px;
        margin-right: 10px;
        // border: 1px solid red;
        .img-wrap {
          width: 220px;
          height: 220px;
          img {
            max-width: 200px;
            max-height: 200px;
          }
        }
        .status {
          .btn-wrap {
            text-align: center;
            font-size: 14px;
            line-height: 30px;
            letter-spacing: 0px;
            color: #3168d9;
            width: 80px;
            height: 30px;
            background-color: #cdedff;
            border-radius: 2px;
            border: solid 1px #58c4ff;
          }
        }
      }
      .right {
        background-color: #fff;
        flex-grow: 1;
        padding: 10px;
        .r-title-wrap {
          padding: 10px 0;
          border-bottom: 1px solid #e8e8e8;
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
        }
        .detail-wrap {
          .rol {
            display: flex;
            border-bottom: 1px dashed #e8e8e8;
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
                width: 105px;
                color: rgba(0, 0, 0, 0.85);
                font-weight: 600;
              }
              .value {
                flex-grow: 1;
                color: #595959;
                margin-right: 10px;
                position: relative;
                .copy {
                  display: none;
                }
                &:hover {
                  .copy {
                    display: inline-block;
                    padding: 0 10px !important;
                  }
                }
              }
            }
            .col25 {
              width: 25%;
            }
            .col50 {
              width: 50%;
            }
            .col75 {
              width: 75%;
            }
            .col100 {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
