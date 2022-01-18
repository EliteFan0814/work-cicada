<template>
  <div class="menu_box">
    <ul>
      <li :class="{cur:fMenuIndex==0}"><router-link @click.native="$cnzzFn('查询', '点击', '商标查询')"  to="/search"><i class="icon icon-sousuo1"></i>商标查询</router-link></li>
      <li :class="{cur:fMenuIndex==1}"><router-link @click.native="$cnzzFn('查询', '点击', '公告查询')"  to="/search/notice"><i class="icon icon-gonggao"></i>公告查询</router-link></li>
      <li :class="{cur:fMenuIndex==4}"><router-link @click.native="$cnzzFn('查询', '点击', '续展/宽展查询')" to="/search/keep"><i class="icon icon-shijianxuanzeqi"></i>续展/宽展查询</router-link></li>
      <li :class="{cur:fMenuIndex==2}"><router-link @click.native="$cnzzFn('查询', '点击', '法律文书查询')" to="/search/document"><i class="icon icon-wendang"></i>法律文书查询</router-link></li>
      <li :class="{cur:fMenuIndex==3}"><router-link @click.native="$cnzzFn('查询', '点击', '分类表查询')" to="/search/kind"><i class="icon icon-guoji"></i>分类表查询</router-link></li>
      <!-- <li :class="{cur:fMenuIndex==5,line:true}"><router-link @click.native="$cnzzFn('查询', '点击', '客户商标档案查询')" to="/search/client"><i class="icon icon-chengshijinglitianch"></i>客户商标档案查询</router-link></li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props:['fMenuIndex'],
  data () {
    return {
     
    }
  }
}
</script>
<style scoped  lang="scss">
@import "@/assets/sass/base.scss";

.menu_box{
  box-sizing: border-box;
  width:170px;padding-top:0px;left:70px;top:0;height: 100%;background:#fff;position: fixed; padding-top: 15px;
  border-right:1px solid $border;
  li{
    line-height: 40px;
    &.line{
      border-bottom: 1px solid #e9e9e9;
    }
    &.cur{
        background: #ECEEF2;
      }
    a{
      display: block;padding:0 15px;
      .icon{color: #FB717E;margin-right: 8px;vertical-align: top;}
      &:hover{
        background: #F0F2F6;
      }
    }
  }
  .common-new{
    margin-left: 6px;
  }
}
</style>
