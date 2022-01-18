import pages from '@/components/pages'
import tops from '@/components/topNoLogin'
import menus from '@/components/report/menu.vue'
import loading from '@/components/loading'
import backTop from '@/components/backTop'

import qs from 'qs'
import { api, formatDate } from '@/assets/js/util.js'

export default {
  mounted() {
    this.searchFn()
    this.getQzSizeFn()
  },
  methods: {
    // 下载
    downFn() {
      const string = {
        type: 'fengxian',
        tab: this.tabShow == 1 ? 'law' : 'zhan',
        last_status: this.checkCur.join(','),
        flow_status: this.navCur,
        id: this.id
      }
      const data = {
        type: 'reportOwnerBrandXls',
        title: `${this.nameList[0]}的商标档案-${formatDate(new Date())}`,
        params: qs.stringify(string)
      }
      this.$parent.downFn(data)
      // API.getDown(data).then(res => {
      //   if (res.data.code == 200) {
      //     this.$parent.downFn();
      //     this.promptType = 'success'
      //     this.prompt = '已创建下载任务'
      //     setTimeout(() => {
      //       this.prompt = ''
      //     }, 3000);
      //   } else {
      //     this.promptType = 'err'
      //     this.prompt = res.data.msg
      //     setTimeout(() => {
      //       this.prompt = ''
      //     }, 3000);
      //   }
      // })
    },
    // 表单清理
    inpClearFn() {
      this.searchKey = ''
      this.inpClearShow = false
      this.searchFn()
    },
    // 选中收搜索
    checkFn() {
      this.pageId = 1
      this.searchFn()
    },
    // 左侧导航点击搜索
    navChangeFn(type) {
      this.navCur = type
      this.searchFn(1)
    },
    // 分类切换
    tabShowFn(size) {
      this.tabShow = size
      if (size == 2) {
        this.navList = this.navQzList
      }
      this.navCur = ''
      this.searchFn(1)
    },
    // 获取潜在风险数量以及左侧导航
    getQzSizeFn() {
      API.get(`/report/report/detail_flow_zhan_count/${this.id}`, {}).then(
        (res) => {
          if (res.data.code == 200) {
            this.qzSize = res.data.count
            this.navQzList = res.data.left
          }
        }
      )
    },
    // 搜索
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
        name: this.searchKey,
        last_status: this.checkCur.join(','),
        status: this.navCur,
        page: this.pageId
      }
      let url = `/report/report/detail_flow_law/${this.id}`
      if (this.tabShow == 2) {
        url = `/report/report/detail_flow_zhan/${this.id}`
      }
      this.loading = true
      API.get(url, data).then((res) => {
        this.loading = false
        if (res.data.code == 200) {
          this.tableData = res.data.list
          if (res.data.list.length == 0) {
            this.searchError = true
          } else {
            this.searchError = false
          }
          if (res.data.top && res.data.top.length > 0) {
            this.checkList = res.data.top
          }
          if (res.data.left && res.data.left.length > 0) {
            this.navList = res.data.left
          }
          if (res.data.leftChecked && res.data.leftChecked != '') {
            this.navCur = res.data.leftChecked
          }
          this.pageAll = res.data.totalPage
          if (this.tabShow == 1 && res.data.lawCount) {
            this.flSize = res.data.lawCount
          }
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

      tabShow: 1,

      searchKey: '',
      inpClearShow: false,

      navList: [],
      navQzList: [],
      navCur: '',
      tableData: [],
      searchError: false,
      checkList: [],
      checkListShow: false,
      checkCur: [],
      flSize: 0,
      qzSize: 0,

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
