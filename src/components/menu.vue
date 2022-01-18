<template>
  <div class="menu_box">
    <ul>
      <li :class="{cur:menuIndex==0}"><router-link to="/team/new">加入新团队</router-link></li>
      <li :class="{cur:menuIndex==1}"><router-link to="/team/list">团队管理</router-link></li>
      <li :class="{cur:menuIndex==2}"><router-link to="/team/myreq">我的申请</router-link></li>
      <li :class="{cur:menuIndex==3}"><router-link to="/team/wait">待审批申请</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  props:['menuIndex'],
  data () {
    return {
     
    }
  }
}
</script>
<style scoped  lang="scss">
.menu_box{
  float: left;width:180px; 
  li{
    width:140px;height: 40px;line-height: 40px;box-sizing: border-box;border-radius:4px;cursor: pointer;
    a{
      display: block;padding:0 10px;
    }
    &:hover{
      background: #FEF3F4;
    }
    &.cur{
      background: #D9001B;
      a{
        color: #fff;
      }
    }
  }
}
</style>
