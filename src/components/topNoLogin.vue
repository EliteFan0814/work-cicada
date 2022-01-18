<template>
  <div class="top_box clearfix">
    <div class="logo_box" ><router-link to="/"><img src="../assets/img/logo.png" class="logo" />细软图思</router-link><span class="txt">{{titleName}}</span></div>
  </div>
</template>

<script>

export default {
  props:['titleName'],   
}
</script>
<style scoped  lang="scss">

.top_box{
  height: 50px;box-shadow: 0 2px 4px #E1E6EF;padding:0 40px 0 10px;background:#fff;position: relative;z-index: 50;
  position: relative;
}
.nav_box,.logo_box{
  .logo{width:34px;height: 34px;margin-top:8px;vertical-align: top}
}
.logo_box{
  line-height: 50px;font-size: 24px;
  .txt{
    display: inline-block;line-height: 34px;border-left:1px solid #e9e9e9;font-size: 20px;font-weight: bold;
    margin-left:30px;padding-left:15px;
  }
}

</style>
