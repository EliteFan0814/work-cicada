<template>
<div>
<div class="common-nav">
  <div class="top-top">
    <div class="logo">
      <img class="img" btn src="../assets/img/logo.png" alt="" @click.stop="teamShowFn">
      <div class="slider_box team-box" v-if="navLayerShow == 'teamShow'" >
        <div class="section scroll">
          <a href='javascript:void(0)' class="list" @click.stop="tabListFn(index)" v-for="(item,index) of list" :key="index"><i class="icon icon-yes" v-if="item.is_check"></i>{{item.name}}</a>
        </div>
        <div class="section">
          <router-link class="list" to="/team/new"><em class="icon icon-shejiao-tuandui"></em>加入新团队</router-link>
          <router-link to="/team/list" class="list"><em class="icon icon-tubiao-liucheng"></em>管理团队</router-link>
        </div>
      </div>
    </div>
    <nav class="nav-list ovh " :style="'height:' + navWidth + ';'">
      <router-link  class="router-link" :to="'/work/index?id='+orgid">
        <em  class="icon  icon-gongzuo" ></em><em class="icon icon-cur icon-gongzuo-svg" ></em>工作台
      </router-link>
      <!-- <router-link  class="router-link" to="/clue">
        <em  class="icon  icon-xiansuo" ></em><em class="icon icon-cur icon-i_xiansuo-copy" ></em>线索
      </router-link> -->
      <!-- <router-link  class="router-link" to="/client/index">
        <em  class="icon icon-chengshijinglitianch" ></em><em class="icon icon-cur icon-kehujingli-svg" ></em>客户
      </router-link> -->
      <!-- <router-link class="router-link" to="/group/frame"><em class="icon" ><em class="icon" ></em>团队大厅</router-link> -->
      <div class="router-link" to="/search/index">
        <fixed-slot>
          <template v-slot:show >
          <!-- <router-link  class="router-link" to="/search/index" @click.native="$cnzzFn('左侧导航', '点击', '查询')" > -->
          <router-link  class="router-link" to="/search" onclick="_czc.push(['_trackEvent', '左侧导航', '点击', '查询'])" >
            <em  class="icon icon-search" ></em><em class="icon icon-cur icon-caozuo-sousuo-svg" ></em>查询
          </router-link>
          </template>
          <template v-slot:none >
            <ul name="none" class="child-nav-list">
              <li class="li" ><router-link @click.native="$cnzzFn('查询', '点击', '商标查询')" to="/search">商标查询</router-link></li>
              <li class="li" ><router-link @click.native="$cnzzFn('查询', '点击', '公告查询')" to="/search/notice">公告查询</router-link></li>
              <li class="li" ><router-link @click.native="$cnzzFn('查询', '点击', '续展/宽展查询')" to="/search/keep">续展/宽展查询</router-link></li>
              <li class="li" ><router-link @click.native="$cnzzFn('查询', '点击', '法律文书查询')"  to="/search/document">法律文书查询</router-link></li>
              <li class="li" ><router-link @click.native="$cnzzFn('查询', '点击', '分类表查询')" to="/search/kind">分类表查询</router-link></li>
              <!-- <li class="li" ><router-link @click.native="$cnzzFn('查询', '点击', '客户商标档案查询')" to="/search/client">客户商标档案查询</router-link></li> -->
              
            </ul>
          </template>
        </fixed-slot>
      </div>
      <router-link  class="router-link" to="/report/brand"  @click.native="$cnzzFn('左侧导航', '点击', '分析')">
        <em class="icon icon-fenxi" ></em><em class="icon icon-cur icon-fenxi-svg" ></em>分析
      </router-link>
        <router-link  class="router-link" to="/monitor/index"  @click.native="$cnzzFn('左侧导航', '点击', '监测')">
      <em class="icon icon-jiance" ></em><em class="icon icon-cur icon-jiance-svg" ></em>监测
        </router-link>
      <!-- <router-link :class="{cur:navIndex== 4}" class="router-link" to="/calendar/index">
        <em class="icon icon-leidasaomiao" ></em><em class="icon icon-cur icon-leidasaomiao-svg14" ></em>雷达
      </router-link> -->
      <router-link class="router-link" to="/qzh/index"  @click.native="$cnzzFn('左侧导航', '点击', '千纸鹤')">
        <em class="icon icon-fenxiang1" ></em><em class="icon icon-cur icon-fenxiang" ></em>千纸鹤
      </router-link>
      <!-- <router-link class="router-link" to="/notary/index">
        <em class="icon icon-chuizi" ></em><em class="icon icon-cur icon-chuizi-shixin" ></em>标证通
      </router-link>  -->
      <router-link class="router-link" to="/name/index"  @click.native="$cnzzFn('左侧导航', '点击', '商标起名')">
        <em class="icon icon-shangbiao" ></em><em class="icon icon-cur icon-shangbiao-shixin" ></em>商标起名
      </router-link>
      <!-- <router-link class="router-link" to="/complain"  >
        <em class="icon icon-yijianfankui1" ></em><em class="icon icon-cur icon-yijianfankui" ></em>意见反馈
      </router-link> -->
      <router-link class="router-link" to="/patent/index"  @click.native="$cnzzFn('左侧导航', '点击', '专利资源')">
        <em class="icon icon-zhuanlichaxun" ></em><em class="icon icon-cur icon-zhuanli" ></em>专利资源
      </router-link>
    </nav>
    <div class="nav-more" v-show="navMoreShow" >
      <div class="show-btn" btn>
        <em class="icon icon-gengduo2"></em>更多
      </div>
      <div class="nav-layer-show">
        <router-link  class="router-link" :to="'/work/index?id='+orgid">
          <em  class="icon  icon-gongzuo" ></em><em class="icon icon-cur icon-gongzuo-svg" ></em>工作台
        </router-link>
        <!-- <router-link  class="router-link" to="/clue">
          <em  class="icon  icon-xiansuo" ></em><em class="icon icon-cur icon-i_xiansuo-copy" ></em>线索
        </router-link> -->
        <!-- <router-link  class="router-link" to="/client/index">
          <em  class="icon icon-chengshijinglitianch" ></em><em class="icon icon-cur icon-kehujingli-svg" ></em>客户
        </router-link> -->
        <!-- <router-link class="router-link" to="/group/frame"><em class="icon" ><em class="icon" ></em>团队大厅</router-link> -->
        <router-link  class="router-link" to="/search/index"  @click.native="$cnzzFn('左侧导航', '点击', '查询')">
          <em class="icon icon-search" ></em><em class="icon icon-cur icon-caozuo-sousuo-svg" ></em>查询
        </router-link>
        <router-link  class="router-link" to="/report/brand"  @click.native="$cnzzFn('左侧导航', '点击', '分析')">
          <em class="icon icon-fenxi" ></em><em class="icon icon-cur icon-fenxi-svg" ></em>分析
        </router-link>
          <router-link class="router-link" to="/monitor/index"  @click.native="$cnzzFn('左侧导航', '点击', '监测')">
        <em class="icon icon-jiance" ></em><em class="icon icon-cur icon-jiance-svg" ></em>监测
          </router-link>
        <!-- <router-link :class="{cur:navIndex== 4}" class="router-link" to="/calendar/index">
          <em class="icon icon-leidasaomiao" ></em><em class="icon  icon-cur icon-leidasaomiao-svg14" ></em>雷达
        </router-link> -->
        <router-link  class="router-link" to="/qzh/index"  @click.native="$cnzzFn('左侧导航', '点击', '千纸鹤')">
          <em class="icon icon-fenxiang1" ></em><em class="icon icon-cur icon-fenxiang" ></em>千纸鹤
        </router-link>
        <!-- <router-link class="router-link" to="/notary/index">
          <em class="icon icon-fenxiang1" ></em><em class="icon icon-cur icon-fenxiang" ></em>标证通
        </router-link>  -->
        <router-link class="router-link" to="/name/index"  @click.native="$cnzzFn('左侧导航', '点击', '商标起名')">
          <em class="icon icon-shangbiao" ></em><em class="icon icon-cur icon-shangbiao-shixin" ></em>商标起名
        </router-link>
        <!-- <router-link class="router-link" to="/complain"  >
          <em class="icon icon-yijianfankui1" ></em><em class="icon icon-cur icon-yijianfankui" ></em>意见反馈
        </router-link> -->
        <router-link class="router-link" to="/patent/index"  @click.native="$cnzzFn('左侧导航', '点击', '专利资源')">
          <em class="icon icon-zhuanli" ></em><em class="icon icon-cur icon-zhuanlichaxun" ></em>专利资源
        </router-link>
      </div>
    </div>
  </div>

  <!-- 底部信息 -->
  <div class="holder-box">
    <!-- 下载任务 -->
    <div class="down-btn" btn @click.stop="downLayerShowFn(true)" >
      <em class="icon icon-download"></em><div class="circle" v-if="isDownloading == 1 && !downError" ></div><div class="circle green" v-if="isDownloading == 0 && !downError" ></div>
      <!--下载列表-->
      <div class="down-layer" @click.stop="" v-show="this.$store.state.downShow" >
        <header class="header">
          <div class="tit"><em class="icon icon-download"></em>下载任务</div>
          <p class="info">已生成的文件仅保留30天</p>
          <a href="javascript:void(0)" class="close" @click.stop="downLayerShowFn(false)" >
            <i class="icon icon-close"></i>
          </a>
        </header>
        <div class="down-list"  >
          <ul class="ul">
            <li class="li" v-for="(item, index) in downList" :key="index"  >
              <h3>
                <em class="icon icon-PDF" v-show="item.sign.indexOf('Pdf') != -1" ></em>
                <em class="icon icon-excel" v-show="item.sign.indexOf('Xls') != -1"></em>
                <span class="name">{{item.title}}</span>
                <em v-show="item.status == 1" class="outing">生成中</em>
                <em v-show="item.status == 3" class="outing gray">已生成</em>
                <em v-show="item.status == 4" class="outing red">生成失败</em></h3>
              <div class="edit-box" >
                <span class="type">{{item.type}}</span>
                <span btn @click.stop="downDelFn(item.download_id, index)"  v-show="item.status == 3 || item.status == 4"  class="btn">删除</span>
                <span btn class="btn" @click.stop="downFn(item.file)"  v-show="item.status == 3"  >下载</span>
              </div>
            </li>
          </ul>
          <div v-show="downLoading" class="down-loading"  >
            <loading></loading>
          </div>
          <dl class="common-search-error" v-show="!downLoading && downList.length == 0">
            <dt class="icon icon-empty1"></dt>
            <dd  class="search-txt">暂无下载任务</dd>
          </dl>
          <div v-show="!downLoading && (downPageAll > (downPageId - 1))" btn class="common-get-more" @click="getDownFn(false)" >加载更多</div>
        </div>
      </div>
      <!--/下载列表-->
    </div>
    <!-- /下载任务 -->
    <!-- 个人信息 -->
    <!-- <div class="person" v-if="user!='' && types!='report' && types!='doc' && types!='detail'"> -->
    <div class="person" btn >
      <span @click.stop="personSliderFn"><span class="img_box photo"  v-if="is_default_headimg == 1 && user.title">{{user.title.substring(0,1)}}</span><span class="img_box photo" :class="{white: is_default_headimg != 1}" v-if="is_default_headimg != 1"><img class="img" :src="headerImg" alt=""></span></span>
      <div class="slider_box holder-box " v-if="navLayerShow == 'personSlider'" @click.stop="personShowFn">
        <div class="section">
          <div class="name">{{user.title}}</div>
          <div class="option">{{user.orginfo.title}}</div>
        </div>
        <div class="section">
          <router-link to="/team/myreq" class="list">我的团队申请</router-link>
          <a href='javascript:void(0)' class="list" @click.stop="complainFn">意见反馈</a>
          <a href='javascript:void(0)' class="list" @click.stop="personalFn()">个人资料</a>
        </div>
        <div class="section">
          <a href='javascript:void(0)' class="list" @click="exitFn">退出登录</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!--意见反馈-->
    <div class="complain_layer layer w420" v-if="layerShow == 'complain' ">
      <a href="javascript:void(0)" class="close" @click="closeFn"><i class="icon icon-close"></i></a>
      <div class="tit">意见反馈</div>
      <div class="area_box">
        <textarea placeholder="请输入问题描述" v-model="complainContent"></textarea>
      </div>
      <div class="btn_box">
        <span class="err">{{complainErr}}</span>
        <a href="javascript:void(0)" class="btn_2" @click="complainSubmitFn">确定</a>
      </div>
    </div>
    <!--/意见反馈-->

