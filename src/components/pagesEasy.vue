<template>
  <div v-if="pageAll > 1" class="module_page">
    <span v-if="pageId >= 3 "  @click="pageGotoFn(1)" class="page_number btn_border">1</span>
    <span  v-if="pageId > 3" class="page_text">...</span>
    <span v-if="pageId > 1 && pageAll >= 2" class="page_number btn_border" @click="pageGotoFn(pageId - 1)">{{pageId - 1}}</span>
    <span class="cur page_number btn_border" @click="pageGotoFn(pageId)">{{pageId}}</span>
    <span v-if="pageId < pageAll" class="page_number btn_border" @click="pageGotoFn(pageId + 1)">{{pageId + 1}}</span>
    <span v-if="pageId == 1 && pageAll >= 3" @click="pageGotoFn(3)" class="page_number btn_border">3</span>
    <span  v-if="pageId < pageAll - 2  && pageAll > 4" class="page_text">...</span>
    <span v-if="pageId < pageAll - 1 && pageAll > 3" class="page_number btn_border" @click="pageGotoFn(pageAll)">{{pageAll}}</span>
    <span v-show="inputShow">
      <input  type="number" v-model="pageInp" @keyup.enter="pageInpFn()" class="inp_text to_number">
      <span  class="page_ok btn_border icon-yes"  @click="pageInpFn()"></span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    pageId: {
      default: 1,
      type: Number
    },
    pageAll: {
      default: 0,
      type: Number
    },
    inputShow: {
      default: false,
      type: Boolean
    },
  },
  data () {
    return {
      // 分页
      pageInp: '',
    }
  },
  methods: {
    // 分页
    pageGotoFn (index) {
      let i = parseInt(index);
      if (i < 1) {
        i = 1;
      } else if (i > this.pageAll) {
        i = this.pageAll;
      }
      this.$emit('update:pageId', i);
      this.$parent.pageEasyFn();
    },
    pageInpFn () {
      let i ;
      if (this.pageInp > this.pageAll) {
        i = this.pageAll
      } else if (this.pageInp < 1) {
        i = 1
      } else {
        i = parseInt(this.pageInp)
      }
      this.$emit('update:pageId', i);
      this.$parent.pageEasyFn();

    },
  }
}
</script>


<style lang="scss" scoped >
@import "@/assets/sass/base.scss";

.module_page{
  @include flex(right);
  @extend .clearfix;
  .page-size{
    @extend .radius;
    text-align: center; box-sizing: border-box;
    height:$inpsmall; line-height: $inpsmall;  margin-right: 20px; width:100px;
    background-color: $white; color:$inpcol; border:1px solid $inpbg; 
  }
  span.btn_border{
    float: left; cursor: pointer;
    line-height: 28px; margin-right: 6px;
    &:hover, &.cur{
      background: $red2; color:$white;
    }
  }
  .page_first{
    width: 54px; line-height: 28px;
  }
  .page_number{
    @extend .radius;
    display: inline-block; 
    padding:0 10px;
    color:$txtgray1;
  }
  .page_text{
    float: left;
    line-height: 30px;  margin-right: 6px; 
    color:$gray;
  }
  .to_number{
    @extend .radius;
    text-align: center; float: left;
    height:$inpsmall; line-height: $inpsmall; width: 40px;  margin-right: 6px; 
    color: #333; background-color: $bg;
    appearance: none !important; 
  }
  span.page_ok{
    @extend .radius;
    text-align: center;
    width: 30px; margin-right: 0;
    background-color: $red2; color:$white;
    &:hover{
      background-color: $red2hoverbg;
    }
  }
}

</style>
