<template>
  <article class="holder-page">
    <!-- <top ref="top" :types="name"></top> -->
    <div v-if="loading">
      <loading></loading>
    </div>
    <dl class="common-search-error" v-show="error && !loading">
      <dt class="icon icon-yincang"></dt>
      <dd class="search-txt">该报告为私有报告，仅报告所有者可见</dd>
    </dl>
    <section class="main" v-if="!loading && !error">
      <div class="holder-title" v-if="mainsList.length > 0">
        <i class="icon icon-kehujingli-svg holder"></i>
        <span class="tit">{{mainsList[0].name}}</span>
        <span class="tag pointer">
          <span v-if="mainsList.length">{{mainsList.length}}</span>个主体<i class="icon icon-right"></i>
          <dd class="hover-show-box">
            <div v-if="holderType == 1" class="qy-holder-list">
              <p class="list-box" v-for="(item, index) in mainsList" :key="index">{{item.name}}</p>
            </div>
            <div v-if="holderType == 2" class="gr-holder-list">
              <div class="list-box" v-for="(item, index) in mainsList" :key="index">
                <span class="name">{{item.name}}</span>
                <span class="addr">{{item.addr}}</span>
              </div>
            </div>
          </dd>
        </span>
        <div btn class="down-btn" @click="allDownFn"><em class="icon icon-download"></em>下载报告</div>
      </div>
      <!-- tabs 列表 -->
      <nav class="menu-list">
        <el-tabs v-model="activeNav" @tab-click="handleChangeTab" style="width:100%;">
          <el-tab-pane v-for="item in navList" :key="item.label" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
      </nav>
      <template>
        <router-view :id='id' :nameList="nameList" />
      </template>
      <prompt :prompt="prompt" :promptType="promptType"></prompt>
    </section>
  </article>

</template>

<script>
import prompt from '@/components/prompt'

import loading from '@/components/loading'
import { api, formatDate } from '@/assets/js/util.js'

export default {
  components: {
    loading,
    prompt
  },
  data() {
    return {
      activeNav: '0',
      navList: [
        {
          label: '报告总览',
          name: '0',
          routerInfo: { path: '/AnalyseDetail/index' }
        },
        {
          label: '风险分析',
          name: '1',
          routerInfo: { path: '/AnalyseDetail/risk' }
        },
        {
          label: '申请人档案',
          name: '2',
          routerInfo: { path: '/AnalyseDetail/owner' }
        },
        {
          label: '品牌分析',
          name: '3',
          routerInfo: { path: '/AnalyseDetail/brand' }
        },
        {
          label: '商标档案',
          name: '4',
          routerInfo: { path: '/AnalyseDetail/goods' }
        },
        {
          label: '代理机构档案',
          name: '5',
          routerInfo: { path: '/AnalyseDetail/agent' }
        }
      ],
      menuIndex: 0,
      id: 0,
      name: '客户分析报告',
      loading: true,
      error: false,

      mainsList: [],
      nameList: [],
      holderType: 1,

      prompt: '',
      promptType: 'success'
    }
  },
  watch: {
    $route(newValue) {
      this.activeNav = newValue.meta.tabVal
    }
  },
  mounted() {
    this.id = 'f8b2160a7a97723ca453935e382f3b2e'
    this.getMainFn()
  },
  methods: {
    handleChangeTab(item) {
      this.$router.push({
        ...this.navList[item.name].routerInfo,
        query: { id: this.id }
      })
    },
    promptFn(msg, type = 'success') {
      const that = this
      this.prompt = msg
      this.promptType = type
      setTimeout((res) => {
        that.prompt = ''
      }, 3000)
    },
    // down
    allDownFn(item) {
      const that = this
      const data = {
        params: `id=${this.id}`,
        title: `${this.mainsList[0].name}的分析函-${formatDate(new Date())}.xls`
      }
      if (item.type == 3) {
        data.type = 'reportRegXls'
      } else {
        data.type = 'reportOwnerPdf'
      }
      API.getDown(data).then((res) => {
        if (res.data.code == 200) {
          this.$refs.top.downLayerShowFn(true)
          this.promptFn('已创建下载任务')
        } else {
          this.promptFn(res.data.msg, 'err')
        }
      })
    },
    downFn(data) {
      API.getDown(data).then((res) => {
        if (res.data.code == 200) {
          this.$refs.top.downLayerShowFn(true)
          this.promptFn('已创建下载任务')
        } else {
          this.promptFn(res.data.msg, 'err')
        }
      })
    },
    // 获取主体 && 操作
    getMainFn() {
      API.get(`/report/report/base/${this.id}`, '').then((res) => {
        this.loading = false
        if (res.data.code == 200) {
          this.mainsList = res.data.apply_info
          this.holderType = res.data.type
          this.nameList = res.data.nameArr
          this.$router.push({
            ...this.navList[0].routerInfo,
            query: { id: this.id }
          })
        } else if (res.data.code == 201) {
          this.error = true
        }
      })
    }
  }
}
const API = api()
</script>
<style scoped  lang="scss" >
@import '@/assets/sass/base.scss';

