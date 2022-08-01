#### 开发环境注意事项

1. 请修改本地 hosts:
   将 iknow.d.gbicom.com 绑定到本地 localhost：
   127.0.0.1 iknow.d.gbicom.com

#### 目录说明

```
│  App.vue
│  main.js
│  permission.js                  路由前置守卫
├─api                                 请求接口
├─assets                            资源
├─baseComponents            基础组件
├─components                   组件
├─mixins                           混入
├─router                            路由
├─store                             状态管理
├─utils
│      auth.js
│      globalRegistComp.js                  全局注册组件
│      globaltools.js                            全局可用工具函数
│      request.js                                 axios请求封装
│      waves.js                                   首页波浪效果
│      whiteList.js                               免登录弹框白名单
│
└─views                            各页面组件
    │  404.vue
    │  About.vue
    │  Graphics.vue
    │  Home.vue
    │
    ├─trademarkAnalyse
    ├─trademarkBusiness
    ├─trademarkBusinessGet
    ├─trademarkDetail
    ├─trademarkSearch
    └─trademarkWatch
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
