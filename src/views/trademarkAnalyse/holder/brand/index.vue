<template>
  <article class="brand-page">
    <header class="page-header">
      <p class="all-size">共计品牌<em class="size">{{sizeALl}}</em>个</p>
      <div>
        <span class="type-color red">类别已覆盖</span>
        <span class="type-color orange">类别覆盖无效</span>
        <div class="search-box">
          <em btn class="icon icon-close" @click="searchClearFn" v-show="searchKey"></em>
          <em btn class="icon icon-sousuo1" @click="searchFn();"></em>
          <input @keyup.enter="searchFn" type="text" class="search-input" placeholder="商标名称" v-model="searchKey">
        </div>
      </div>
    </header>
    <section class="cats-box">
      <div v-show="mainLoading">
        <loading></loading>
      </div>
      <div v-show="!mainLoading">
        <div class="ovh">
          <aside class="aside-box">
            <header class="box-title">品牌</header>
            <div v-for="(item, index) in tableData" :key="index" class="brand-list" :title="item.key"><span
                class="name">{{item.key}}</span><em btn class="icon icon-sousuo1" @click="getGoodsFn(item, 1)"></em>
            </div>
          </aside>
          <div class="table-list">
            <div ref="scrollBox" class="scroll-box">
              <div class="box">
                <header class="box-title">
                  <div class="cats-list">
                    <span class="btn-btn" v-for="item in 45" :key="item">{{(item < 10) ? '0' + item : item }}</span>
                  </div>
                  <em @click.stop="scrollLeftFn" v-show="scrollBtnShow != 1"
                    class="icon-left btn-btn icon-zhixiang-zhishiqiyou"></em>
                  <em @click.stop="scrollRightFn" v-show="scrollBtnShow != 2"
                    class="icon-right btn-btn icon-zhixiang-zhishiqiyou"></em>
                </header>
                <div class="brand-cats-type" v-for="(item, index) in tableData" :key="index">
                  <span class="btn-btn" @click="getGoodsFn(item, key.key)"
                    :class="{red: key.color == 1, orange: key.color== 2}" v-for="(key, i) in item.buckets"
                    :key="i">{{key.doc_count == 0 ? '' : key.doc_count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="page-box">
          <pages :pageId.sync="pageId" :pageAll.sync="pageAll" :pageSizeShow="pageSizeShow"></pages>
        </div>
      </div>
    </section>

    <!--商标列表弹窗-->
    <section @click="slotHideFn" v-if="layerShow == 'goods'" class="layer layer-goods">
      <header class="header">
        <div class="tit">商标品牌：{{layerData['item']['key']}}</div>
        <a href="javascript:void(0)" class="close" @click.stop="layerCloseFn();">
          <i class="icon icon-close"></i>
        </a>
      </header>
      <div class="layer-main">
        <aside class="cats-list">
          <div class="ovh">
            <span class="btn-btn" @click="layerGetGoodsFn(key.key)"
              :class="{red: key.color == 1, orange: key.color== 2, cur: key.key == layerData['size']}"
              v-for="(key, i) in layerData['item'].buckets" :key="i">{{key.key}}</span>
          </div>
          <dl>
            <dt class="color-type-title">标记说明：</dt>
            <dd class="color-type red">类别已覆盖</dd>
            <dd class="color-type orange">类别覆盖无效</dd>
            <dd class="color-type">类别未覆盖</dd>
          </dl>
        </aside>
        <div class="goods-show">
          <div class="tab-btn-box">
            <span btn class="tab-btn" :class="{cur: tabShow == 1}" @click="tabShow = 1">商标信息</span>
            <span btn class="tab-btn" :class="{cur: tabShow == 2}" @click="tabShow = 2">群组覆盖</span>
          </div>
          <div class="tab-box" v-show="tabShow == 1">
            <div class="goods-list-box">
              <header class="list-title">您的商标</header>
              <div v-show="leftLoading">
                <loading></loading>
              </div>
              <div class="scroll-box" v-if="!leftLoading && !leftListError">
                <div class="list-box" v-for="(item, index) in goodsDataMy" :key="index">
                  <div class="goods-info">
                    <div class="img-box">
                      <img class="img" :src="item._source.img" @error="imgErrFn" alt="">
                    </div>
                    <dl class="goods">
                      <dt class="goods-name">
                        <router-link class="router-link"
                          :to="{path: '/search/detail', query:{brand_id: item._source.uuid}}" target="_blank">
                          {{item._source.name_text}}</router-link>
                      </dt>
                      <dd class="goods-type">{{item._source.status}}</dd>
                      <dd class="goods-item" @click.stop="showAllFn($event, item._source.id)" btn>群组/小项<em
                          class="icon icon-wendangzhongxin"></em></dd>
                    </dl>
                  </div>
                  <div class="other-info"><span class="title">注册号：</span>{{item._source.id}}</div>
                  <div class="other-info"><span class="title">申请时间：</span>{{item._source.appAt}}</div>
                  <div class="other-info"><span class="title">代理机构：</span>{{item._source.agent}}</div>
                </div>
              </div>
              <dl class="common-search-error" v-show="leftListError && !leftLoading">
                <dt class="icon icon-empty1"></dt>
                <dd class="search-txt">没有相关数据</dd>
              </dl>
            </div>
            <div class="goods-list-box">
              <header class="list-title">近似商标</header>
              <div v-show="rightLoading">
                <loading></loading>
              </div>
              <div class="scroll-box" v-if="!rightLoading && !rightListError">
                <div class="list-box big" v-for="(item, index) in goodsDataOther" :key="index">
                  <div class="goods-info">
                    <div class="img-box">
                      <img class="img" src="" alt="">
                    </div>
                    <dl class="goods">
                      <dt class="goods-name">
                        <router-link class="router-link"
                          :to="{path: '/search/detail', query:{brand_id: item._source.uuid}}" target="_blank">
                          {{item._source.name_text}}</router-link>
                      </dt>
                      <dd class="goods-type">{{item._source.status}}</dd>
                      <dd class="goods-item" @click.stop="showAllFn($event, item._source.id)" btn>群组/小项<em
                          class="icon icon-wendangzhongxin"></em></dd>
                      <dd class="other-info"><span class="title">注册号：</span>{{item._source.id}}</dd>
                      <dd class="other-info"><span class="title">申请时间：</span>{{item._source.appAt}}</dd>
                      <dd class="other-info"><span class="title">申请人：</span>{{item._source.owner}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="page-box">
                  <pages-easy :pageId.sync="layerPageId" :pageAll.sync="layerPageAll"></pages-easy>
                </div>
              </div>
              <dl class="common-search-error" v-show="rightListError && !rightLoading">
                <dt class="icon icon-empty1"></dt>
                <dd class="search-txt">没有相关数据</dd>
              </dl>
            </div>
          </div>
          <div class="tab-box" v-show="tabShow == 2">
            <div class="table-list">
              <div class="item-box " v-for="(item, index) in goodsItem" :key="index"
                :class="{gray: item.over == '未覆盖', red: item.over == '无效覆盖', green: item.over == '已覆盖' }">
                <span class="size">{{item.qid}}</span>
                <span class="name">{{item.name}}</span>
                <span class="type ">{{item.over}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--/商标列表弹窗-->

    <!--商标群组弹窗-->
    <fixed-slot-action ref="slotAction">
      <div class="item-show">
        <div class="slot-loading" v-show="fixedLoading">
          <loading></loading>
        </div>
        <div v-show="!fixedLoading">
          <div class="left">
            <header class="title">群组</header>
            <dl class="common-search-error" v-show="fixedGroup.length == 0">
              <dt class="icon icon-empty1"></dt>
              <dd class="search-txt">没有相关数据</dd>
            </dl>
            <div class="scroll-box">
              <p class="item-list " v-for="(item, index) in fixedGroup" :key="index" :class="{red: item.isOver == 1}">
                <em class="num">{{item.qid}}</em>{{item.name}}
              </p>
            </div>
          </div>
          <div class="right">
            <header class="title">小项</header>
            <dl class="common-search-error" v-show="fixedItem.length == 0">
              <dt class="icon icon-empty1"></dt>
              <dd class="search-txt">没有相关数据</dd>
            </dl>
            <div class="scroll-box">
              <p class="item-list" v-for="(item, index) in fixedItem" :key="index">{{item}}</p>
            </div>
          </div>
        </div>
      </div>
    </fixed-slot-action>
    <!--/商标群组弹窗-->

    <div class="mask" v-show="layerShow != '' " @click="slotHideFn"></div>
  </article>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped >
@import '@/assets/sass/base.scss';

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

.page-header {
  @include flex(both, center);
  padding-top: 20px;
  margin-bottom: 10px;
  .all-size {
    font-weight: bold;
    color: #333;
    .size {
      font-weight: bold;
      color: $red2;
    }
  }
  .type-color {
    vertical-align: top;
    display: inline-block;
    font-size: 12px;
    margin-right: 15px;
    line-height: $inpsmall;
    color: $txtgray2;
    &.red {
      &:before {
        @extend .radius;
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 15px;
        height: 15px;
        margin-right: 10px;
        background-color: $red2;
      }
    }
    &.orange {
      &:before {
        @extend .radius;
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 15px;
        height: 15px;
        margin-right: 10px;
        background-color: $orange;
      }
    }
  }
}

.cats-box {
  overflow: hidden;
  width: 100%;
  .page-box {
    width: 100%;
    margin-top: 10px;
    padding-bottom: 20px;
  }
  .box-title {
    border-bottom: 1px solid $border;
    background-color: $bg;
  }
  .aside-box {
    box-sizing: border-box;
    float: left;
    width: 170px;
    font-size: 12px;
    line-height: $inpbig;
    border-right: 1px solid $border;
    border-bottom: 1px solid $border;
    .box-title {
      padding-left: 10px;
    }
    .brand-list {
      @include flex(both, center);
      box-sizing: border-box;
      font-weight: bold;
      width: 170px;
      padding: 10px;
      font-size: 12px;
      line-height: 19px;
      border-bottom: 1px solid $border;
      .name {
        @extend %hold;
        width: 124px;
      }
      .icon-sousuo1 {
        font-weight: bold;
        color: $inpcol;
      }
      &:last-of-type {
        border: none;
      }
    }
  }
  .table-list {
    position: relative;
    overflow: hidden;
    float: left;
    box-sizing: border-box;
    width: calc(100% - 170px);
    border-bottom: 1px solid $border;
    .scroll-box {
      overflow-x: overlay;
      .box {
        width: $inpbig * 45 + 1px;
      }
    }
    .cats-list {
      box-sizing: border-box;
      text-align: center;
      overflow: hidden;
      color: #333;
      border-right: 1px solid $border;
    }
    .brand-cats-type {
      overflow: hidden;
      .btn-btn {
        border-bottom: 1px solid $border;
        &:hover {
          background-color: $bg;
        }
        &.red {
          background-color: $red2;
          color: $white;
          &:hover {
            background-color: $red2hoverbg;
          }
        }
        &.orange {
          background-color: $orange;
          color: $white;
          &:hover {
            background-color: $orangehover;
          }
        }
      }
      &:last-of-type {
        .btn-btn {
          border-bottom: none;
        }
      }
    }
  }

  .btn-btn {
    display: block;
    float: left;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    height: $inpbig;
    line-height: $inpbig;
    width: $inpbig;
    font-size: 12px;
    border-right: 1px solid $border;
    &:last-of-type {
      border-right: none;
    }
  }
  .icon-right {
    position: absolute;
    cursor: pointer;
    font-size: 24px;
    right: 0;
    top: 0;
    width: 20px;
    border-left: 1px solid $border;
    background-color: $bg;
    border-right: none;
    &:hover {
      background-color: $txtgray2;
    }
  }
  .icon-left {
    position: absolute;
    cursor: pointer;
    font-size: 24px;
    left: 0;
    top: 0;
    width: 20px;
    border-left: 1px solid $border;
    background-color: $bg;
    border-right: none;
    transform: rotate(180deg);
    &:hover {
      background-color: $txtgray2;
    }
  }
}

.layer-goods {
  padding: 0;
  .tit {
    padding: 0;
    padding-left: 20px;
    line-height: $inpbig - 1px;
  }
  .close {
    top: 10px;
  }
  .layer-main {
    overflow: hidden;
    height: 500px;
    width: 760px;
  }
  .cats-list {
    overflow: hidden;
    float: left;
    width: 150px;
    height: 100%;
    border-right: 1px solid $border;
    background-color: $bg;
    .btn-btn {
      cursor: pointer;
      float: left;
      display: block;
      box-sizing: border-box;
      text-align: center;
      height: 30px;
      line-height: 30px;
      width: 30px;
      border-right: 1px solid $border;
      border-bottom: 1px solid $border;
      background-color: $bg;
      color: $txtgray2;
      &:nth-of-type(5n) {
        border-right: none;
      }
      &.red {
        background-color: $white;
        color: $red2;
      }
      &.orange {
        background-color: $white;
        color: $orange;
      }
      &:hover,
      &.cur {
        background-color: $red2;
        color: $white;
      }
    }
    dl {
      margin-top: 10px;
      margin-left: 10px;
    }
    .color-type-title {
      font-size: 12px;
      margin-bottom: 15px;
      color: #333;
    }
    .color-type {
      font-size: 12px;
      line-height: 20px;
      &:before {
        @extend .radius;
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 15px;
        height: 15px;
        margin-right: 10px;
        background-color: $inpcol;
      }
      &.red:before {
        vertical-align: middle;
        background-color: $red2;
      }
      &.orange:before {
        vertical-align: middle;
        background-color: $orange;
      }
    }
  }
  .goods-show {
    float: left;
    width: calc(760px - 151px);
    height: 100%;
    .tab-btn-box {
      overflow: hidden;
      position: relative;
      width: 100%;
      height: $inpbig;
      background-color: $bg;
      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        z-index: 2;
        background-color: $border;
      }
      .tab-btn {
        float: left;
        text-align: center;
        position: relative;
        line-height: $inpbig;
        height: $inpbig;
        width: 80px;
        font-size: 14px;
        color: #333;
        background-color: $bg;
        border-right: 1px solid $border;
        &.cur {
          z-index: 5;
          background: $white;
        }
        &:hover {
          background: $white;
        }
      }
    }
  }
  .tab-box {
    overflow: hidden;
  }
  .goods-list-box {
    float: left;
    box-sizing: border-box;
    height: 460px;
    width: 230px;
    border-right: 1px solid $border;
    &:last-of-type {
      width: 378px;
      border-right: none;
    }
    .list-title {
      box-sizing: border-box;
      line-height: 29px;
      padding-left: 15px;
      font-size: 12px;
      border-bottom: 1px solid $border;
    }
    .scroll-box {
      overflow-y: overlay;
      height: 430px;
    }
  }
  .list-box {
    padding-top: 15px;
    padding-left: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid $border;
    .img-box {
      position: relative;
      height: 78px;
      width: 78px;
      margin-bottom: 10px;
      .img {
        display: block;
        width: 100%;
        height: 100%;
      }
      &:before {
        content: '';
        display: block;
        position: absolute;
        text-align: center;
        bottom: -20px;
        width: 100%;
        left: 0;
        font-size: 12px;
      }
      &.red:before {
        content: '完全相同';
        background-color: $red2;
      }
      &.orange:before {
        content: '高度近似';
        background-color: $orange;
      }
    }
    .goods-info {
      overflow: hidden;
      .img-box {
        float: left;
      }
      .goods {
        float: left;
        width: 100px;
        margin-left: 10px;
      }
      .goods-name {
        .router-link {
          font-weight: bold;
          line-height: 20px;
          font-size: 14px;
          color: #333;
          &:hover {
            color: $red2;
          }
        }
      }
      .goods-type {
        font-size: 12px;
        line-height: 20px;
        color: $red2;
      }
      .goods-item {
        font-size: 12px;
        line-height: 20px;
        color: $blue;
        &:hover {
          color: $bluehover;
        }
      }
    }
    .other-info {
      font-size: 12px;
      line-height: 20px;
      color: #333;
      .title {
        color: $inpcol;
      }
    }
    &.big {
      // .goods-info{
      .goods {
        width: 260px;
      }
      // }
    }
  }
  .page-box {
    padding: 10px;
  }
  .table-list {
    overflow-y: overlay;
    height: 460px;
    .item-box {
      overflow: hidden;
      box-sizing: border-box;
      vertical-align: top;
      font-size: 14px;
      width: 100%;
      padding: 0 10px;
      border-bottom: 1px solid $border;
      background-color: $white;
      .size {
        vertical-align: top;
        line-height: 40px;
      }
      .name {
        display: inline-block;
        margin-left: 10px;
        width: 480px;
        line-height: 20px;
        padding: 10px 0;
        color: #333;
      }
      .type {
        float: right;
        line-height: 40px;
        color: $green;
      }
      &.red {
        .type {
          color: $red1;
        }
      }
      &.gray {
        .name,
        .size,
        .type {
          color: $inpcol;
        }
      }
    }
  }
}

.item-show {
  @extend .radius;
  @extend .shadow;
  overflow: hidden;
  width: 420px;
  height: 280px;
  background-color: $white;
  .title {
    border-bottom: 1px solid $border;
    line-height: 29px;
    padding-left: 10px;
  }
  .slot-loading {
    padding-top: 30px;
  }
  .scroll-box {
    overflow-y: overlay;
    padding-left: 10px;
    padding-top: 10px;
    height: 230px;
  }
  .item-list {
    line-height: 20px;
    font-size: 12px;
    color: #333;
    .num {
      margin-right: 10px;
    }
  }
  .left {
    float: left;
    box-sizing: border-box;
    height: 260px;
    width: 210px;
    border-right: 1px solid $border;
    .item-list {
      color: $inpcol;
      &.red {
        color: $red2;
      }
    }
  }
  .right {
    float: left;
    height: 260px;
    width: 210px;
    border-right: none;
  }
}
</style>
