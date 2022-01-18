import loading from '@/components/loading'
import pages from '@/components/pages'
import prompt from '@/components/prompt'
import fixedSlotAction from '@/components/fixed/fixedSlotAction'

import { api } from '@/assets/js/util.js'

export default {
  beforeDestroy() {
    document.removeEventListener('click', this.listenFn)
  },
  mounted() {
    document.addEventListener('click', this.listenFn)
    this.getDataFn()
  },
  methods: {
    listenFn() {
      this.$refs.slotAction.hideFn()
    },

    navChangeFn(index) {
      this.navCur = index
      this.getDataFn()
    },
    getDataFn() {
      this.loading = true
      API.get(`/report/report/apply/${this.nameList[this.navCur]}`).then(
        (res) => {
          this.loading = false
          if (res.data.code == 200) {
            this.tableData = res.data.info
            if (res.data.contact) {
              this.contact = res.data.contact
            }
            if (res.data.change && res.data.change.length > 0) {
              this.changeList = res.data.change
            }
          } else if (res.data.code == 401) {
            this.contentError = true
          } else {
            this.contentError = true
            this.$parent.promptFn(res.data.msg, 'err')
          }
        }
      )
    },
    tabShowFn(size) {
      this.tabShow = size
    },
    fixedShowFn(event, name) {
      const box = event.currentTarget
      this.$refs.slotAction.showFn(box)
      if (name == 'name') {
        this.slotList = this.tableData.nameUsed
      } else {
        this.slotList = this.contact[name]
      }
    }
  },
  props: ['nameList', 'id'],
  data() {
    return {
      navList: [],
      navCur: 0,
      navLoading: false,
      navGetMore: true,
      tableData: {},
      contact: [],
      changeList: [],
      slotList: [],

      loading: true,
      contentError: false,
      tabShow: 1
    }
  },
  components: {
    loading,
    pages,
    prompt,
    fixedSlotAction
  }
}
const API = api()
