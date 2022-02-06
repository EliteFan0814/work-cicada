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
    },
    token: (state) => state.token
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
      return new Promise((resolve, reject) => {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmljayI6IuiMg-Wfuei2hSIsImF2YXRhciI6Imh0dHA6Ly93ZXdvcmsucXBpYy5jbi9iaXptYWlsL1RwNDM4YW40Y3oxY056ZU5zRkYxTmQ2bEJNREcxWmpoWUdLRFc4dWpXampTZVJuUnlma2J6QS8wIiwiZXhwIjoxNjQ0MTUxMzE1fQ.fKFq7SAZRAkDtZWqeqC_VFOASV-itqKgyFcdKy1km0s'
        commit('SET_TOKEN', token)
        commit('SET_SHOW_LOGIN', true)
        setToken(token)
        resolve()
      })

      // const { username, password } = userInfo
      // return new Promise((resolve, reject) => {
      //   login({ username: username.trim(), password: password })
      //     .then((response) => {
      //       const { data } = response
      //       commit('SET_TOKEN', data.token)
      //       setToken(data.token)
      //       resolve()
      //     })
      //     .catch((error) => {
      //       reject(error)
      //     })
      // })
    }
  },
  modules: {}
})
