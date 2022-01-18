import imgerr from '@/mixins/imgerr.js'
import loading from '@/components/loading'
import pages from '@/components/pages'
import pagesEasy from '@/components/pagesEasy'
import prompt from '@/components/prompt'
import fixedSlotAction from '@/components/fixed/fixedSlotAction'

import { api, kindsList } from '@/assets/js/util.js'

export default {
  mounted() {
    const that = this
    // 滚动监听
    const listenBox = this.$refs.scrollBox
    listenBox.onscroll = function () {
      const size = listenBox.scrollLeft
      if (size == 0) {
        that.scrollBtnShow = 1
      } else if (size > 870) {
        that.scrollBtnShow = 2
      } else {
        that.scrollBtnShow = 3
      }
    }
    // 搜索
    this.searchFn()
  },
  methods: {
    // 左右滚动
    scrollLeftFn() {
      const that = this
      const box = this.$refs.scrollBox
      let left = box.scrollLeft
      let timer = setInterval(function () {
        left = left - 30
        if (left > 0) {
          box.scrollLeft = left
        } else {
          box.scrollLeft = 0
          clearInterval(timer)
          timer = null
        }
      }, 10)
    },
    scrollRightFn() {
      const box = this.$refs.scrollBox
      let left = box.scrollLeft
      let timer = setInterval(function () {
        left = left + 30
        if (left < 880) {
          box.scrollLeft = left
        } else {
          box.scrollLeft = 880
          clearInterval(timer)
          timer = null
        }
      }, 10)

      box.scrollLeft = 880
    },
    layerShowFn(name) {
      this.layerShow = name
    },
    // fixed小项列表展示
    showAllFn(el, id) {
      const box = el.currentTarget
      this.$refs.slotAction.showFn(box)

      this.fixedLoading = true
      API.get(`/report/report/brand_group_item/${id}`, {}).then((res) => {
        this.fixedLoading = false
        if (res.data.code == 200) {
          this.fixedGroup = res.data.group
          this.fixedItem = res.data.item
        }
      })
    },
    slotHideFn() {
      this.fixedLoading = true
      this.$refs.slotAction.hideFn()
    },

    // search
    searchClearFn() {
      this.searchKey = ''
      this.searchFn()
    },
    searchFn() {
      if (this.searchKey != '') {
        this.searchClear = true
      } else {
        this.searchClear = false
      }
      const data = {
        id: this.id,
        page: this.pageId,
        name: this.searchKey
      }
      this.mainLoading = true
      API.get(
        `/report/report/brand_names/${this.id}/${this.pageId}`,
        data
      ).then((res) => {
        this.mainLoading = false
        if (res.data.code == 200) {
          this.tableData = res.data.list
          this.pageAll = res.data.totalPage
          this.sizeALl = res.data.total
        } else {
          this.$parents.promptFn(res.data.msg, 'err')
        }
      })
    },
    // 获取商标注册
    pageEasyFn() {
      this.getAlikeFn()
    },
    layerCloseFn() {
      this.layerPageId = 1
      this.layerShow = ''
    },
    getGoodsFn(item, size) {
      this.layerData = {}
      this.layerData.item = item
      this.layerData.size = size
      this.getAlikeFn()
      this.searchGoodsFn()
    },
    layerGetGoodsFn(size) {
      this.layerData.size = size
      this.searchGoodsFn()
      this.getAlikeFn()
    },
    searchGoodsFn() {
      this.layerShow = 'goods'
      this.leftLoading = true
      API.get(
        `/report/report/brand_over_cats_goods/${this.id}/${this.layerData.item.key}/${this.layerData.size}`,
        {}
      ).then((res) => {
        this.leftLoading = false
        if (res.data.code == 200) {
          this.goodsDataMy = res.data.list
          this.goodsItem = res.data.group
          if (res.data.list.length == 0) {
            this.leftListError = true
          } else {
            this.leftListError = false
          }
        }
      })
    },
    getAlikeFn(page = '') {
      this.rightLoading = true
      this.alikeListError = false
      API.get(
        `/report/report/brand_like_goods/${this.id}/${this.layerData.item.key}/${this.layerData.size}/${this.layerPageId}`,
        {}
      ).then((res) => {
        this.rightLoading = false
        if (res.data.code == 200) {
          this.goodsDataOther = res.data.list
          this.layerPageAll = res.data.totalPage
          if (res.data.list.length == 0) {
            this.rightListError = true
          } else {
            this.rightListError = false
          }
        }
      })
    }
  },
  props: ['id', 'nameList'],
  data() {
    return {
      layerData: null,

      // 左右滚动btn
      scrollBtnShow: 1,
      layerShow: '',

      // 搜索
      searchKey: '',
      searchClear: false,

      // 列表
      pageId: 1,
      pageAll: 0,
      pageSizeShow: false,
      tableData: [],
      mainLoading: true,
      sizeALl: 0,

      // 弹窗
      layerPageId: 1,
      layerPageAll: 0,
      tabShow: 1,
      leftLoading: true,
      rightLoading: true,
      goodsDataMy: [],
      goodsDataOther: [],
      goodsItem: [],
      leftListError: false,
      rightListError: false,
      // fixed
      fixedLoading: false,
      fixedItem: [],
      fixedGroup: []
    }
  },
  components: {
    loading,
    pages,
    prompt,
    pagesEasy,
    fixedSlotAction
  },
  mixins: [imgerr]
}
const API = api()
