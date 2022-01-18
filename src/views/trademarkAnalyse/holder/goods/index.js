import pages from '@/components/pages'
import tops from '@/components/topNoLogin'
import menus from '@/components/report/menu.vue'
import loading from '@/components/loading'
import backTop from '@/components/backTop'

import { api, formatDate } from '@/assets/js/util.js'

import qs from 'qs'

export default {
  mounted() {
    this.searchFn()
  },
  methods: {
    // 下载
    downFn() {
      const string = {
        type: 'goods',
        category: this.checkCatsList.join(','),
        regYear: this.checkYearList.join(','),
        last_status: this.checkFlowList.join(','),
        agent: this.checkAngetList.join(','),
        owner: this.checkNameList.join(','),
        id: this.id
      }

      const data = {
        type: 'reportOwnerBrandXls',
        title: `${this.nameList[0]}商标档案-${formatDate(new Date())}`,
        params: qs.stringify(string)
      }
      this.$parent.downFn(data)
    },
    // 搜索清理
    inpClearFn() {
      this.searchKey = ''
      this.inpClearShow = false
      this.searchFn()
    },
    // 多选后搜索
    checkFn(type) {
      this.pageId = 1
      this.searchFn()
    },
    searchFn(page = '') {
      if (page != '') {
        this.pageId = page
      }
      if (this.searchKey != '') {
        this.inpClearShow = true
      } else {
        this.inpClearShow = false
      }
      const data = {
        search: this.searchKey,
        category: this.checkCatsList.join(','),
        regYear: this.checkYearList.join(','),
        last_flow_status: this.checkFlowList.join(','),
        agent: this.checkAngetList.join(','),
        owner: this.checkNameList.join(','),
        page: this.pageId
      }
      const url = `/report/report/goods/${this.id}`
      this.loading = true
      API.get(url, data).then((res) => {
        this.loading = false
        if (res.data.code == 200) {
          this.tableData = res.data.list
          this.agentList = res.data.aggs.by_agent.buckets
          this.catsList = res.data.aggs.by_cat.buckets
          this.yearList = res.data.aggs.by_year.buckets
          this.flowList = res.data.aggs.last_status.buckets
          this.allSize = res.data.total
          this.pageAll = res.data.totalPage
        }
      })
    }
  },
  props: ['nameList', 'id'],
  data() {
    return {
      menuIndex: 1,
      titleName: '持有人分析报告',
      backBox: '.holder-page',

      pageId: 1,
      pageAll: 0,
      pageSizeShow: false,

      searchKey: '',
      inpClearShow: false,

      tableData: [],
      searchError: false,
      agentList: [],
      yearList: [],
      yearListShow: false,
      catsList: [],
      catsListShow: false,
      flowList: [],
      flowListShow: false,
      checkAngetList: [],
      checkYearList: [],
      checkCatsList: [],
      checkFlowList: [],
      checkNameList: [],
      allSize: 0,

      loading: true
    }
  },
  components: {
    menus,
    tops,
    pages,
    loading,
    backTop
  }
}
const API = api()
