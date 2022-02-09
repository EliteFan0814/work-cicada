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
        <SearchKeyList :searchKey="searchKey.keyword"></SearchKeyList>
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
          <TableList :tableData="tableData" :total="total" :pageInfo="searchKey" :setSelect="setSelect"
            @pageChange="pageChange" @sort="sort" @handleFocus="handleFocus">
          </TableList>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import searchFilter from './searchFilter.vue'
import SearchFilterItem from './searchFilterItem.vue'
import SearchKeyList from './searchKeyList.vue'
import TableList from './tableList.vue'

import apiSearch from '@/api/search'
export default {
  name: 'TrademarkSearch',
  components: { SearchFilterItem, SearchKeyList, TableList },
  data() {
    return {
      loading: false,
      searchKey: {
        keyword: '',
        page: 1,
        size: 10,
        category: '',
        status: '',
        owners: [],
        agents: [],
        sort: ''
      },
      setSelect: new Date(),
      total: 0,
      tableData: [],
      // 搜索类
      searchClass: 'name',
      preCategory: [
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
      preStatus: [
        { label: '有效注册', value: 1, selected: false },
        { label: '申请中', value: 2, selected: false },
        { label: '商标无效', value: 3, selected: false }
      ],
      category: [],
      status: [],
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
      if (this.$store.getters.isLogin) {
        this.loading = true
        apiSearch
          .getInfoByName(this.searchKey, this.searchClass)
          .then((res) => {
            this.setSelect = new Date()
            this.category = this.preCategory
            this.status = this.preStatus
            if (res.data) {
              this.tableData = res.data.map((item) => {
                item.imgUrl = this.$imgUrl + item.reg_id + '.jpg'
                item.date_app = this.$dayjs(item.date_app).format('YYYY-MM-DD')
                item.date_reg = this.$dayjs(item.date_reg).format('YYYY-MM-DD')
                return item
              })
            } else {
              this.tableData = []
            }
            // 过滤持有人显示
            // 去重
            // const tempAllOwner = Array.from(
            //   new Set(res.data.map((item) => item.owner))
            // )
            // this.ownerList = tempAllOwner.map((item) => {
            //   if (this.searchKey.owner.split('|').includes(item)) {
            //     return { label: item, value: item, selected: true }
            //   } else {
            //     return { label: item, value: item, selected: false }
            //   }
            // })
            // 过滤代理机构显示
            // const tempAllAgent = Array.from(
            //   new Set(res.data.map((item) => item.agent))
            // )
            // this.agentList = tempAllAgent.map((item) => {
            //   if (this.searchKey.agent.split('|').includes(item)) {
            //     return { label: item, value: item, selected: true }
            //   } else {
            //     return { label: item, value: item, selected: false }
            //   }
            // })
            this.total = res.pager.total
            if (res.agents) {
              this.agentList = res.agents.map((item) => {
                if (this.searchKey.agents.includes(item)) {
                  return { label: item, value: item, selected: true }
                } else {
                  return { label: item, value: item, selected: false }
                }
              })
            } else {
              this.agentList = []
            }
            if (res.owners) {
              this.ownerList = res.owners.map((item) => {
                if (this.searchKey.owners.includes(item)) {
                  return { label: item, value: item, selected: true }
                } else {
                  return { label: item, value: item, selected: false }
                }
              })
            } else {
              this.ownerList = []
            }
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.$store.commit('SET_IS_LOGIN_DIALOG', true)
      }
    },
    // 处理搜索类
    handleClass(value) {
      this.searchClass = value
      this.apiSearch()
    },
    // 改变过滤条件
    changeFilter() {
      // 国际分类
      const tempCategory = []
      this.category.map((item) => {
        if (item.selected) {
          tempCategory.push(item.value)
        }
      })
      // 有效状态
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
      this.searchKey.owners = tempOwnerList
      this.searchKey.agents = tempAgentList
      console.log(tempCategory, tempStatus, tempOwnerList, tempAgentList)
      if (this.searchKey.keyword) {
        this.apiSearch()
      }
    },
    // 通过 category 排序
    sort(sortKey) {
      this.searchKey.sort = this.searchKey.sort ? '' : sortKey
      this.apiSearch()
    },
    // 处理显示全部还是显示聚焦
    handleFocus(flag, info) {
      if (flag === 'all') {
        this.apiSearch()
      } else {
        this.tableData = info
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
