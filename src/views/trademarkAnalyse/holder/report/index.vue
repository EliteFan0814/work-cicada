<template>
  <div class="report_box">
    <div class="loading_box" v-if="loading">
      <loading></loading>
    </div>
    <div v-if="!loading">
      <div class="clearfix">
        <div class="brand-cats">
          <div class="left">
            <div class="brand-count">
              <div class="loading-box" v-show="!brandCount['apply']">
                <loading></loading>
              </div>
              <h3 class="brand-count-title">商标统计</h3>
              <table>
                <tr>
                  <th>
                    <div class="size">{{brandCount['apply']}}</div>
                  </th>
                  <th>
                    <div class="size">{{brandCount['reg']}}</div>
                  </th>
                  <th>
                    <div class="size">{{brandCount['cat']}}个</div>
                  </th>
                </tr>
                <tr>
                  <td>申请总量</td>
                  <td>已注册量</td>
                  <td>涉及类别</td>
                </tr>
              </table>
            </div>
            <div class="echart-box">
              <div class="loading-box" v-show="!catData || catData.length < 1">
                <loading></loading>

              </div>
              <header class="echart-title">
                <h3 class="h3">类别分布图</h3>
                <label class="label"><input @change="getCatsFn($event)" class="input" type="checkbox" />只看已注册</label>
              </header>
              <div id="echart01"></div>

            </div>
          </div>
          <div class="right">
            <div class="loading-box" v-show="!brandList || brandList.length < 1">
              <loading></loading>
            </div>
            <h3 class="brand-list-title">商标品牌TOP10
              <router-link class="link" :to="{path: '/analyse-detail/brand', query: {id: id}}">全部品牌</router-link>
            </h3>
            <div class="brand-list">
              <div @click="toBrandFn(item)" class="list-box" btn v-for="(item, index) in brandList" :key="index">
                <span class="brand-name">{{item['key']}}</span>
                <span class="cats-size">覆盖类别：<em class="red">{{item['by_category']['cat_count']}}个</em></span>
                <div class="focus-catslist">
                  <header class="title">{{item['key']}}</header>
                  <header class="type">
                    <span class="red"><em class="color-box"></em>已覆盖</span>
                    <span class="gray"><em class="color-box"></em>未覆盖</span>
                  </header>
                  <div class="cats-list">
                    <div class="cats-num" :class="{cur: n.is_ok == 1}" v-for="n in item['by_category']['cat']"
                      :key="n.cat_id">{{(n.cat_id < 10) ? '0' + n.cat_id : n.cat_id}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bar-box">
          <!-- <div class="loading-box" v-show="!brandList || brandList.length < 1" >
      <loading></loading>

          </div> -->
          <h3 class="box-title">商标法律状态统计</h3>
          <div class="bar-show">
            <div class="bar-pic" v-for="(item, index) in lineData" :key="index" :style="'width:' + item.percent "><span
                class="show" v-if="parseInt(item.percent) > 8">{{item.key}}:{{item.doc_count}}</span>
              <div class="name">{{item.key}}<br />{{item.doc_count}}({{item.percent}})</div>
            </div>
          </div>
          <div class="bar-explain">
            <div class="explain-box" v-for="(item, index) in lineData" :key="index"><em
                class="color-box"></em>{{item.key}}</div>

          </div>
        </div>
        <div class="map-box" id="">
          <div class="loading-box" v-show="!brandList || brandList.length < 1">
            <loading></loading>
          </div>
          <h3 class="box-title">周期类别申请热力图</h3>
          <div id="echart02">
            <div v-for="(item, value) in mapData" :key="value" class="year-list">
              <em class="year">{{value}} 年 </em>
              <div class="show-box" v-for="(key, index) in item" :key="index" :class="classFn(key)">
                <span class="hover-show" v-if="key > 0"> {{value}} 年 <br /> {{index}}类：{{key}} </span>
              </div>
            </div>

            <ul class="cats-list">
              <li class="li" v-for=" n in 45" :key="n">{{n}}</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
    <prompt :prompt="prompt" :promptType="promptType" v-if="prompt!=''"></prompt>
    <!--申请人主体-->
    <mains :mainShow="mainShow" @closeFN="closeFN" :mainsList="mainsList" :mainAddrsList="mainAddrsList"
      @addrListFn="addrListFn"></mains>
    <!--/申请人主体-->
    <div class="mask" v-if="mainShow"></div>
  </div>
</template>

<script src="./index.js" ></script>

<style scoped  lang="scss"  >
@import '@/assets/sass/base.scss';
.report_box {
  .space {
    height: 20px;
  }
  .empty_box {
    padding-top: 100px;
  }
  .box-title {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
  }
}
.bar-box {
  margin-top: 30px;
  .bar-show {
    @include flex(left, top);
    height: 60px;
    width: 100%;
    .bar-pic {
      @include flex(center);
      position: relative;
      height: 60px;
      width: 20%;
      .show {
        font-size: 12px;
        color: $white;
      }
      .name {
        @extend .radius;
        position: absolute;
        display: none;
        padding: 4px 6px;
        left: 30%;
        top: 10px;
        z-index: 10;
        width: auto;
        min-width: 100px;
        color: $white;
        background-color: rgba(0, 0, 0, 0.6);
      }
      &:hover {
        .name {
          display: block;
        }
      }
      &:nth-of-type(1n) {
        background-color: #d87c7c;
      }
      &:nth-of-type(2n) {
        background-color: #919e8b;
      }
      &:nth-of-type(3n) {
        background-color: #d7ab82;
      }
      &:nth-of-type(4n) {
        background-color: #6e7074;
      }
      &:nth-of-type(5n) {
        background-color: #61a0a8;
      }
      &:nth-of-type(6n) {
        background-color: #efa18d;
      }
      &:nth-of-type(7n) {
        background-color: #787464;
      }
      &:nth-of-type(8n) {
        background-color: #cc7e63;
      }
      &:nth-of-type(9n) {
        background-color: #724e58;
      }
      &:nth-of-type(10n) {
        background-color: #4b565b;
      }
    }
  }
  .bar-explain {
    @include flex(left, top);
    margin-top: 20px;
    .explain-box {
      vertical-align: middle;
      width: 150px;
      font-size: 12px;
      line-height: 14px;
      margin-bottom: 10px;
      .color-box {
        display: inline-block;
        vertical-align: middle;
        width: 14px;
        height: 14px;
        margin-top: -4px;
        margin-right: 4px;
      }
      &:nth-of-type(1n) {
        .color-box {
          background-color: #d87c7c;
        }
      }
      &:nth-of-type(2n) {
        .color-box {
          background-color: #919e8b;
        }
      }
      &:nth-of-type(3n) {
        .color-box {
          background-color: #d7ab82;
        }
      }
      &:nth-of-type(4n) {
        .color-box {
          background-color: #6e7074;
        }
      }
      &:nth-of-type(5n) {
        .color-box {
          background-color: #61a0a8;
        }
      }
      &:nth-of-type(6n) {
        .color-box {
          background-color: #efa18d;
        }
      }
      &:nth-of-type(7n) {
        .color-box {
          background-color: #787464;
        }
      }
      &:nth-of-type(8n) {
        .color-box {
          background-color: #cc7e63;
        }
      }
      &:nth-of-type(9n) {
        .color-box {
          background-color: #724e58;
        }
      }
      &:nth-of-type(10n) {
        .color-box {
          background-color: #4b565b;
        }
      }
    }
  }
}
.map-box {
  position: relative;
  margin-top: 30px;
  #echart02 {
    width: 100%;
    margin-bottom: 40px;
    margin-left: 60px;
    margin-top: 10px;
    .cats-list {
      @include flex(left, center);
      width: 1030px;
      .li {
        text-align: center;
        width: calc(1030px / 45);
        border-top: 1px solid $inpcol;
      }
    }
    .year-list {
      @include flex(left, center);
      position: relative;
      width: 1030px;
      border-left: 1px solid $border;
      .year {
        position: absolute;
        text-align: right;
        box-sizing: border-box;
        font-size: 12px;
        line-height: 22px;
        right: 100%;
        width: 60px;
        padding-right: 10px;
        color: #333;
      }
      &:nth-of-type(n) {
        .show-box:nth-of-type(n) {
          background-color: #f5f5f5;
        }
        .show-box:nth-of-type(2n) {
          background-color: #e6e6e6;
        }
      }
      &:nth-of-type(2n) {
        .show-box:nth-of-type(n) {
          background-color: #e6e6e6;
        }
        .show-box:nth-of-type(2n) {
          background-color: #f5f5f5;
        }
      }
    }
    .show-box {
      position: relative;
      width: calc(1030px / 45);
      height: calc(1030px / 45);
      background-color: $border;
      .hover-show {
        @extend .radius;
        position: absolute;
        padding: 4px;
        bottom: 100%;
        left: -20px;
        width: 60px;
        opacity: 0;
        z-index: -10;
        background-color: rgba(0, 0, 0, 0.6);
        color: $white;
        transition: opacity 0.5s;
      }
      &.red1 {
        background-color: #f0d99c !important;
      }
      &.red2 {
        background-color: #eac392 !important;
      }
      &.red3 {
        background-color: #e4ae87 !important;
      }
      &.red4 {
        background-color: #de987d !important;
      }
      &.red5 {
        background-color: #d88273 !important;
      }
      &.red6 {
        background-color: #ce6963 !important;
      }
      &.red7 {
        background-color: #c45054 !important;
      }
      &.red8 {
        background-color: #bf444c !important;
      }
      &:hover {
        .hover-show {
          opacity: 1;
          z-index: 10;
        }
      }
    }
  }
}

