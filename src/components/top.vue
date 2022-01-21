<template>
  <div class="top_box clearfix">
    <!-- 个人信息 -->
    <div class="person" v-if="user!='' && types!='doc' && types!='detail'">
      <span @click.stop="personSliderFn"><span class="img_box photo"
          v-if="is_default_headimg == 1">{{user.title.substring(0,1)}}</span><span class="img_box photo"
          :class="{white: is_default_headimg != 1}" v-if="is_default_headimg != 1"><img class="img" :src="headerImg"
            alt=""></span><i class="icon icon-bottom"></i></span>
      <div class="slider_box" v-if="personSlider" @click.stop="personShowFn">
        <div class="section">
          <div class="name">{{user.title}}</div>
          <div class="option">{{user.orginfo.title}}</div>
        </div>
        <div class="section">
          <router-link to="/team/myreq" class="list">我的团队申请</router-link>
          <a href='javascript:void(0)' class="list" @click.stop="complainFn">意见反馈</a>
          <a href='javascript:void(0)' class="list" @click.stop="personalFn(true)">个人资料</a>
        </div>
        <div class="section">
          <a href='javascript:void(0)' class="list" @click="exitFn">退出登录</a>
        </div>
      </div>
    </div>
    <!-- 信息 -->
    <!-- <div class="message_box pointer" @click="messageShowFn" v-if="navIndex >= 0">
      <i class="icon icon-xiaoxitongzhitixinglingshenglingdang"  ></i><div class="circle" v-if="readList.length" ></div>
    </div> -->
    <!-- 下载任务 -->
    <div class="down-btn" btn @click.stop="downLayerShowFn(true)">
      <em class="icon icon-download"></em>
      <div class="circle" v-if="isDownloading == 1 && !downError"></div>
      <div class="circle green" v-if="isDownloading == 0 && !downError"></div>
    </div>
    <!-- /下载任务 -->

    <div class="logo_box">
      <router-link to="/"><img src="../assets/img/logo.png" class="logo" />细软图思</router-link><span
        class="txt">{{types}}</span>
    </div>
    <div class="mask" v-if="complainShow||messageShow||delShow || layerPersonalShow || downDelLayerShow"></div>
    <div class="mask del_msg_mask" v-if="delShow"></div>
    <!--意见反馈-->
    <div class="complain_layer layer w420" v-if="complainShow && user!='' && types!='report'">
      <a href="javascript:void(0)" class="close" @click="closeFn"><i class="icon icon-close"></i></a>
      <div class="tit">意见反馈</div>
      <div class="area_box">
        <textarea placeholder="请输入问题描述" v-model="content"></textarea>
      </div>
      <div class="btn_box">
        <span class="err">{{err}}</span>
        <a href="javascript:void(0)" class="btn_2" @click="complainSubmitFn">确定</a>
      </div>
    </div>
    <!--/意见反馈-->
    <!--个人资料-->
    <div class="layer w420 layer-personal" v-show="layerPersonalShow">
      <a href="javascript:void(0)" class="close" @click="personalFn(false)"><i class="icon icon-close"></i></a>
      <div class="tit">个人资料</div>
      <section class="personal-main">
        <table>
          <tr>
            <th>头像</th>
            <td>
              <div class="head-box">
                <div v-show="is_default_headimg == 1" class="default">{{user.title && user.title.substr(0,1)}}</div>
                <div v-show="is_default_headimg != 1" class="img-box">
                  <img class="img" :src="headerImg" alt="">
                </div>
                <label btn class="up-head">上传图片<input @change="headFileFn" ref="headerImg" class="file"
                    type="file"></label>
                <div btn class="default-btn" @click="imgDefaultFn">使用默认</div>
              </div>

            </td>
          </tr>
          <tr>
            <th>联系电话</th>
            <td>
              <input type="text" maxlength="11" v-model="personForm['mobile']" class="input" placeholder="选填">
            </td>
          </tr>
          <tr>
            <th>微信号</th>
            <td>
              <input type="text" v-model="personForm['weixin']" class="input" placeholder="选填">
            </td>
          </tr>
          <tr>
            <th>QQ号</th>
            <td>
              <input type="text" v-model="personForm['qq']" class="input" placeholder="选填">
            </td>
          </tr>
        </table>
      </section>
      <div class="btn_box">
        <p class="error">{{holderErr}}</p>
        <a href="javascript:void(0)" class="btn_2" @click="userSubmitFn">确定</a>
      </div>
    </div>
    <!--/个人资料-->

    <!--下载列表-->
    <div class="down-layer" @click.stop="" v-show="downLayerShow">
      <header class="header">
        <div class="tit"><em class="icon icon-download"></em>下载任务</div>
        <p class="info">已生成的文件仅保留30天</p>
        <a href="javascript:void(0)" class="close" @click.stop="downLayerShowFn(false)">
          <i class="icon icon-close"></i>
        </a>
      </header>
      <div class="down-list" ref='downList'>
        <ul class="ul">
          <li class="li" v-for="(item, index) in downList" :key="index">
            <h3>
              <em class="icon icon-PDF" v-show="item.sign.indexOf('Pdf') != -1"></em>
              <em class="icon icon-excel" v-show="item.sign.indexOf('Xls') != -1"></em>
              <span class="name">{{item.title}}</span>
              <em v-show="item.status == 1" class="outing">生成中</em>
              <em v-show="item.status == 3" class="outing gray">已生成</em>
              <em v-show="item.status == 4" class="outing red">生成失败</em>
            </h3>
            <div class="edit-box">
              <span class="type">{{item.type}}</span>
              <span btn @click.stop="downDelLayerShowFn(index)" v-show="item.status == 3 || item.status == 4"
                class="btn">删除</span>
              <span btn class="btn" @click.stop="downFn(item.file)" v-show="item.status == 3">下载</span>
            </div>
          </li>
        </ul>
        <div v-show="downLoading" class="down-loading">
          <loading></loading>
        </div>
        <dl class="common-search-error" v-show="downError && !downLoading">
          <dt class="icon icon-empty1"></dt>
          <dd class="search-txt">暂无下载任务</dd>
        </dl>
        <div v-show="!downLoading && (downPageAll > (downPageId - 1))" btn class="common-get-more"
          @click="getDownFn(false)">加载更多</div>
      </div>
    </div>
    <!--/下载列表-->

    <!--下载删除-->
    <div class="layer down-del-layer" @click.stop="" v-show="downDelLayerShow">
      <header class="header">
        <div class="tit">删除下载任务</div>
        <a href="javascript:void(0)" class="close" @click.stop="downDelLayerShow = false;">
          <i class="icon icon-close"></i>
        </a>
      </header>
      <div class="main">
        <p class="p">确定删除 <em class="red">{{downName}}</em> 吗？</p>
      </div>
      <footer class="footer">
        <span btn class="ok-btn closed" @click.stop="downDelLayerShow = false;">取消</span>
        <span btn class="ok-btn" @click.stop="downDelFn()">确定</span>
      </footer>
    </div>
    <!--/下载删除-->

    <prompt :prompt="prompt" :promptType="promptType"></prompt>
  </div>
