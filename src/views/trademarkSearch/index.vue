<template>
  <div v-loading="loading" class="trademark-search">
    <div class="top-search">
      <div class="left-input">
        <div class="class-wrap">
          <BaseSearchClass @selectClass="handleClass"></BaseSearchClass>
        </div>
        <BaseInput width="90%" icon="search" @search="handleSearch" />
      </div>
      <div class="right-key-list">
        <BaseSearchList :searchKey="searchKey.keyword"></BaseSearchList>
      </div>
    </div>
    <div class="content">
      <div class="left-wheel">
        <!-- <BaseWheel></BaseWheel> -->
      </div>
      <div class="right-content">
        <div class="search-detail">
          <div class="detail-top">
            <div class="common">
              <SearchFilterItem title="国际分类" :show="true" :dataList="category" @changeFilter="changeFilter">
              </SearchFilterItem>
              <SearchFilterItem title="有效状态" :dataList="status" @changeFilter="changeFilter"></SearchFilterItem>
              <SearchFilterItem title="商标持有人" :dataList="ownerList" @changeFilter="changeFilter"></SearchFilterItem>
              <SearchFilterItem title="代理机构" :dataList="agentList" @changeFilter="changeFilter"></SearchFilterItem>
            </div>
            <!-- <searchFilter></searchFilter> -->
          </div>
          <!-- <div class="detail-btm">
            <div class="detail-btm-l">
              <searchFilter></searchFilter>
            </div>
            <div class="detail-btm-r">
              <searchFilter></searchFilter>
            </div>
          </div> -->
        </div>
        <div class="table">
          <BaseTable :tableData="tableData" :total="total" :pageInfo="searchKey" @pageChange="pageChange"></BaseTable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import searchFilter from './searchFilter.vue'
import SearchFilterItem from './searchFilterItem.vue'

import apiSearch from '@/api/search'
export default {
  name: 'TrademarkSearch',
  components: { SearchFilterItem },
  data() {
    return {
      loading: false,
      searchKey: {
        keyword: '',
        page: 1,
        size: 10,
        category: '',
        status: '',
        owner: '',
        agent: ''
      },
      total: 0,
      tableData: [],
      // 搜索类
      searchClass: 'name',
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
      ownerList: [],
      agentList: []
    }
  },
  methods: {
    pageChange(info) {
      this.searchKey = { ...this.searchKey, ...info }
      this.apiSearch()
    },
    // 处理搜索
    handleSearch(value) {
      this.searchKey.keyword = value
      this.searchKey.page = 1
      this.apiSearch()
    },
    // 搜索
    apiSearch() {
      this.loading = true
      apiSearch
        .getInfoByName(this.searchKey, this.searchClass)
        .then((res) => {
          this.tableData = res.data
          this.ownerList = res.data.map((item) => {
            if (this.searchKey.owner.split('|').includes(item.owner)) {
              return { label: item.owner, value: item.owner, selected: true }
            } else {
              return { label: item.owner, value: item.owner, selected: false }
            }
          })
          this.agentList = res.data.map((item) => {
            if (this.searchKey.agent.split('|').includes(item.agent)) {
              return { label: item.agent, value: item.agent, selected: true }
            } else {
              return { label: item.agent, value: item.agent, selected: false }
            }
          })
          // this.category.map((item) => {
          //   if (res.categories.includes(item.value)) {
          //     item.selected = true
          //   } else {
          //     item.selected = false
          //   }
          // })
          this.total = res.total
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 处理搜索类
    handleClass(value) {
      this.searchClass = value
    },
    //
    changeFilter() {
      const tempCategory = []
      this.category.map((item) => {
        if (item.selected) {
          tempCategory.push(item.value)
        }
      })
      const tempStatus = []
      this.status.map((item) => {
        if (item.selected) {
          tempStatus.push(item.value)
        }
      })
      const tempOwnerList = []
      this.ownerList.map((item) => {
        if (item.selected) {
          tempOwnerList.push(item.value)
        }
      })
      const tempAgentList = []
      this.agentList.map((item) => {
        if (item.selected) {
          tempAgentList.push(item.value)
        }
      })
      this.searchKey.category = tempCategory.join('|')
      this.searchKey.status = tempStatus.join('|')
      this.searchKey.owner = tempOwnerList.join('|')
      this.searchKey.agent = tempAgentList.join('|')
      console.log(this.searchKey)
      if (this.searchKey.keyword) {
        this.apiSearch()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.trademark-search {
  padding: 40px;
  .top-search {
    display: flex;
    align-items: flex-end;
    .left-input {
      box-sizing: border-box;
      min-width: 500px;
      width: 30%;
      flex-shrink: 0;
      .class-wrap {
        padding-left: 10px;
      }
    }
    .right-key-list {
      flex-grow: 1;
      padding-bottom: 8px;
    }
  }
  .content {
    display: flex;
    .left-wheel {
      box-sizing: border-box;
      min-width: 500px;
      width: 30%;
      flex-shrink: 0;
    }
    .right-content {
      flex-grow: 1;
      .search-detail {
        .detail-top {
          border: 1px solid #fff;
          .common {
            padding: 6px 20px;
            background-color: #fafafa;
            border-radius: 2px;
          }
        }
        .detail-btm {
          display: flex;
          > div {
            border: 1px solid #fff;
            width: 50%;
          }
        }
      }
    }
  }
}
</style>
