import prompt from "@/components/prompt.vue";
import loading from "@/components/loading";
import fixedSlot from "./fixed/fixedSlotHover";
import fixedSlotAction from "./fixed/fixedSlotAction";

import Cookies from "js-cookie";
import { api, downJs } from "@/assets/js/util.js";
const API = api();

export default {
  mounted() {
    let that = this;
    document.addEventListener("click", e => {
      this.navLayerShow = "";
      this.$store.state.downShow = false;
    });

    that.navShowFn();
    window.onresize = function() {
      that.navShowFn();
    };

    if (Cookies.get("user")) {
      let user = JSON.parse(Cookies.get("user"));
      if (user) {
        this.user = user;
        this.getListFn();
      }
      // console.log(this.user)
    }

    this.getHolderFn();
    this.getDownFn(true);
  },
  methods: {
    // 屏幕尺寸
    navShowFn() {
      let Hh = document.documentElement.clientHeight;
      let navH = Hh - 200;
      if (navH < 390) {
        let size = Math.ceil((390 - navH) / 60);
        // console.log(size)
        this.navWidth = `${360 - 60 * (size + 1)}px`;
        this.navMoreShow = true;
      } else {
        this.navMoreShow = false;
      }
    },
    teamShowFn() {
      this.navLayerShow = "teamShow";
    },
    // login out
    exitFn() {
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("orgid");
      // this.$router.push('/')
      window.location = "/";
    },
    // 个人资料
    personalFn(bl) {
      this.layerShow = "personnal";
      this.personSlider = false;
      if (!bl) {
        this.holderErr = "";
      }
    },
    //获取拥有的和加入的团队列表
    getListFn() {
      API.get("/team/org/my", "").then(r => {
        if (r.data.code == 200) {
          if (
            (!r.data.list || r.data.list.length == 0) &&
            this.types != "team"
          ) {
            this.$router.push("/team/new");
          }
          if (r.data.list && r.data.list.length) {
            r.data.list.map((i, index) => {
              if (i.is_check) {
                if (this.pageTxt && this.pageTxt == "tool") {
                  document.title = `工作台-${i.name}-细软图思`;
                }
                if (this.pageTxt && this.pageTxt == "frame") {
                  document.title = `团队大厅-${i.name}-细软图思`;
                }
                this.curObj = i;
                this.$emit("groupNameFn", i.name);
                this.orgid = i.org_id;
                Cookies.set("orgid", i.org_id, { expires: 5 });
              }
            });
          }
          this.list = r.data.list;
        }
      });
    },
    //个人信息
    personSliderFn() {
      this.navLayerShow = "personSlider";
    },
    //图片上传
    headFileFn(el) {
      let that = this;
      let file = el.target.files[0];
      let read = new FileReader();
      read.readAsDataURL(file);
      read.onload = res => {
        that.headerImg = res["target"]["result"];
        that.is_default_headimg = 0;
      };
    },
    // 默认图片
    imgDefaultFn() {
      this.headerImg = "";
      this.personForm["head_img"] = "default";
      this.is_default_headimg = 1;
    },
    //修改个人信息
    userSubmitFn() {
      let that = this;
      let data = new FormData();
      for (let key in this.personForm) {
        data.append(key, this.personForm[key]);
      }
      let file = this.$refs.headerImg.files[0];
      if (file) {
        data.append("head_img", file);
      }
      if (this.personForm["head_img"] == "default") {
        data.append("head_img", "default");
      }
      API.upload("/user/user/save", data).then(res => {
        if (res.data.code == 200) {
          this.prompt = "修改成功";
          setTimeout(() => {
            this.prompt = "";
          }, 3000);
          this.layerPersonalShow = false;
        } else {
          this.holderErr = res.data.msg;
        }
      });
    },

    // 获取个人信息
    getHolderFn() {
      API.get("/user/user/read", {}).then(res => {
        if (res.data.code == 200) {
          this.headerImg = res.data.info["head_img"];
          this.is_default_headimg = res.data.info["is_default_headimg"];
          this.personForm["head_img"] = res.data.info["head_img"];
          this.personForm["qq"] = res.data.info["qq"];
          this.personForm["mobile"] = res.data.info["mobile"];
          this.personForm["weixin"] = res.data.info["weixin"];
        }
      });
    },
    // 下载第一页的时候20秒刷新一次列表  之前是因为没有用vuex，现在使用了可以直接使用vuex控制 downShow 字段名，在修改页面的使用修改
    downLayerShowFn(bl) {
      if (!bl) {
        this.$store.state.downShow = false;
        return false;
      }
      let that = this;
      let timer = null;
      let box = this.$refs.downList;
      this.$store.state.downShow = true;

      this.downPageId = 1;
      if (bl) {
        that.getDownFn(true);
      }
      timer = setInterval(() => {
        if (!this.$store.state.downShow || this.downPageId > 2) {
          clearInterval(timer);
          timer = null;
          return false;
        }
        that.reDownLoadFn();
      }, 20000);
    },
    // 打开下载列表后20秒请求
    reDownLoadFn() {
      this.downError = false;
      API.get(`/user/download/index?page=1`, {}).then(res => {
        if (res.data.code == 200) {
          this.downList = res.data.list;
          if (this.downList.length == 0) {
            this.downError = true;
          }
          this.isDownloading = res.data.is_downloading;
        }
      });
    },
    //获取下载列表
    getDownFn(bl = false) {
      if (bl) {
        this.downList = [];
        this.downPageId = 1;
      }
      this.downLoading = true;
      this.downError = false;
      API.get(`/user/download/index?page=${this.downPageId}`, {}).then(res => {
        this.downLoading = false;
        if (res.data.code == 200) {
          this.downList = this.downList.concat(res.data.list);
          if (this.downList.length == 0) {
            this.downError = true;
          }
          this.isDownloading = res.data.is_downloading;
          this.downPageId++;
          this.downPageAll = res.data.totalPage;
        }
      });
    },
    // 下载删除
    downDelLayerShowFn(index, el) {
      // let that = this;
      // this.layerSize = index;
      // this.downDelLayerShow = true;
      // if (this.downList[index]["type"] == "推荐函") {
      //   this.downName = `${this.downList[index]["title"]} - ${this.downList[index]["type"]}`;
      // } else {
      //   this.downName = this.downList[index]["title"];
      // }
    },
    // 下载任务删除
    downDelFn(id, index) {
      let that = this;
      API.post(`/user/download/delete/${id}`, {}).then(res => {
        if (res.data.code == 200) {
          this.prompt = "删除成功";
          this.promptType = "success";
          this.downDelLayerShow = false;
          this.downList.splice(index, 1);
        } else {
          this.prompt = res.data.msg;
          this.promptType = "err";
        }
        setTimeout(() => {
          this.prompt = "";
        }, 2000);
      });
    },
    // 下载
    downFn(url) {
      downJs(url);
    },
    // 个人信息
    personShowFn() {
      this.teamShow = false;
      this.personSlider = true;
    },
    // 弹窗关闭
    closeFn() {
      this.layerShow = "";
      this.holderErr = "";
      this.complainShow = false;
    },
    complainFn() {
      //打开意见反馈
      this.layerShow = "complain";
    },
    tabListFn(ind) {
      //切换团队
      this.list.map((i, index) => {
        i.is_check = 0;
        if (ind == index) {
          i.is_check = 1;
          this.orgid = i.org_id;
          Cookies.set("orgid", i.org_id, { expires: 5 });
          if (this.pageTxt && this.pageTxt == "tool") {
            this.$router.push("/work/index?id=" + i.org_id);
            this.$router.go(0);
          } else {
            this.$router.go(0);
          }
        }
      });
    },
    complainSubmitFn() {}
  },
  props: {
    navIndex: {
      default: 1,
      type: Number
    }
  },
  data() {
    return {
      list: [],
      teamShow: false,
      personSlider: false,
      navLayerShow: "",
      navMoreShow: false,
      navWidth: "auto",

      user: "",
      orgid: "",
      layerShow: "",

      // 个人信息
      personForm: {
        head_img: "",
        mobile: "",
        qq: "",
        weixin: ""
      },
      headerImg: "",
      holderErr: "",
      is_default_headimg: 1,

      //下载
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
      downName: "",

      complainErr: "",
      complainContent: ""
    };
  },
  components: {
    prompt,
    loading,
    fixedSlot,
    fixedSlotAction
  }
};
