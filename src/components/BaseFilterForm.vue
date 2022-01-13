<template>
  <div class="base-filter-form">
    <div class="top common">
      <BaseFilterItem title="申请商标" :show="true" :dataList="dataList"></BaseFilterItem>
      <BaseFilterItem title="申请类别" :show="false" :dataList="dataList2"></BaseFilterItem>
      <BaseFilterItem title="申请组群"></BaseFilterItem>
    </div>
    <div class="btm">
      <div class="left item common">ddd</div>
      <div class="right item common">ddd</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseFilterForm',
  data() {
    return {
      dataList: [
        { label: '百百岁鱼百岁鱼岁鱼', value: 1, selected: false },
        { label: '百岁百岁鱼百岁鱼鱼', value: 2, selected: false },
        { label: '百岁鱼', value: 3, selected: false },
        { label: '百百百岁鱼岁鱼百岁鱼百岁鱼岁鱼', value: 11, selected: false },
        { label: '百岁鱼', value: 21, selected: false },
        {
          label: '百岁百岁鱼百岁鱼百岁鱼百岁鱼百岁鱼百岁鱼鱼',
          value: 31,
          selected: false
        },
        { label: '百岁fsdfefefe鱼', value: 42, selected: false },
        { label: '百岁fdfeffd百岁鱼鱼', value: 34, selected: false },
        { label: '百岁百岁鱼百岁鱼百岁鱼鱼', value: 141, selected: false },
        { label: '百岁鱼', value: 241, selected: false },
        { label: '百岁百岁鱼百岁鱼百岁鱼鱼', value: 341, selected: false },
        { label: '百岁鱼', value: 44, selected: false },
        { label: '的分分分俄方', value: 444, selected: false },
        { label: '百岁鱼', value: 454, selected: false },
        { label: '百岁鱼', value: 464, selected: false },
        { label: '嘿嘿嘿', value: 474, selected: false },
        { label: '哈哈哈', value: 484, selected: false }
      ],
      dataList2: [
        { label: '百岁鱼', value: 454, selected: false },
        { label: '热锅吧', value: 464, selected: false },
        { label: '嘿嘿嘿', value: 474, selected: false },
        { label: '哈哈哈', value: 484, selected: false },
        { label: '大胃王', value: 485, selected: false },
        { label: '海底捞月', value: 486, selected: false },
        { label: '海底嘿嘿嘿捞月', value: 500, selected: false },
        { label: '海嘿嘿嘿热锅吧底捞月', value: 501, selected: false },
        { label: '海底捞热锅吧月', value: 502, selected: false },
        { label: '海底热锅吧热锅吧捞月', value: 503, selected: false },
        { label: '海底热锅吧捞月', value: 504, selected: false },
        { label: '海底热锅吧捞月', value: 506, selected: false },
        { label: '海底热锅吧捞月', value: 507, selected: false },
        { label: '海底热锅吧捞月', value: 508, selected: false },
        { label: '海底热锅吧捞月', value: 509, selected: false },
        { label: '海底热锅吧捞月', value: 510, selected: false },
        { label: '耨肉火嘿嘿嘿锅', value: 505, selected: false }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.base-filter-form {
  .common {
    padding: 6px 20px;
    background-color: #fafafa;
    border-radius: 2px;
  }

  .btm {
    display: flex;
    justify-content: space-between;
    .item {
      flex: 1;
      border: 1px solid red;
    }
  }
}
</style>
