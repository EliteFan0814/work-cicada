<template>
  <div class="base-upimg">
    <div class="up-wrap flex-sc">
      <img v-for="item in imgList" :key="item" :src="item" alt="">
      <div class="btn">
        <input ref="upinput" type="file" accept="image/*" style="display:none;" @change="handleChange">
        <span @click="handleUpImg">上传图片</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseUpImg',
  data() {
    return {
      imgList: []
    }
  },
  methods: {
    handleUpImg() {
      this.$refs.upinput.click()
    },
    async handleChange(e) {
      const files = e.target.files
      const imgUrl = await this.$getImgUrl(files[0])
      if (imgUrl) {
        this.imgList = [imgUrl]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.base-upimg {
  .up-wrap {
    flex-wrap: wrap;
    img {
      max-width: 100px;
      max-height: 100px;
      padding-right: 10px;
    }
    .btn {
      display: inline-block;
      color: #fff;
      background-color: #3168d9;
      padding: 3px 5px;
      border-radius: 15px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background-color: #4f84ec;
      }
    }
  }
}
</style>
