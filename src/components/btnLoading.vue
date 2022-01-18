<template>
<div class="loading_circle_box">
  <div class="circle circle1">
      <span :style="{background: bg}" ></span>
      <span :style="{background: bg}" ></span>
      <span :style="{background: bg}" ></span>
      <span :style="{background: bg}" ></span>
  </div>
  <div class="circle circle2">
      <span :style="{background: bg}" ></span>
      <span :style="{background: bg}" ></span>
      <span :style="{background: bg}" ></span>
      <span :style="{background: bg}" ></span>
  </div>
  <div class="circle circle3">
      <span :style="{background: bg}" ></span>
      <span :style="{background: bg}" ></span>
      <span :style="{background: bg}" ></span>
      <span :style="{background: bg}" ></span>
  </div>
</div>
</template>

<script>
export default {
  name: 'loadingBtn',
  props: {
    bg: {
      default: '#fff',
    }
  }
}
</script>

<style lang="scss" scoped >
/*************动态loading******************/
.loading_circle_box{
  display: inline-block;vertical-align: middle;
 width:20px; height:20px;position: relative;
 .circle{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
.circle span{
  width:6px;
  height:6px;
  display:inline-block;
  background:#fff;
  border-radius: 100%;
  position:absolute;
  -webkit-animation: mycircle 1.2s infinite ease-in-out;
  animation: mycircle 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode:both;
  animation-fill-mode:both;
}
.circle2{
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}
.circle3{
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
.circle>span:nth-child(1){
  top:0;
  left:0;
}
.circle>span:nth-child(2){
  top:0;
  right:0;
}
.circle>span:nth-child(3){
  right:0;
  bottom:0;
}
.circle>span:nth-child(4){
  left:0;
  bottom:0;
}
.circle2 >span:nth-child(1){
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.circle3 >span:nth-child(1){
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
.circle1 >span:nth-child(2){
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.circle2 >span:nth-child(2){
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
.circle3 >span:nth-child(2){
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
.circle1 >span:nth-child(3){
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
.circle2 >span:nth-child(3){
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
.circle3 >span:nth-child(3){
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.circle1 >span:nth-child(4){
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
.circle2 >span:nth-child(4){
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.circle3 >span:nth-child(4){
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}
@-webkit-keyframes mycircle{
  0%{transform:scale(0.0);}
  40%{transform:scale(1.0);}
  80%{transform:scale(0.0);}
  100%{transform:scale(0.0);}
}
@keyframes mycircle{
  0%{transform:scale(0.0);}
  40%{transform:scale(1.0);}
  80%{transform:scale(0.0);}
  100%{transform:scale(0.0);}
}
}
</style>