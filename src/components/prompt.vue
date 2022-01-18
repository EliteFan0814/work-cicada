<template>
<!--提示信息-->
  <div :class="{prompt:true,success:promptType=='success',err:promptType=='err',show:prompt!=''}">
    <p>
    {{showTxt}}
    </p>
  </div>
</template>

<script>
export default {
  props:['prompt','promptType'],   //promptType='success'  为成功提示颜色    promptType='err'为红色（错误提示）
  data () {
    return {
     name:'',
     showTxt: ''
    }
  },
  watch: {
    prompt () {
      if (this.prompt != '') {
        this.showTxt = this.prompt
      }
    }
  },
  methods:{

  }
}
</script>
<style scoped  lang="scss">
.prompt{
  box-sizing: border-box;
  width:200px;border-radius: 4px;top:90px;right:-210px;transition: right 1s;
  box-shadow:0px 0px 10px #E1E6EF;position: fixed;z-index: 200;background: #fff;text-align:center; 
  padding:15px 10px;
  p{
    line-height: 1.2;
  }
  &.show{
    right:40px;
  }
  &.success{
    border-left: 5px solid #4FCC79;color: #4FCC79;
  }
  &.err{
    border-left: 5px solid #FB717E;color: #FB717E;
  }
}
</style>
