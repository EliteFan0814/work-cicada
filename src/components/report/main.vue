<template>
  <div class="layer w570" v-if="mainShow">
    <a href="javascript:void(0)" class="close" @click="closeFn"><i class="icon icon-close"></i></a>
    <div class="tit">申请人主体</div>
    <div class="main_box clearfix">
        <div class="section1">
          <ul>
            <li :class="['pointer',{cur:index==i}]" @click="tabFn(index)" v-for="(item,index) of mainsList" :key="index">{{item.name}}</li>
          </ul>
        </div>
        <div class="section2">
          <ul>
            <li class="pointer" v-for="(item,index) of mainAddrsList" :key="index">{{item.addr}}</li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['mainShow','mainsList','mainAddrsList'],
  data () {
    return {
     i:0,
    }
  },
  methods:{
    closeFn(){
      this.$emit('closeFN',false)
    },
    tabFn(x){
      //切换申请人
      this.mainsList.map((i,index)=>{
        if(x==index){
          this.i = index
          if(i.addrs){
            let list = []
            for(let l in i.addrs){
              list.push({id:l,addr:i.addrs[l]})
            }
            this.$emit('addrListFn',list)
          }
        }
      })
    }
  }
}
</script>
<style scoped  lang="scss">

</style>