</template>

<script>
import prompt from '@/components/prompt.vue'
import loading from '@/components/loading'
import Cookies from 'js-cookie'
import { api, requestUrl, apikey, downJs } from '@/assets/js/util.js'

import qs from 'qs'
const API = api()
export default {
  props: ['types', 'pageTxt'],
  data() {
    return {
      teamShow: false,
      personSlider: false,
      user: '',
      list: [],
      curObj: '',
      orgid: '', // 团队列表orgid
      complainShow: false,
      err: '',
      prompt: '',
      promptType: 'success',
      content: '', // 意见反馈输入框
      messageShow: false,
      delShow: false,
      msgList: [], // 监测消息列表
      readList: [], // 是否有未读的监测消息   为空时小红点不显示
      taskDetail: '',
      logList: [],
      logLoading: false,

      // 个人信息
      layerPersonalShow: false,
      personForm: {
        head_img: '',
        mobile: '',
        qq: '',
        weixin: ''
      },
      headerImg: '',
      holderErr: '',
      is_default_headimg: 1,

      // 下载
      downLayerShow: false,
      downLoading: false,
      getDownMore: false,
      getDown: false,
      downList: [],
      downError: false,
      downPageId: 1,
      downPageAll: 1,
      downDelLayerShow: false,
      layerSize: 0,
      isDownloading: -1,
      downName: ''
    }
  },
  components: {
    prompt,
    loading
  },
  methods: {
    delFn(id) {
      // 单个删除消息列表
      this.delMsgFn(id)
    },
    delAllFn() {
      // 删除所有已读消息   全部时传1
      this.delMsgFn(1)
    },
    updateMsgFn() {
      // 消息全部改为已读
      API.put('/monitor/task_msg/update/1', '').then((r) => {
        if (r.data.code == 200) {
          this.getMsgListFn()
        }
      })
    },
    delMsgFn(id) {
      // 清空消息
      API.delete(`/monitor/task_msg/delete/${id}`, '').then((r) => {
        if (r.data.code == 200) {
          this.getMsgListFn()
          this.err = ''
          this.delShow = false
          this.logList = []
        } else {
          this.err = r.data.msg
        }
      })
    },
    delShowFn() {
      this.delShow = true
    },
    loadContentFn(id, ind, ind_2) {
      const path = this.$router.resolve({
        path: '/monitor/report',
        query: { id: id }
      })
      window.open(path.href, '_blank')
    },
    messageShowFn() {
      // 打开监测消息层
      this.messageShow = true
    },
    complainFn() {
      // 打开意见反馈
      this.complainShow = true
    },

    closeFn(txt) {
      let messageShow = false
      if (txt && txt == 'del') {
        messageShow = true
      }
      this.complainShow = false
      this.messageShow = messageShow
      this.delShow = false
      this.err = ''
    },
    complainSubmitFn() {
      // 意见反馈提交
      if (!(this.content.trim() != '')) {
        this.err = '问题描述不为空'
        return false
      }
      const data = {
        title: '',
        content: this.content
      }
      API.post('/team/suggestion', data).then((r) => {
        if (r.data.code == 200) {
          this.promptType = 'success'
          this.prompt = '操作成功'
          this.err = ''
        } else if (r.data.code == 300) {
          this.$router.push({ path: '/login' })
        } else {
          this.err = r.data.msg
        }
      })
    },
    getListFn() {
      // 获取拥有的和加入的团队列表
      API.get('/team/org/my', '').then((r) => {
        if (r.data.code == 200) {
          if (
            (!r.data.list || r.data.list.length == 0) &&
            this.types != 'team'
          ) {
            this.$router.push('/team/new')
          }
          if (r.data.list && r.data.list.length) {
            r.data.list.map((i, index) => {
              if (i.is_check) {
                if (this.pageTxt && this.pageTxt == 'tool') {
                  document.title = `工作台-${i.name}-细软图思`
                }
                if (this.pageTxt && this.pageTxt == 'frame') {
                  document.title = `团队大厅-${i.name}-细软图思`
                }
                this.curObj = i
                this.$emit('groupNameFn', i.name)
                this.orgid = i.org_id
                Cookies.set('orgid', i.org_id, { expires: 5 })
              }
            })
          }
          this.list = r.data.list
        }
      })
    },
    tabListFn(ind) {
      // 切换团队
      this.list.map((i, index) => {
        i.is_check = 0
        if (ind == index) {
          i.is_check = 1
          this.curObj = i
          this.orgid = i.org_id
          Cookies.set('orgid', i.org_id, { expires: 5 })
          if (this.pageTxt && this.pageTxt == 'tool') {
            this.$router.push('/work/index?id=' + i.org_id)
            this.$router.go(0)
          } else {
            this.$router.go(0)
          }
        }
      })
    },
    personShowFn() {
      this.teamShow = false
      this.personSlider = true
    },
    teamShowFn() {
      this.teamShow = true
      this.personSlider = false
    },
    exitFn() {
      Cookies.remove('token')
      Cookies.remove('user')
      Cookies.remove('orgid')
      // this.$router.push('/')
      window.location = '/'
    },
    sliderFn() {
      this.teamShow = !this.teamShow
    },
    personSliderFn() {
      this.personSlider = !this.personSlider
    },
    // getMsgListFn(){
    //   //消息通知列表
    //   API.get('/monitor/task_msg/index','').then((r)=>{
    //     if(r.data.code==200){
    //       let msgList = [], readList = [];
    //       if(r.data.list && r.data.list.length){
    //         r.data.list.map((i,index)=>{
    //           i.cur = false
    //           if(!i.is_read){
    //             readList.push(i)
    //           }
    //         })
    //         msgList = r.data.list
    //       }
    //       this.msgList = msgList
    //       this.readList = readList
    //     }
    //   })
    // },
    tabFn(ind) {
      // 切换消息列表
      this.msgList.map((i, index) => {
        i.cur = false
        if (ind == index) {
          i.cur = true
          i.is_read = 1
          this.getMsgFn(i.msg_id)
        }
      })
    },
    getMsgFn(id) {
      // 获取消息详情
      this.logLoading = true
      API.get(`/monitor/task_msg/read/${id}`, '').then((r) => {
        if (r.data.code == 200) {
          API.get('/monitor/task_msg/index', '').then((r) => {
            // 获取详情后  刷新列表数据   用于更改未读状态为已读
            if (r.data.code == 200) {
              this.logLoading = false
              const readList = []
              if (r.data.list && r.data.list.length) {
                r.data.list.map((i, index) => {
                  if (!i.is_read) {
                    readList.push(i)
                  }
                })
              }
              this.readList = readList
            }
          })
          if (r.data.list && r.data.list.length) {
            r.data.list.map((i, index) => {
              if (i.logs && i.logs.length) {
                i.logs.map((i_2, index_2) => {
                  i_2.leave.indexOf('天') != -1 && parseInt(i_2.leave) > 30
                    ? (i_2.downloadBtn = false)
                    : (i_2.downloadBtn = true)
                })
              }
            })
            this.logList = r.data.list
          }
        }
      })
    },
    // 图片上传
    headFileFn(el) {
      const that = this
      const file = el.target.files[0]
      const read = new FileReader()
      read.readAsDataURL(file)
      read.onload = (res) => {
        that.headerImg = res.target.result
        that.is_default_headimg = 0
      }
    },
    imgDefaultFn() {
      this.headerImg = ''
      this.personForm.head_img = 'default'
      this.is_default_headimg = 1
    },
    personalFn(bl) {
      this.layerPersonalShow = bl
      this.personSlider = false
      if (!bl) {
        this.holderErr = ''
      }
      if (bl) {
      }
    },
    userSubmitFn() {
      const that = this
      const data = new FormData()
      for (const key in this.personForm) {
        data.append(key, this.personForm[key])
      }
      const file = this.$refs.headerImg.files[0]
      if (file) {
        data.append('head_img', file)
      }
      if (this.personForm.head_img == 'default') {
        data.append('head_img', 'default')
      }
      API.upload('/user/user/save', data).then((res) => {
        if (res.data.code == 200) {
          this.prompt = '修改成功'
          setTimeout(() => {
            this.prompt = ''
          }, 3000)
          this.layerPersonalShow = false
        } else {
          this.holderErr = res.data.msg
        }
      })
    },

    // 获取个人信息
    getHolderFn() {
      API.get('/user/user/read', {}).then((res) => {
        if (res.data.code == 200) {
          this.headerImg = res.data.info.head_img
          this.is_default_headimg = res.data.info.is_default_headimg
          this.personForm.head_img = res.data.info.head_img
          this.personForm.qq = res.data.info.qq
          this.personForm.mobile = res.data.info.mobile
          this.personForm.weixin = res.data.info.weixin
        }
      })
    },
    // 下载第一页的时候20秒刷新一次列表
    downLayerShowFn(bl) {
      const that = this
      let timer = null
      const box = this.$refs.downList
      this.downLayerShow = bl
      this.downPageId = 1
      if (bl) {
        that.getDownFn(true)
      }
      timer = setInterval(() => {
        if (!that.downLayerShow || this.downPageId > 2) {
          clearInterval(timer)
          timer = null
          return false
        }
        that.reDownLoadFn()
      }, 20000)
    },
    // 打开下载列表后20秒请求
    reDownLoadFn() {
      API.get('/user/download/index?page=1', {}).then((res) => {
        if (res.data.code == 200) {
          this.downList = res.data.list
          if (this.downList.length == 0) {
            this.downError = true
          }
          this.isDownloading = res.data.is_downloading
        }
      })
    },
    // 获取下载列表
    getDownFn(bl = false) {
      if (bl) {
        this.downList = []
        this.downPageId = 1
      }
      this.downLoading = true
      API.get(`/user/download/index?page=${this.downPageId}`, {}).then(
        (res) => {
          this.downLoading = false
          if (res.data.code == 200) {
            this.downList = this.downList.concat(res.data.list)
            if (this.downList.length == 0) {
              this.downError = true
            }
            this.isDownloading = res.data.is_downloading
            this.downPageId++
            this.downPageAll = res.data.totalPage
          }
        }
      )
    },
    // 下载删除
    downDelLayerShowFn(index) {
      this.layerSize = index
      this.downDelLayerShow = true
      if (this.downList[index].type != '推荐函') {
        this.downName = `${this.downList[index].title} - ${this.downList[index].type}`
      } else {
        this.downName = this.downList[index].title
      }
    },
    // 下载任务删除
    downDelFn() {
      const that = this
      API.post(
        `/user/download/delete/${this.downList[this.layerSize].download_id}`,
        {}
      ).then((res) => {
        if (res.data.code == 200) {
          this.prompt = '删除成功'
          this.promptType = 'success'
          this.downDelLayerShow = false
          this.downList.splice(this.layerSize, 1)
        } else {
          this.prompt = res.data.msg
          this.promptType = 'err'
        }
        setTimeout(() => {
          this.prompt = ''
        }, 2000)
      })
    },
    downFn(url) {
      downJs(url)
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      this.teamShow = false
      this.personSlider = false
      this.downLayerShow = false
    })
    if (Cookies.get('user')) {
      const user = JSON.parse(Cookies.get('user'))
      if (user) {
        this.user = user
        if (
          this.types &&
          (this.types == 'work' ||
            this.types == 'brand' ||
            this.types == 'monitor' ||
            this.types == 'qzh' ||
            this.types == 'calendar')
        ) {
          this.getListFn()
        }
      }
    }
    this.getHolderFn()
    this.getDownFn(true)
  }
}
</script>
<style scoped  lang="scss">
@import '@/assets/sass/base.scss';

