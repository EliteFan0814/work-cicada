<template>
<div v-show="topShow" @click="backTopFn" class=" back-top icon icon-top-filling" btn></div>
</template>

<script>
export default {
  props: {
    backBox: {
      type: String,
      default: 'body'
    }
    
  },
  data () {
    return{
      topShow: false,
    }
  },
  mounted () {
    let that = this;
    if (this.backBox == 'body') {
      this.bodyScrollFn();
    } else {
      this.boxScrollFn();
    }
     // 返回顶部
  },
  methods: {
    bodyScrollFn () {
      let that = this;
      window.onscroll = () => {
        if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
          that.topShow = true;
        } else {
          that.topShow = false;
        }
      }
    },
    boxScrollFn () {
      let that = this;
      let box = document.querySelector(this.backBox)
      box.onscroll = () => {
        console.log(box)
        if (box.scrollTop > 400) {
          that.topShow = true;
        }  else {
          that.topShow = false;
        }
      }
    },
    //  返回顶部
    backTopFn() {
      if (this.backBox == 'body') {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return false;
      }
      let that = this;
      let box = document.querySelector(this.backBox);
      let size = box.scrollTop
      let moving = size / 50;
      let timer = setInterval(() => {
        size -= moving;
        box.scrollTop = size;
        if (size <= 0) {
          clearInterval(timer);
          timer = null
          that.topShow = false
        }
      }, 5);
    },
  }
}
</script>

<style lang="scss" scoped >
@import "@/assets/sass/base.scss";


.back-top{
  position: fixed; text-align: center;
  bottom:50px; right:30px; z-index:10; font-size: 30px; width:50px; height:50px; line-height: 50px; border-radius: 50%;
  transition:all .5s;
  color:$white; background-color: $txtgray2;
}
</style>