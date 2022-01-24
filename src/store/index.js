import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否是登录状态
    isLogin: false,
    token: getToken()
  },
  getters: {
    isLogin: (state) => {
      return state.isLogin
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SHOW_LOGIN: (state, isShow) => {
      state.isLogin = isShow
    }
  },
  actions: {
    // 用户登录
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((response) => {
            const { data } = response
            commit('SET_TOKEN', data.token)
            setToken(data.token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  },
  modules: {}
})