<!--个人资料-->
<div class="layer layer-personal" v-show="layerShow == 'personnal'" >
    <a href="javascript:void(0)" class="close" @click="closeFn()"><i class="icon icon-close"></i></a>
    <div class="tit">个人资料</div>
    <section class="personal-main" >
      <table>
        <tr>
          <th>头像</th>
          <td>
            <div class="head-box">
                <div v-show="is_default_headimg == 1" class="default">{{user.title && user.title.substr(0,1)}}</div>
                <div v-show="is_default_headimg != 1" class="img-box">
                  <img class="img" :src="headerImg" alt="">
                </div>
                <label btn class="up-head">上传图片<input @change="headFileFn" ref="headerImg" class="file" type="file"></label>
                <div btn class="default-btn" @click="imgDefaultFn" >使用默认</div>
            </div>
            
          </td>
        </tr>
        <tr>
          <th>联系电话</th>
          <td>
            <input type="text" maxlength="11" v-model="personForm['mobile']" class="input" placeholder="选填" >
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
      <p class="error"  >{{holderErr}}</p>
      <a href="javascript:void(0)" class="btn_2" @click="userSubmitFn">确定</a>
    </div>
    <!-- <fixed-slot-action ref="downDelFixed">
      <div class="down-del"  >
        <h3 class="down-title">确认删除</h3>
        <div class="button-box">
          <span btn class="blue" @click.stop="downDelFn();" >确定</span>
          <span btn class="red" @click.stop="downDelNoneFn()" >取消</span>
        </div>
      </div>
    </fixed-slot-action> -->
