<template>
  <div v-show="alertShow" class="layer layer-alert">
    <header>
      <div class="tit">{{alertTitle}}</div>
      <a href="javascript:void(0)" class="close" @click="closeFn">
        <i class="icon icon-close"></i>
      </a>
    </header>
    <section class="main">
      <p class="info">{{alertMessage}}</p>
    </section>
    <footer class="footer">
      <span btn class="ok-btn" @click="closeFn">我知道了</span>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    alertMessage: {
      default: '',
      type: String
    },
    alertShow: {
      default: false,
      type: Boolean
    },
    alertTitle: {
      default: '',
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    closeFn() {
      this.$emit('update:alertShow', false)
    }
  }
}
</script>

<style lang="scss" scoped >
@import '@/assets/sass/base.scss';

.layer-alert {
  width: 420px;
  .main {
    padding: 10px 0 20px;
  }
  .info {
    line-height: 1.5;
  }
  .footer {
    @include flex(right, center);
    .ok-btn {
      @extend .radius;
      text-align: center;
      height: 36px;
      line-height: 36px;
      width: 80px;
      color: $white;
      background-color: $red1;
      &:hover {
        background-color: $red1hover;
      }
    }
  }
}
</style>