.holder-page {
  .icon-kehujingli-svg {
    &::before {
      color: #3168d9;
    }
  }
  // min-height: 100vh;
  background-color: #fff;
  .main {
    @extend .radius;
    box-sizing: border-box;
    width: 1130px;
    margin: 30px auto 0;
    padding: 20px;
    padding-top: 0;
    background-color: $white;
  }
}

.menu-list {
  @include flex(left, center);
  position: relative;
  // &:before {
  //   content: '';
  //   position: absolute;
  //   width: 100%;
  //   height: 2px;
  //   background-color: $red2;
  //   bottom: 0;
  //   z-index: 3;
  // }
  .menu-box {
    display: block;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    width: 120px;
    height: 80px;
    z-index: 1;
    border: 1px solid $border;
    border-right: none;
    background-color: $white;
    color: #333;
    &:last-of-type {
      border-right: 1px solid $border;
      &.cur {
        border-right: 2px solid #fb717e;
      }
    }
    .icon {
      display: block;
      text-align: center;
      font-size: 30px;
      margin: 8px 0 4px;
      color: $inpcol;
    }
    &:hover {
      background-color: $bg;
    }
  }
  .cur {
    z-index: 5;
    border-bottom: none;
    border-color: $red2;
    border-right: 2px solid $red2;
    border-left-width: 2px;
    border-top-width: 2px;
    color: $red2;
    background-color: $white !important;
    .icon {
      color: $red2;
    }
    & + .menu-box {
      border-left: none;
    }
  }
}
.holder-title {
  @extend .clearfix;
  line-height: 70px;
  .down-btn {
    @extend .radius;
    float: right;
    text-align: center;
    width: 110px;
    height: 34px;
    line-height: 34px;
    margin-top: 20px;
    background-color: $green;
    color: $white;
    .icon {
      font-size: 20px;
      margin-right: 6px;
      color: $white;
    }
    &:hover {
      background-color: $greenhover;
    }
  }
  .tit {
    font-size: 16px;
    font-weight: bold;
  }
  .icon {
    vertical-align: top;
    font-size: 24px;
    color: $red2;
    &.holder {
      margin-right: 10px;
    }
  }
  .hover-show-box {
    display: none;
    position: absolute;
    z-index: 10;
  }
  .tag {
    height: 20px;
    background: #a2a7b0;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    display: inline-block;
    line-height: 20px;
    padding: 0 5px;
    margin-left: 15px;
    .icon {
      vertical-align: middle;
      color: #fff;
      font-size: 12px;
    }
    &:hover {
      .hover-show-box {
        display: block;
      }
    }
  }
}
.copyright {
  margin: 0 auto;
  padding-bottom: 0;
}
.qy-holder-list {
  @extend .radius;
  @extend .shadow;
  overflow-y: overlay;
  max-height: 240px;
  width: 280px;
  background-color: $white;
  .list-box {
    font-size: 12px;
    line-height: 1.6;
    padding: 4px 10px;
    border-bottom: 1px solid $border;
    color: #333;
    &:last-of-type {
      border-bottom: none;
    }
  }
}

.gr-holder-list {
  @extend .radius;
  @extend .shadow;
  overflow-y: overlay;
  max-height: 240px;
  width: 280px;
  z-index: 10;
  background-color: $white;
  color: #333;
  .list-box {
    @include flex(left, top);
    font-size: 12px;
    line-height: 1.6;
    padding: 4px 10px;
    border-bottom: 1px solid $border;
    .name {
      width: 66px;
    }
    .addr {
      width: 166px;
      color: $txtgray1;
    }
  }
}

.common-search-error {
  background-color: $bg;
}
</style>
