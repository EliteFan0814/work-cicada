<template>
  <div class="menu_box">
    <ul>
      <li :class="{cur:fMenuIndex==0}">
        <router-link to="/group/frame"><i class="icon icon-shouye"></i>团队首页</router-link>
      </li>
      <li :class="{cur:fMenuIndex==1}">
        <router-link to="/group/group"><i class="icon icon-tubiao-liucheng"></i>成员管理</router-link>
      </li>
      <li :class="{cur:fMenuIndex==2}">
        <router-link to="/group/role"><i class="icon icon-xitongguanliyuan"></i>角色管理</router-link>
      </li>
      <li :class="{cur:fMenuIndex==3,line:true}">
        <router-link to="/group/setup"><i class="icon icon-shezhi"></i>团队设置</router-link>
      </li>
      <!--<li :class="{cur:fMenuIndex==4}"><router-link to=""><i class="icon icon-yingyong"></i>团队应用管理</router-link></li>-->
    </ul>
  </div>
</template>

<script>
export default {
  props: ['fMenuIndex'],
  data() {
    return {}
  }
}
</script>
<style scoped  lang="scss">
.menu_box {
  width: 190px;
  padding-top: 69px;
  left: 70px;
  top: 0;
  height: 100%;
  background: #fff;
  position: fixed;
  li {
    line-height: 40px;
    &.line {
      border-bottom: 1px solid #e9e9e9;
    }
    &.cur {
      background: #eceef2;
    }
    a {
      display: block;
      padding: 0 15px;
      .icon {
        color: #fb717e;
        margin-right: 8px;
        vertical-align: top;
      }
      &:hover {
        background: #f0f2f6;
      }
    }
  }
}
</style>
