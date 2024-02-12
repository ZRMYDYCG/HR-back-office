import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api'
const state = {
  token: getToken(), //  a. token 登录状态
  userInfo: {} //  b. userInfo 用户信息状态
}

const mutations = {
  SETTOKEN(state, data) {
    state.token = data
    setToken(data) // token 持久化处理
  },
  LOGOUT(state) {
    state.token = null
    removeToken()
  },
  FETCHUSERINFO(state, data) {
    state.userInfo = data
  }
}

const actions = {
  // 用户登录
  async setToken({ commit }, data) {
    console.log(data) // 表单数据
    const res = await login(data)
    console.log(res)
    commit('SETTOKEN', res)
  },
  // 获取用户的信息
  async fetchUserInfo({ commit }) {
    const res = await getUserInfo()
    console.log(res)
    commit('FETCHUSERINFO', res)
  },
  // 用户登出操作
  logout({ commit }) {
    commit('LOGOUT') // 删除 token
    commit('FETCHUSERINFO', {}) // 清空用户信息
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
