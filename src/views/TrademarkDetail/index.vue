<template>
  <div class="analyse-risk">
    <div class="content-wrap">
      <div class="close pointer">
        <span @click="closePage">关闭本页</span>
      </div>
      <div class="title-wrap">
        <div class="title flex-ccc">
          <span>“{{ detailName }}”商标档案</span>
          <span class="sub">分析日期：{{ createDate }}</span>
          <span class="copy pointer" @click="copyGoNnipa"
            >复制本商标号去中国商标网核查</span
          >
        </div>
        <div class="download">
          <BaseDownload></BaseDownload>
        </div>
      </div>
      <div class="content flex">
        <!-- 左侧 -->
        <div class="left">
          <div class="img-wrap flex-cc">
            <!-- <img src="https://dummyimage.com/600x400/000/fff" alt="" /> -->
            <img :src="$imgUrl + detailInfo.reg_id + '.jpg'" alt="" />
          </div>
          <div class="status flex-cc">
            <div class="btn-wrap">
              {{ $transStatus(detailInfo.status || -1) }}
            </div>
          </div>
          <div class="chart"></div>
        </div>
        <!-- 右侧 -->
        <div class="right">
          <div class="info-wrap">
            <baseInfo :detailInfo="detailInfo"></baseInfo>
          </div>
          <div class="info-wrap">
            <goodServe :detailInfo="detailInfo"></goodServe>
          </div>
          <div class="info-wrap">
            <markFlow :detailInfo="detailInfo"></markFlow>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseInfo from './components/baseInfo.vue'
import goodServe from './components/goodServe.vue'
import markFlow from './components/markFlow.vue'
import apiSearch from '@/api/search'

export default {
  name: 'TrademarkDetail',
  components: { baseInfo, goodServe, markFlow },
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
      ],
      detailInfo: {},
      regId: '',
      detailName: undefined,
      createDate: undefined
    }
  },
  created() {
    const id = this.$route.query.b_id || ''
    this.detailName = this.$route.query.name || ''
    this.getDetailInfo(id)
  },
  methods: {
    // 获取纤细信息
    getDetailInfo(id) {
      apiSearch
        .getDetailInfo(id)
        .then((res) => {
          this.detailInfo = res
          this.regId = res.reg_id
          this.createDate = this.$dayjs(this.detailInfo.created_at).format(
            'YYYY-MM-DD'
          )
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleToggle(item, flag) {
      item.spread = flag
    },
    copyGoNnipa() {
      this.$copyText(this.regId)
        .then((e) => {
          // this.$message({ type: 'success', message: '复制成功！' })
          window.open('http://wcjs.sbj.cnipa.gov.cn/txnT01.do', '_blank')
        })
        .catch((e) => {
          this.$message({ type: 'error', message: '复制失败！' })
        })
    },
    closePage() {
      window.close()
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
      margin-bottom: 40px;
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
        flex-grow: 1;
        .info-wrap {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
