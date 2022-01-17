<template>
  <div class="trademark-analyse">
    <div class="left">
      <div class="search-item">
        <div class="title">
          <img src="@/assets/imgs/people.png" alt="">
          <span>客户商标分析</span>
        </div>
        <div class="sub">可对客户已注册商标进行法律风险、续展/宽展、变更、品牌保护等分析，以及统计类别
          分布、周期注册情况与法律状态</div>
        <div class="search-wrap">
          <BaseSearch :classList="classList"></BaseSearch>
        </div>
      </div>
      <div class="search-item">
        <div class="title">
          <img src="@/assets/imgs/r.png" alt="">
          <span>客户注册风险分析</span>
        </div>
        <div class="sub">可对要注册的商标名称进行同名、近似风险分析，以及统计类别小项的覆盖情况</div>
        <div class="search-wrap">
          <BaseSearch :showClass="false" btnColor="#fd576a"></BaseSearch>
        </div>
      </div>
    </div>
    <div class="right">
      <BaseTableAnaly></BaseTableAnaly>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TrademarkAnalyse',
  data() {
    return {
      classList: [
        { label: '商标分类', value: 0 },
        { label: '商标类', value: 1 },
        { label: '商类', value: 2 }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.trademark-analyse {
  padding: 40px;
  display: flex;
  .left {
    flex-shrink: 0;
    min-width: 500px;
    width: 30%;
    .search-item {
      &:first-child {
        margin-bottom: 40px;
      }
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        font-weight: bold;
        img {
          width: 28px;
          margin-right: 10px;
        }
        span {
          font-size: 18px;
          letter-spacing: 0px;
          color: #3168d9;
        }
      }
      .sub {
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0px;
        color: #aaaaaa;
        margin-bottom: 20px;
      }
    }
  }
  .right {
    height: 200px;
    flex-grow: 1;
  }
}
</style>
