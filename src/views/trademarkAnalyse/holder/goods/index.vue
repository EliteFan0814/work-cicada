<template>
  <div class="wait-pages">

    <div class="main">
      <!-- left-nav-->
      <aside class="left-nav">
        <div class="nav-list">
          <h3 class="h3">申请人 <em btn class="clear-btn" @click="checkNameList = []; checkFn()">清空</em></h3>
          <div class="scroll-box">
            <label class="check-list" v-for="(item, index) in nameList" :key="index"><input @change="checkFn()"
                class="check" v-model="checkNameList" :value="item" type="checkbox">{{item}}</label>
          </div>
        </div>
        <div class="nav-list">
          <h3 class="h3">代理机构 <em btn class="clear-btn" @click="checkAngetList = []; checkFn()">清空</em></h3>
          <div class="scroll-box">
            <label class="check-list" v-for="(item, index) in agentList" :key="index"><input class="check"
                @change="checkFn()" v-model="checkAngetList" :value="item.key" type="checkbox">{{item.key}}</label>
          </div>
        </div>
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

          <div class="check-main">
            <div class="check-box">
              <h3 class="check-title">法律状态：</h3>
              <div class="check-list" :class="{show: flowListShow}">
                <label class="input-check" v-for="(item,index) in flowList" :key="index"><input @change="checkFn()"
                    v-model="checkFlowList" class="check" :value="item.key" type="checkbox">{{item.key}}
                  ({{item.doc_count}})</label>
              </div>
              <div v-show="flowList.length > 4" @click="flowListShow = !flowListShow" class="show-more">更多 <em
                  v-show="!flowListShow" class="icon icon-bottom"></em><em v-show="flowListShow"
                  class="icon icon-daohangnavigate6"></em></div>
            </div>
            <div class="check-box">
              <h3 class="check-title">类别：</h3>
              <div class="check-list" :class="{show: catsListShow}">
                <label class="input-check" v-for="(item,index) in catsList" :key="index"><input @change="checkFn()"
                    v-model="checkCatsList" class="check" :value="item.key" type="checkbox">{{item.key}}类
                  ({{item.doc_count}})</label>
              </div>
              <div v-show="catsList.length > 4" @click="catsListShow = !catsListShow" class="show-more">更多 <em
                  v-show="!catsListShow" class="icon icon-bottom"></em><em v-show="catsListShow"
                  class="icon icon-daohangnavigate6"></em></div>
            </div>
            <div class="check-box">
              <h3 class="check-title">申请时间：</h3>
              <div class="check-list" :class="{show: yearListShow}">
                <label class="input-check" v-for="(item,index) in yearList" :key="index"><input @change="checkFn()"
                    v-model="checkYearList" class="check" :value="item.key" type="checkbox">{{item.key}}
                  ({{item.doc_count}})</label>
              </div>
              <div v-show="yearList.length > 4" @click="yearListShow = !yearListShow" class="show-more">更多 <em
                  v-show="!yearListShow" class="icon icon-bottom"></em><em v-show="yearListShow"
                  class="icon icon-daohangnavigate6"></em></div>
            </div>
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
                            <td><span class="tab-title">类别：</span>{{item._source.category}}</td>
                            <td><span class="tab-title">注册号：</span>{{item._source.id}}</td>
                            <td><span class="tab-title">申请时间：</span>{{item._source.appAt}}</td>
                          </tr>
                          <tr>
                            <td><span class="hold"><span class="tab-title">申请人：</span>{{item._source.owner}}</span></td>
                            <!-- <td><span class="tab-title">公告时间：</span>{{item._source.beginAt}}</td> -->
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
              <p class="all-size">共有{{allSize}}个商标</p>
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
  border-right: 1px solid $border;
  .nav-list {
    padding-right: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid $border;
    &:last-of-type {
      border: none;
    }
    .scroll-box {
      overflow-y: overlay;
      max-height: calc((100vh - 340px) / 2);
    }
  }
  .h3 {
    font-weight: bold;
    overflow: hidden;
    font-size: 14px;
    line-height: 30px;
    em {
      float: right;
      font-size: 12px;
      color: $inpcol;
    }
  }
  .check-list {
    position: relative;
    display: block;
    font-size: 12px;
    line-height: 1.6;
    margin-bottom: 4px;
    padding-left: 20px;
    .check {
      position: absolute;
      left: 0px;
      top: 2px;
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
  .check-main {
    @extend .radius;
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
    .check-box {
      @include flex(left, top);
      position: relative;
      margin-bottom: 4px;
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
      margin-right: 20px;
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
      top: 0;
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
        width: 260px;
        .hold {
          width: 240px;
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
    .tab-title {
      color: $inpcol;
    }
  }
}
.common-search-error {
  width: 100% !important;
}
.module-page {
  @include flex(both, center);
  margin-top: 20px;
  .all-size {
    font-size: 12px;
    color: $inpcol;
  }
}
</style>
