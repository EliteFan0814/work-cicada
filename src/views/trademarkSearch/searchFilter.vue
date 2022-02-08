<template>
  <div class="base-filter-form">
    <div class="top common">
      <!-- <SearchFilterItem title="申请商标" :show="true" :dataList="dataList"></SearchFilterItem> -->
      <SearchFilterItem title="国际分类" :show="true" :dataList="category"></SearchFilterItem>
      <SearchFilterItem title="有效状态" :dataList="status"></SearchFilterItem>
      <SearchFilterItem title="商标持有人" :dataList="status"></SearchFilterItem>
      <SearchFilterItem title="代理机构"></SearchFilterItem>
    </div>
    <!-- <div class="btm">
      <div class="left item common">ddd</div>
      <div class="right item common">ddd</div>
    </div> -->
  </div>
</template>

<script>
import SearchFilterItem from './searchFilterItem.vue'
export default {
  name: 'SearchFilter',
  components: { SearchFilterItem },
  data() {
    return {
      category: [
        { label: '01', value: 1, selected: false },
        { label: '02', value: 2, selected: false },
        { label: '03', value: 3, selected: false },
        { label: '04', value: 4, selected: false },
        { label: '05', value: 5, selected: false },
        { label: '06', value: 6, selected: false },
        { label: '07', value: 7, selected: false },
        { label: '08', value: 8, selected: false },
        { label: '09', value: 9, selected: false },
        { label: '10', value: 10, selected: false },
        { label: '11', value: 11, selected: false },
        { label: '12', value: 12, selected: false },
        { label: '13', value: 13, selected: false },
        { label: '14', value: 14, selected: false },
        { label: '15', value: 15, selected: false },
        { label: '16', value: 16, selected: false },
        { label: '17', value: 17, selected: false },
        { label: '18', value: 18, selected: false },
        { label: '19', value: 19, selected: false },
        { label: '20', value: 20, selected: false },
        { label: '21', value: 21, selected: false },
        { label: '22', value: 22, selected: false },
        { label: '23', value: 23, selected: false },
        { label: '24', value: 24, selected: false },
        { label: '25', value: 25, selected: false },
        { label: '26', value: 26, selected: false },
        { label: '27', value: 27, selected: false },
        { label: '28', value: 28, selected: false },
        { label: '29', value: 29, selected: false },
        { label: '30', value: 30, selected: false },
        { label: '31', value: 31, selected: false },
        { label: '32', value: 32, selected: false },
        { label: '33', value: 33, selected: false },
        { label: '34', value: 34, selected: false },
        { label: '35', value: 35, selected: false },
        { label: '36', value: 36, selected: false },
        { label: '37', value: 37, selected: false },
        { label: '38', value: 38, selected: false },
        { label: '39', value: 39, selected: false },
        { label: '40', value: 40, selected: false },
        { label: '41', value: 41, selected: false },
        { label: '42', value: 42, selected: false },
        { label: '43', value: 43, selected: false },
        { label: '44', value: 44, selected: false },
        { label: '45', value: 45, selected: false }
      ],
      status: [
        { label: '有效注册', value: 1, selected: false },
        { label: '申请中', value: 2, selected: false },
        { label: '商标无效', value: 3, selected: false }
      ],
      dataList2: [{ label: '百岁鱼', value: 454, selected: false }]
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

  // .btm {
  //   display: flex;
  //   justify-content: space-between;
  //   .item {
  //     flex: 1;
  //     border: 1px solid red;
  //   }
  // }
}
</style>
