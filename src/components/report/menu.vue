<template>
  <div class="menu-list">
    <router-link class="menu-box " :to="'/report/report?id='+id" :class="{cur:menuIndex==0}"><i
        class="icon icon-leidatu"></i>报告总览</router-link>
    <router-link class="menu-box " :to="'/report/wait?id='+id" :class="{cur:menuIndex==1}"><i
        class="icon icon-cuiban"></i>风险分析</router-link>
    <router-link class="menu-box" :to="'/report/file/owner?name='+name+'&id='+id" :class="{cur:menuIndex==2}"><i
        class="icon icon-renyuanmingpian"></i>申请人档案</router-link>
    <router-link class="menu-box" :to="'/report/file/detail_brand?id='+id" :class="{cur:menuIndex==3}"><i
        class="icon icon-loudou"></i>品牌分析</router-link>
    <router-link class="menu-box" :to="'/report/file/brand?id='+id" :class="{cur:menuIndex==4}"><i
        class="icon icon-shangbiao"></i>商标档案</router-link>
    <router-link class="menu-box" :to="'/report/file/agent?id='+id" :class="{cur:menuIndex==5}"><i
        class="icon icon-xitongguanliyuan"></i>代理机构档案</router-link>
  </div>
</template>

<script>
export default {
  props: ['menuIndex', 'id', 'name'],
  data() {
    return {}
  }
}
</script>
<style scoped  lang="scss">
@import '@/assets/sass/base.scss';

.menu-list {
  @include flex(left, center);
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: $red2;
    bottom: 0;
    z-index: 3;
  }
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
    .icon {
      color: $red2;
    }
    & + .menu-box {
      border-left: none;
    }
  }
}
</style>
