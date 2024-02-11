import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 注入 token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  // 返回的结果 response 默认包裹了一层 data
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message }) // 错误弹框提示
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  // debugger => 调试结果为 token 失效在这处理
  if (error.response.status === 401) {
    // 错误弹框提示
    Message({ type: 'error', message: '长时间未登录，请重新登录' })
    // 调用退出登录的 action
    await store.dispatch('user/logout')
    // 主动跳转到登录页
    router.push('/login')
    return Promise.reject(error)
  }
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})

export default service