</div>
<!--/个人资料-->


<div class="mask" v-show="layerShow != ''" ></div>
</div>
</template>

<script src="./commonNav.js" ></script>

<style lang="scss" scoped >
@import '@/assets/sass/base.scss';

.common-nav{
  @extend %shadow; @include flex(both, center);
  position: fixed;  box-sizing: border-box;  flex-direction: column;
  left:0; top:0; height:100vh; width:70px; padding-top: 10px; z-index:90;
  background-color: $white;
  .logo{
    @extend .radius;
    position: relative;
    width: 30px; height: 30px; margin:0 auto 10px; padding:6px 11px;
    .img{
      display: block;
      width: 100%; 
    }
    &:hover{
      background-color: $bg;
    }
  }
}

.nav-list{
  width: 50px;
  margin:0 auto;
  &.ovh{
    overflow-y: hidden;
  }
  .router-link{
    @extend .radius; @include flex(center);
    display: block; text-align: center; box-sizing: border-box; position: relative;
    width: 50px; height: 50px; margin-bottom: 10px; padding-top: 2px;
    font-size: 12px; 
    color:$inpcol;
    &:hover{
      background-color: $bg;
      .child-nav-list{
        display: block;
        a{
          display: block;
        }
      }
    }
    .icon{
      display: block;
      font-size: 24px; height:26px; line-height: 26px;
      color:$red2;
    }
    .icon-cur{
      display: none;
    }
    &.cur{
       background-color: $bg;
      .icon{
        display: none;
      }
      .icon-cur{
        display: block;
      }
    }
  }
  .child-nav-list{
    @extend .radius; @extend %shadow;
    top: 140px; left:60px; width: 150px; padding:4px 0;
    background-color: $white;
    .li{
      box-sizing: border-box; text-align: left;
      width: 100%; height:30px; font-size: 14px; padding-left: 15px; line-height: 30px;
      color:$txtgray1;
      &:hover{
        background-color: $bg;
      }
    }
  }
}
.nav-more{
  @extend .nav-list;
  position: relative;
  .nav-layer-show{
    @extend .radius; @extend %shadow; @include flex(left, center);
    position: absolute;  box-sizing: border-box; display: none;
    bottom:0; left:48px; width: 220px; height: 196px; padding: 15px;
    background-color: $white;
  }
  .router-link{
    margin-right: 20px;
    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
  .show-btn{
    @extend .radius;
    text-align: center; box-sizing: border-box;
    font-size: 12px; width: 50px; height: 50px; padding-top: 2px; 
    color: $inpcol; 
    
    .icon{
      display: block;
      font-size: 24px;
    }
    &:hover{
      background-color: $bg;
    }
  }
  &:hover{
    .nav-layer-show{
      display: flex;
    }
  }
}

.holder-box{
   width: 100%; padding-bottom: 30px;
}


.person{
  cursor:pointer; position: relative;
  z-index: 5; width: 30px; margin:0 auto ;
  color: #7F7F7F;
  .img_box{
    overflow: hidden;
    margin:10px 5px 0 0;
    .img{
      display: block;
      width: 100%; height: 100%;
    }
  }
  .icon{
    vertical-align: top;
    font-size: 12px;
    color: #aaa;
  }
}
.slider_box{
  @extend .radius;
  position: absolute; cursor:default; text-align: left;
  width:200px;z-index: 6; left: 40px; padding-bottom: 0;
  box-shadow:0px 0px 10px #E1E6EF; background: #fff;
  &.holder-box{
    bottom:0;  
  }
  &.team-box{
    top:0;
  }
  .icon-yes{
    font-size: 14px; margin-right: 10px;
    color:$red2 !important;
  }
  .section{
    box-sizing:border-box;
    padding:4px 0;width:100%;
    border-bottom: 1px solid #e9e9e9;
    &.scroll{
      max-height: 110px; overflow-y: scroll; overflow-y: overlay !important;
    }
    &:last-child{
      border-bottom: 0;
    }
    .icon{
      font-size: 18px;
      color:$inpcol; margin-right: 10px;
    }
    .name,.option,.list{
      padding:0 15px;
      &.name{
        color: #333;font-weight: bold;
      }
      &.list{
        cursor: pointer;display: block;
        line-height:34px;
        &:hover{
          background: #ECEEF2;
        }
      }
    }
    .name,.option{
      line-height: 28px;
    }
  }
}

.down-btn{
  position: relative;  text-align: center;
  height:30px; width: 30px; margin:0 auto 10px;  padding:6px 11px;
  @extend .radius;
  .icon{
    vertical-align: top;
    font-size: 24px;
    color: #A2A7B0;
  }
  .circle{
    position: absolute;
    width:8px; height: 8px; border-radius: 50%;top:6px; right: 10px;
    background: #FB717E; 
    &.green{
      background-color: $green;
    }
  }
  .common-search-error{
    .icon{
      font-size: 54px;
      color:#d7d7d7;
    }
  }
  &:hover{
    background-color: $bg;
  }
}

.down-layer{
  @extend .radius; @extend .shadow;
  position: absolute; box-sizing: border-box; text-align: left; cursor: auto;
  width: 320px; padding:15px 0; bottom:0; left:40px;
  background-color: $white;
  .header{
    padding:0 15px 15px;
    border-bottom:1px solid $border;
    .tit{ 
      font-weight: bold;
      line-height: 20px; padding-bottom:10px;
      .icon{
        margin-right: 14px; font-size: 20px; line-height: 20px; vertical-align: middle;
        color:$inpcol; 
      }
    }
    .close{
      position: absolute;
      right:18px;top: 18px; 
      .icon{color: #aaa; font-size: 16px; font-weight: bold; }
    }
    .info{
      font-size: 12px;
      color:$txtgray2;
    }
  }
  .down-list{
    overflow-y: auto;
    height:355px;
    .li{
      font-size: 12px; padding:10px;
      color: #333; border-bottom:1px solid $border;
      &:hover{
        background-color: $bg;
      }
      .h3{
        overflow: hidden;
      }
      .name{
        @extend %hold;
        width: 180px;
        display: inline-block;
      }
      .icon-PDF{
        color: $red2;
      }
      .icon-excel{
        color: $green;
      }
      .icon{
        text-align: center;
        font-size: 20px; margin-right: 10px; width:22px;
      }
      .outing{
        float: right;
        font-size: 12px;
        color:$green;
        &.red{
          color:$red1;
        }
        &.gray{
          color: $txtgray2;
        }
      }
      .edit-box{
        margin-top: 6px; font-size: 12px; padding-left: 32px;
        overflow: hidden;
        .btn{
          float: right;
          margin-left: 10px; 
          color:$blue; 
          &:hover{
            color:$bluehover;
          }
        }
        .type{
          color: $inpcol;
        }
      }
    }
  }
}

.layer-personal{
  width: 460px;
  .personal-main{
    width: 100%;
    table{
      width: 100%;
    }
    th,td{
      padding-bottom: 10px;
    }
    th{
      text-align: left;
      width: 80px; padding-left: 10px;
      color:$inpcol;
    }
    td{
      text-align: left;
    }
    .input{
      @extend .radius;
      box-sizing: border-box;
      width: 290px; height: $inpzhong; line-height: $inpzhong; padding-left: 10px;
      background-color: $inpbg;
    }
  }
  .head-box{
    @include flex(both, center);
    width: 290px; margin-bottom: 24px;
    .default{
      text-align: center; 
      width: 100px; height: 100px; line-height: 100px; font-size: 50px; border-radius: 50%;
      background-color: $inpcol; color:$white;
    }
    .img-box{
      overflow: hidden; box-sizing: border-box;
      width: 100px; height: 100px; border-radius: 50%;
      border:1px solid $inpbg;
      .img{
        display: block;
        width: 100%; height: 100%;
      }
    }
    .up-head{
      @extend .radius;
      text-align: center; box-sizing: border-box;
      width: 80px; height: 30px; line-height: 30px;
      background-color: $red2; color:$white;
      .file{
        position: absolute;
        left:-999px; top:-999px; 
      }
    }
    .default-btn{
      @extend .up-head;
      background-color: $white; border:1px solid $inpbg; color: $txtgray1; line-height: 28px;
      &:hover{
        border-color: $txtgray1;
      }
    }
  }
  .btn_box{
    @include flex(both, center);
    margin-top: 20px; padding-top: 19px;
    border-top:1px solid $inpbg;
    .error{
      text-align: left;
      color:$red2;
    }
    
  }
}


.down-del{
  @extend .radius; @extend .shadow;
  width:170px; height:90px;
  background-color: $white;
  .down-title{
    text-align: center; 
    padding:15px;
  }
  .button-box{
    @include flex(both, center);
    width: 100px; font-size: 16px; margin:0 auto;
  }
  .red{
    color:$red1;
    &:hover{
      color:$red1hover;
    }
  }
  .blue{
    color:$blue;
    &:hover{
      color:$bluehover;
    }
  }
}

</style>