export default {
  methods: {
    // 删除
    delEmailFn(id) {
      let data = {
        p_id: id
      };
      API.post("/qzh/p_rcmd_id/delete", data).then(res => {
        if (res.data.code == 200) {
          // mixinsGetEmailListFn 传递函数，以防其他文件调用是出现命名冲突的特别命名，请将其加入到引入mixins的文件中并执行获取推荐函列表的函数
          if (this.mixinsGetEmailListFn != undefined) {
            this.mixinsGetEmailListFn(false);
          }
        }
      });
    },
    // 添加
    pushEmailFn(id) {
      let data = {
        p_id: id
      };
      API.post("/qzh/p_rcmd_id/add", data).then(res => {
        if (res.data.code == 200) {
          // mixinsGetEmailListFn 传递函数，以防其他文件调用是出现命名冲突的特别命名，请将其加入到引入mixins的文件中并执行获取推荐函列表的函数
          if (this.mixinsGetEmailListFn != undefined) {
            this.mixinsGetEmailListFn(true);
          }
        }
      });
    }
  }
};

import { api } from "@/assets/js/util.js";
const API = api();
