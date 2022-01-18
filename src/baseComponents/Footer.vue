<template>
  <footer class="footer">
    <div class="content">
      <div class="left">
        <img src="@/assets/imgs/footer-logo.png">
      </div>
      <div class="right">
        <div class="r-item item">
          <span>关于中细软</span>
          <span>法律声明</span>
        </div>

        <div class="qr-wrap">
          <div class="item">
            <span>公众号</span>
            <span>小程序</span>
          </div>
          <div class="img-wrap">
            <img src="@/assets/imgs/minip.png">
          </div>
        </div>
      </div>
    </div>
    <div class="info">中细软 京ICPB备15031491号-2</div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.footer {
  // position: fixed;
  width: 100%;
  // min-width: 1200px;
  // bottom: 0;
  // left: 0;
  height: 260px;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    align-items: center;
    padding: 0 100px 25px;
    border-bottom: solid 1px #4c4c4c;
    margin-bottom: 26px;
    .left {
      border-right: solid 1px #4c4c4c;
      img {
        margin-right: 133px;
        width: 204px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      padding-left: 150px;
      .item {
        font-size: 14px;
        line-height: 24px;
        color: #999999;
        span {
          display: block;
          &:hover {
            cursor: pointer;
            color: #cccccc;
          }
        }
      }
      .r-item {
        padding-right: 77px;
      }
      .qr-wrap {
        display: flex;
        align-items: center;
        .img-wrap {
          margin-left: 16px;
          padding: 5px;
          background-color: #fff;
          img {
            width: 110px;
            display: block;
          }
        }
      }
    }
  }
  .info {
    font-size: 12px;
    line-height: 26px;
    letter-spacing: 0px;
    color: #999999;
  }
}
</style>
