<template>
  <div class="wait-pages">
    <header class="tab-box">
      <dl btn class="tab-btn" :class="{cur: tabShow == 1}" @click="tabShowFn(1)">
        <dt class="size">{{flSize}}</dt>
        <dd class="name">法律风险</dd>
      </dl>
      <dl btn class="tab-btn" :class="{cur: tabShow == 2}" @click="tabShowFn(2)">
        <dt class="size">{{qzSize}}</dt>
        <dd class="name">潜在风险</dd>
      </dl>
      <!-- <dl btn class="tab-btn" :class="{cur: tabShow == 3}" @click="tabShowFn(1)">
      <dt class="size">1</dt>
      <dd class="name">近似风险</dd>
    </dl> -->
    </header>

    <div class="main">
      <!-- left-nav-->
      <aside class="left-nav">
        <div btn class="search-nav" v-show="tabShow == 1" @click="navChangeFn('')" :class="{cur: navCur == '' }"><em
            class="icon icon-zhixiang-zhishiqiyou"></em>全部 <em class="size"></em></div>
        <div btn class="search-nav" @click="navChangeFn(item.key)" :class="{cur: item.key == navCur}"
          v-for="(item, index) in navList" :key="index"><em class="icon icon-zhixiang-zhishiqiyou"></em>{{item.key}} <em
            class="size">{{item.doc_count}}</em></div>
      </aside>
      <section class="main-show">
        <h3 class="main-title">
          <div class="search-box">
            <em btn class="icon icon-close" v-show="inpClearShow" @click="inpClearFn"></em>
            <em btn class="icon icon-sousuo1" @click="searchFn(1)"></em>
            <input @keyup.enter="searchFn(1)" v-model="searchKey" type="text" class="search-input" placeholder="商标名称">
          </div>
          <div btn class="down-btn" @click="downFn">导出商标</div>
        </h3>
        <div>
          <div class="check-box">
            <h3 class="check-title">法律状态：</h3>
            <div class="check-list" :class="{show: checkListShow}">
              <label class="input-check" v-for="(item,index) in checkList" :key="index"><input @change="checkFn"
                  v-model="checkCur" class="check" :value="item.key" type="checkbox">{{item.key}}
                ({{item.doc_count}})</label>
            </div>
            <div v-show="checkList.length > 4" @click="checkListShow = !checkListShow" class="show-more">更多 <em
                v-show="!checkListShow" class="icon icon-bottom"></em><em v-show="checkListShow"
                class="icon icon-daohangnavigate6"></em></div>
          </div>
          <div v-show="loading">
            <loading></loading>
          </div>
          <div class="table-list" v-show="!loading">
            <table>
              <tr v-for="(item, index) in tableData" :key="index">
                <td>
                  <div class="img-box">
                    <img :src="item._source.img" class="img" alt="">
                  </div>
                </td>
                <td>
                  <dl>
                    <dt class="title">{{item._source.name}}<span class="tag">{{item._source.last_flow_status}}</span>
                    </dt>
                    <dd>
                      <div class="brand-info">
                        <table>
                          <tr>
                            <td><span class="tab-title">类别：</span>{{item._source.cat_name}}</td>
                            <td><span class="tab-title">注册号：</span>{{item._source.id}}</td>
                            <td><span class="tab-title">申请时间：</span>{{item._source.appAt}}</td>
                          </tr>
                          <tr>
                            <td><span class="hold"><span class="tab-title">申请人：</span>{{item._source.owner}}</span></td>
                            <!-- <td>公告时间：{{item._source.beginAt}}</td> -->
                            <td colspan="2"><span class="hold"><span
                                  class="tab-title">代理机构：</span>{{item._source.agent}}</span></td>
                          </tr>
                        </table>
                      </div>

                    </dd>
                  </dl>
                </td>
                <td class="btn-box">
                  <router-link target="_blank" :to="{path: '/search/detail', query:{brand_id: item._source.uuid}}"
                    class="show-btn">查看详情</router-link>
                </td>
              </tr>
            </table>
            <dl class="common-search-error" v-show="searchError">
              <dt class="icon icon-empty1"></dt>
              <dd class="search-txt">没有相关商标数据</dd>
            </dl>
            <div class="module-page">
              <pages :pageId.sync="pageId" :pageSizeShow="pageSizeShow" :pageAll.sync="pageAll"></pages>
            </div>
          </div>
        </div>

      </section>
    </div>
    <back-top></back-top>
  </div>
</template>

<script src="./index.js" ></script>