.layer {
  &.del_msg_layer {
    z-index: 200;
  }
  &.message_layer {
    width: 980px;
    height: 500px;
    padding: 14px;
    .empty_box {
      color: #a2a7b0;
      .icon {
        font-size: 40px;
      }
    }
    .tit {
      .btn {
        color: #a2a7b0;
        font-size: 12px;
        font-weight: normal;
        margin-left: 30px;
        cursor: pointer;
        .icon {
          vertical-align: top;
          font-size: 20px;
          margin-right: 2px;
        }
        &:hover {
          color: #333;
          .icon {
            color: #a2a7b0;
          }
        }
      }
    }
    .part_1,
    .part_2 {
      float: left;
    }
    .part_1 {
      background: #eceef2;
      border-radius: 4px;
      height: 432px;
      width: 290px;
      overflow-y: scroll;
      box-sizing: border-box;
      padding: 10px 4px 10px 10px;
      li {
        background: #fff;
        border-radius: 4px;
        border-left: 4px solid #fff;
        overflow: hidden;
        margin-bottom: 10px;
        cursor: pointer;
        &:hover {
          border-left: 4px solid #a2a7b0;
          .msg_tit {
            .right {
              .icon {
                display: inline;
              }
              .time {
                display: none;
              }
            }
          }
        }
        &.cur {
          border-left: 4px solid #fb717e;
        }
        &.checked {
          .msg_tit {
            .txt {
              font-weight: bold;
              color: #333;
            }
          }
          .msg {
            color: #333;
          }
        }
        .msg {
          font-size: 12px;
          color: #a2a7b0;
          line-height: 22px;
          padding: 0 0 10px 8px;
        }
        .msg_tit {
          line-height: 40px;
          padding: 0 10px 0 8px;
          color: #a2a7b0;
          .right {
            float: right;
            .time {
              font-size: 12px;
            }
            .icon {
              vertical-align: top;
              font-size: 20px;
              display: none;
            }
          }
        }
      }
    }
    .part_2 {
      width: 648px;
      margin-left: 14px;
      border-top: 1px solid #e9e9e9;
      height: 410px;
      padding-bottom: 20px;
      overflow-y: scroll;
      .detail_list_box {
        li {
          .name {
            padding-top: 14px;
            line-height: 20px;
            color: #a2a7b0;
          }
          .detail {
            display: block;
            line-height: 20px;
            padding: 10px;
            border: 1px solid #e9e9e9;
            border-radius: 4px;
            margin-top: 10px;
            padding-top: 10px;
            display: block;
            .btn {
              float: right;
              margin-right: 10px;
              &:hover {
                color: #fb717e;
              }
              .icon {
                color: #a2a7b0;
                font-size: 20px;
                vertical-align: top;
              }
              &.gray {
                cursor: default;
                color: #a2a7b0;
                &:hover {
                  color: #a2a7b0;
                }
              }
            }
            .tag {
              display: inline-block;
              width: 50px;
              line-height: 20px;
              border-radius: 4px;
              background: #eceef2;
              color: #a2a7b0;
              text-align: center;
              font-size: 12px;
            }
            .txt {
              padding-left: 14px;
            }
            .msg {
              color: #fb717e;
              padding-left: 25px;
            }
          }
        }
      }
    }
  }
}
.top_box {
  height: 50px;
  box-shadow: 0 2px 4px #e1e6ef;
  padding: 0 40px 0 10px;
  background: #fff;
  position: relative;
  z-index: 50;
  position: relative;

  .area_box {
    background: #eceef2;
    height: 130px;
    border-radius: 4px;
    textarea {
      background: #eceef2;
      width: 100%;
      height: 100px;
      box-sizing: border-box;
      padding: 6px;
      line-height: 22px;
    }
  }
  .slider_box {
    position: absolute;
    background: #fff;
    box-shadow: 0px 0px 10px #e1e6ef;
    width: 200px;
    cursor: default;
    z-index: 6;
    .section {
      border-bottom: 1px solid #e9e9e9;
      padding: 4px 0;
      width: 100%;
      box-sizing: border-box;
      &.scroll {
        max-height: 110px;
        overflow-y: scroll;
      }
      &:last-child {
        border-bottom: 0;
      }
      .name,
      .option,
      .list {
        padding: 0 20px;
        &.name {
          color: #333;
          font-weight: bold;
        }
        &.list {
          cursor: pointer;
          display: block;
          line-height: 34px;
          &:hover {
            background: #eceef2;
          }
        }
      }
      .name,
      .option {
        line-height: 28px;
      }
    }
  }
  .message_box {
    float: right;
    line-height: 54px;
    position: relative;
    .icon {
      font-size: 22px;
      color: #a2a7b0;
      vertical-align: top;
      margin-right: 25px;
    }
    .circle {
      position: absolute;
      background: #fb717e;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      top: 12px;
      left: 22px;
      &.green {
        background-color: $green;
      }
    }
  }
  .down-btn {
    @extend .message_box;
  }
  .person {
    float: right;
    color: #7f7f7f;
    cursor: pointer;
    position: relative;
    z-index: 5;
    height: 55px;
    .slider_box {
      right: 0;
      top: 48px;
    }
    .img_box {
      overflow: hidden;
      margin: 10px 5px 0 0;
      .img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .icon {
      line-height: 55px;
      vertical-align: top;
      font-size: 12px;
      color: #aaa;
    }
  }
  .nav_box,
  .logo_box {
    .logo {
      width: 34px;
      height: 34px;
      margin-top: 8px;
      vertical-align: top;
    }
  }
  .nav_box {
    .left {
      float: left;
      padding-right: 30px;
      position: relative;
      z-index: 5;
      .txt {
        font-size: 18px;
        font-weight: bold;
        line-height: 30px;
        padding: 0 5px;
        cursor: pointer;
        margin: 10px 0 0 10px;
        display: inline-block;
        border-radius: 4px;
        &:hover {
          background: #eceef2;
        }
      }
      .icon {
        color: #aaa;
        font-size: 14px;
        margin-left: 8px;
      }
      .slider_box {
        left: 0;
        top: 56px;
        width: 260px;
        .list {
          padding: 0 15px;
          .icon {
            float: right;
            font-size: 18px;
          }
        }
      }
    }
    .nav {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
      li {
        margin-right: 20px;
        line-height: 48px;
        font-size: 16px;
        display: inline-block;
        &:last-child {
          margin-right: 0;
        }
        a {
          display: block;
          padding: 0 10px;
        }
        &:hover {
          a {
            color: #d9001b;
          }
        }
        &.cur {
          a {
            border-bottom: 2px solid #d9001b;
            color: #d9001b;
          }
        }
      }
    }
  }
  .logo_box {
    line-height: 50px;
    font-size: 24px;
    .txt {
      display: inline-block;
      line-height: 34px;
      border-left: 1px solid #e9e9e9;
      font-size: 20px;
      font-weight: bold;
      margin-left: 30px;
      padding-left: 15px;
    }
  }
}

.layer-personal {
  width: 460px;
  .personal-main {
    width: 100%;
    table {
      width: 100%;
    }
    th,
    td {
      padding-bottom: 10px;
    }
    th {
      text-align: left;
      width: 80px;
      padding-left: 10px;
      color: $inpcol;
    }
    td {
      text-align: left;
    }
    .input {
      @extend .radius;
      box-sizing: border-box;
      width: 290px;
      height: $inpzhong;
      line-height: $inpzhong;
      padding-left: 10px;
      background-color: $inpbg;
    }
  }
  .head-box {
    @include flex(both, center);
    width: 290px;
    margin-bottom: 24px;
    .default {
      text-align: center;
      width: 100px;
      height: 100px;
      line-height: 100px;
      font-size: 50px;
      border-radius: 50%;
      background-color: $inpcol;
      color: $white;
    }
    .img-box {
      overflow: hidden;
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid $inpbg;
      .img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .up-head {
      @extend .radius;
      text-align: center;
      box-sizing: border-box;
      width: 80px;
      height: 30px;
      line-height: 30px;
      background-color: $red2;
      color: $white;
      .file {
        position: absolute;
        left: -999px;
        top: -999px;
      }
    }
    .default-btn {
      @extend .up-head;
      background-color: $white;
      border: 1px solid $inpbg;
      color: $txtgray1;
      line-height: 28px;
      &:hover {
        border-color: $txtgray1;
      }
    }
  }
  .btn_box {
    @include flex(both, center);
    margin-top: 20px;
    padding-top: 19px;
    border-top: 1px solid $inpbg;
    .error {
      text-align: left;
      color: $red2;
    }
  }
}

.down-layer {
  @extend .radius;
  @extend .shadow;
  position: absolute;
  box-sizing: border-box;
  right: 100px;
  top: 40px;
  width: 320px;
  padding: 15px 0;
  background-color: $white;
  .header {
    padding: 0 15px 15px;
    border-bottom: 1px solid $border;
    .tit {
      font-weight: bold;
      line-height: 20px;
      padding-bottom: 10px;
      .icon {
        margin-right: 14px;
        font-size: 20px;
        line-height: 20px;
        vertical-align: middle;
        color: $inpcol;
      }
    }
    .close {
      position: absolute;
      right: 18px;
      top: 18px;
      .icon {
        color: #aaa;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .info {
      font-size: 12px;
      color: $txtgray2;
    }
  }
  .down-list {
    overflow-y: auto;
    height: 355px;
    .li {
      font-size: 12px;
      padding: 10px;
      color: #333;
      border-bottom: 1px solid $border;
      &:hover {
        background-color: $bg;
      }
      .h3 {
        overflow: hidden;
      }
      .name {
        @extend %hold;
        width: 180px;
        display: inline-block;
      }
      .icon-PDF {
        color: $red2;
      }
      .icon-excel {
        color: $green;
      }
      .icon {
        text-align: center;
        font-size: 20px;
        margin-right: 10px;
        width: 22px;
      }
      .outing {
        float: right;
        font-size: 12px;
        color: $green;
        &.red {
          color: $red1;
        }
        &.gray {
          color: $txtgray2;
        }
      }
      .edit-box {
        margin-top: 6px;
        font-size: 12px;
        padding-left: 32px;
        overflow: hidden;
        .btn {
          float: right;
          margin-left: 10px;
          color: $blue;
          &:hover {
            color: $bluehover;
          }
        }
        .type {
          color: $inpcol;
        }
      }
    }
  }
}

.down-del-layer {
  width: 420px;
  .main {
    padding: 20px 0;
    .p {
      line-height: 18px;
    }
  }
  .red {
    color: $red2;
  }
}
</style>