.brand-cats {
  @include flex(both, top);
  padding-top: 20px;
  .left {
    width: 630px;
  }
  .right {
    position: relative;
    width: 440px;
  }
  .brand-count {
    position: relative;
    .brand-count-title {
      font-weight: bold;
      font-size: 14px;
      line-height: 1;
    }
    table {
      width: 100%;
      margin-top: 15px;
    }
    th {
      font-weight: bold;
      text-align: left;
      font-size: 16px;
      padding: 10px;
      border: 1px solid $border;
      border-bottom: none;
      border-left: none;
      &:first-of-type {
        border-left: 1px solid $border;
      }
    }
    td {
      text-align: left;
      font-size: 12px;
      padding: 10px;
      color: $inpcol;
      border: 1px solid $border;
      border-left: none;
      border-top: none;
      &:first-of-type {
        border-left: 1px solid $border;
      }
    }
    .size {
      line-height: 20px;
      height: 20px;
    }
  }
  .echart-box {
    position: relative;
    overflow: hidden;
    margin-top: 20px;
    .echart-title {
      @include flex(both, center);
      .h3 {
        font-weight: bold;
        font-size: 14px;
      }
      .label {
        vertical-align: middle;
        font-size: 12px;
        color: $txtgray1;
        .input {
          vertical-align: middle;
          margin-top: -4px;
          margin-right: 4px;
        }
      }
    }
    #echart01 {
      width: 125%;
      height: 280px;
      margin-left: -12.5%;
    }
  }
}
.brand-list-title {
  font-weight: bold;
  overflow: hidden;
  font-size: 14px;
  width: 100%;
  line-height: 1;
  .link {
    float: right;
    font-weight: normal;
    color: $blue;
  }
}
.brand-list {
  position: relative;
  margin-top: 15px;
  height: 400px;
  border: 1px solid $border;
  .list-box {
    @include flex(both, center);
    box-sizing: border-box;
    height: 40px;
    padding: 0 15px;
    font-size: 12px;
    border-top: 1px solid $border;
    color: #333;
    &:first-of-type {
      border-top: none;
    }
    .cats-size {
      font-size: 14px;
      color: $txtgray2;
      .red {
        @extend .radius;
        display: inline-block;
        padding: 4px 6px;
        line-height: 1;
        background-color: $red2;
        color: $white;
      }
    }
    .focus-catslist {
      position: absolute;
      box-sizing: border-box;
      display: none;
      width: 210px;
      height: 100%;
      top: 0;
      right: 0;
      z-index: 10px;
      padding: 20px;
      border-left: 1px solid $border;
      background-color: $white;
      .title {
        font-weight: bold;
        line-height: 1;
        padding: 0;
      }
      .type {
        margin-top: 15px;
        .color-box {
          @extend .radius;
          display: inline-block;
          vertical-align: middle;
          width: 14px;
          height: 14px;
          margin-top: -2px;
          margin-right: 6px;
          background-color: $red2;
        }
        .red,
        .gray {
          vertical-align: middle;
          line-height: 14px;
          margin-right: 10px;
          color: $txtgray1;
        }
        .gray {
          .color-box {
            background-color: $bg;
          }
        }
      }
      .cats-list {
        @include flex(left, top);
        padding-top: 15px;
        .cats-num {
          @extend .radius;
          text-align: center;
          width: 28px;
          height: 28px;
          line-height: 28px;
          margin-right: 7px;
          margin-bottom: 7px;
          font-size: 14px;
          background-color: $bg;
          &:nth-of-type(5n) {
            margin-right: 0;
          }
          &:hover {
            color: $red2;
          }
          &.cur {
            background-color: $red2;
            color: $white;
          }
        }
      }
    }
    &:hover {
      background-color: $bg;
      .focus-catslist {
        display: block;
      }
    }
  }
}
.loading-box {
  @include flex(center);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