<style lang="scss" scoped >
@import '@/assets/sass/base.scss';
.wait-pages {
  width: 100%;
  padding-top: 20px;
  background-color: $white;
}
.tab-box {
  overflow: hidden;
  margin-bottom: 15px;
  .tab-btn {
    @extend .radius;
    float: left;
    box-sizing: border-box;
    padding: 10px 15px;
    margin-right: 20px;
    width: 190px;
    background-color: $bg;
    .name {
      font-size: 12px;
      line-height: 1;
      color: #333;
    }
    .size {
      font-weight: bold;
      font-size: 16px;
      line-height: 1;
      margin-bottom: 10px;
      color: $red2;
      &.gray {
        color: $txtgray1;
      }
    }
    &.cur {
      background-color: $red2;
      .size {
        color: $white;
      }
      .name {
        color: $white;
      }
    }
  }
}
.holder-title {
  @extend .clearfix;
  line-height: 70px;
  padding-top: 10px;
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
    font-size: 22px;
    color: #a2a7b0;
    vertical-align: top;
    &.icon-wj-jzbg {
      margin-right: 10px;
    }
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
  }
}
.main {
  @include flex(both, top);
}
.left-nav {
  box-sizing: border-box;
  overflow-y: auto;
  width: 190px;
  height: calc(100vh - 260px);
  border-right: 1px solid $border;
  .h3 {
    font-weight: bold;
    font-size: 14px;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .search-nav {
    overflow: hidden;
    box-sizing: border-box;
    line-height: $inpzhong;
    font-size: 12px;
    padding: 0 10px;
    border-bottom: 1px solid $border;
    .size {
      float: right;
      font-size: 12px;
      color: $txtgray2;
    }
    .icon {
      display: none;
    }
    &.cur {
      font-weight: bold;
      color: $red2;
      .icon {
        display: inline-block;
      }
    }
    &:hover {
      background-color: $bg;
    }
  }
}

.main-show {
  width: 880px;
  .main-title {
    font-weight: bold;
    overflow: hidden;
    font-size: 14px;
    line-height: 30px;
    margin-bottom: 10px;
    .down-btn {
      @extend .radius;
      float: right;
      text-align: center;
      font-weight: normal;
      width: 90px;
      height: 30px;
      background-color: $white;
      border: 1px solid $border;
      &:hover {
        border-color: $inpcol;
      }
    }
  }
  .check-box {
    @extend .radius;
    @include flex(left, top);
    box-sizing: border-box;
    position: relative;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    background-color: $bg;
    .check-title {
      overflow: hidden;
      font-size: 12px;
      width: 84px;
      height: 24px;
      line-height: 24px;
      color: $inpcol;
    }
    .check-list {
      overflow: hidden;
      width: calc(100% - 120px);
      height: 24px;
      &.show {
        height: auto;
      }
    }
    .input-check {
      display: block;
      float: left;
      font-size: 12px;
      line-height: 24px;
      height: 24px;
      margin-right: 15px;
      .check {
        vertical-align: middle;
        margin-top: -2px;
        margin-right: 4px;
      }
    }
    .show-more {
      position: absolute;
      cursor: pointer;
      font-size: 12px;
      right: 15px;
      top: 10px;
      line-height: 24px;
      color: $inpcol;
    }
  }
  .search-box {
    @extend .radius;
    position: relative;
    display: inline-block;
    width: 240px;
    border: 1px solid $border;
    .search-input {
      @extend .radius;
      box-sizing: border-box;
      width: 180px;
      height: $inpsmall;
      line-height: $inpsmall;
      padding-left: 15px;
      background-color: $white;
      color: #333;
    }
    .icon-close {
      position: absolute;
      font-weight: bold;
      right: 30px;
      top: 0;
      font-size: 18px;
      line-height: $inpsmall;
      color: $txtgray1;
    }
    .icon-sousuo1 {
      position: absolute;
      font-weight: bold;
      right: 10px;
      top: 0;
      font-size: 18px;
      line-height: $inpsmall;
      color: $txtgray1;
    }
  }
}
.table-list {
  width: 100%;
  table {
    width: 100%;
  }
  td {
    text-align: left;
    vertical-align: top;
    padding: 10px 0;
    border-bottom: 1px solid $border;
    &.btn-box {
      width: 100px;
    }
    &:first-of-type {
      width: 100px;
    }
  }
  .img-box {
    @include flex(center);
    width: 78px;
    height: 78px;
    border: 1px solid $border;
    .img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  dl {
    width: 600px;
  }
  .title {
    font-weight: bold;
    font-size: 14px;
    width: 580px;
    color: #333;
  }
  .tag {
    margin-left: 20px;
    color: $red2;
  }
  .show-btn {
    @extend .radius;
    text-align: center;
    font-weight: normal;
    display: block;
    width: 90px;
    height: 30px;
    line-height: 30px;
    background-color: $white;
    border: 1px solid $border;
    &:hover {
      border-color: $inpcol;
    }
  }
  .brand-info {
    margin-top: 10px;
    width: 630px;
    table {
      width: 100%;
    }
    td {
      padding: 4px 0;
      font-size: 12px;
      border: none;
      &:first-of-type {
        width: 220px;
        .hold {
          width: 200px;
        }
      }
      &:nth-of-type(2) {
        width: 190px;
      }
    }
    .hold {
      width: 300px;
      @extend %hold;
    }
  }
  .tab-title {
    color: $inpcol;
  }
}
.common-search-error {
  width: 100% !important;
}
.module-page {
  margin-top: 20px;
}
</style>
