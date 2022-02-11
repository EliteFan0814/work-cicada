import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录状态
    isLogin: !!getToken(),
    // 登录弹框的展示
    showLoginDialog: false,
    // 获取token
    token: getToken()
  },
  getters: {
    isLogin: (state) => state.isLogin,
    showLoginDialog: (state) => state.showLoginDialog,
    token: (state) => state.token
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_IS_LOGIN: (state, isShow) => {
      state.isLogin = isShow
    },
    SET_IS_LOGIN_DIALOG: (state, isShow) => {
      state.showLoginDialog = isShow
    }
  },
  actions: {
    // 用户登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const token =
          // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmljayI6IuiMg-Wfuei2hSIsImF2YXRhciI6Imh0dHA6Ly93ZXdvcmsucXBpYy5jbi9iaXptYWlsL1RwNDM4YW40Y3oxY056ZU5zRkYxTmQ2bEJNREcxWmpoWUdLRFc4dWpXampTZVJuUnlma2J6QS8wIiwiZXhwIjoxNjQ0NDA5OTI1fQ.pjUrYqbd_X7ILLX03csrpqcNqLKVgfFIhVPsuVVUjhY'
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmljayI6IuiMg-Wfuei2hSIsImF2YXRhciI6Imh0dHA6Ly93ZXdvcmsucXBpYy5jbi9iaXptYWlsL1RwNDM4YW40Y3oxY056ZU5zRkYxTmQ2bEJNREcxWmpoWUdLRFc4dWpXampTZVJuUnlma2J6QS8wIiwiZXhwIjoxNjQ0NTg0Mzg0fQ.vRI2LhDShxo1Wlmm1AqrRVDS7WCTWGJBG8aoM1wBo6E'
        commit('SET_TOKEN', token)
        commit('SET_IS_LOGIN', true)
        commit('SET_IS_LOGIN_DIALOG', false)
        // 存token到cookie
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
    },
    // 用户登出
    logout({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_IS_LOGIN', false)
        commit('SET_IS_LOGIN_DIALOG', true)
        removeToken()
        resolve()

        // logout(state.token)
        //   .then(() => {
        //     commit('SET_TOKEN', '')
        //     removeToken()
        //     resolve()
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
      })
    }
  },
  modules: {}
})
