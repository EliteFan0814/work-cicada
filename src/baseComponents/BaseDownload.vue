<template>
  <div class="base-download">
    <div class="item">
      <img v-if="exl" src="@/assets/imgs/exl-fill.png" class="use">
      <img v-else src="@/assets/imgs/exl.png" class="unuse">
    </div>
    <div class="item">
      <img v-if="doc" src="@/assets/imgs/doc-fill.png" class="use">
      <img v-else src="@/assets/imgs/doc.png" class="unuse">
    </div>
    <div class="item">
      <img v-if="pdf" src="@/assets/imgs/pdf-fill.png" class="use">
      <img v-else src="@/assets/imgs/pdf.png" class="unuse">
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseDownload',
  props: {
    exl: {
      type: Boolean,
      default: true
    },
    doc: {
      type: Boolean,
      default: true
    },
    pdf: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
.base-download {
  display: flex;
  padding: 5px;
  .item {
    padding: 0 5px;
    .use {
      cursor: pointer;
    }
    .unuse {
      cursor: not-allowed;
    }
  }
}
</style>
