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
  // axios默认包裹了data
  // 判断是不是Blob
  if (response.data instanceof Blob) return response.data // 返回了Blob对象
  const { data, message, success } = response.data // 默认json格式
  if (success) {
    console.log(data)
    return data
  } else {
    Message({ type: 'error', message })
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

/**
  * 用户模块
  * login 登录
  * getUserInfo 获取用户信息
  * updatePassword 修改密码
***/

export const login = (data) => service({ url: '/sys/login', method: 'post', data })

export const getUserInfo = () => service({ url: '/sys/profile', method: 'get' })

export const updatePassword = (data) => service({ url: '/sys/user/updatePass', method: 'put', data })

/**
  * 组织架构模块
  * getDepartment 获取组织架构数据
  * getManagerList 获取负责人下拉列表数据
  * addDepartment 新增组织
  * apiGetDepartmentDetail 获取部门详情
  * apiUpdataDepartmentData 更新部门信息接口
***/
export const getDepartment = () => service({ url: '/company/department', method: 'get' })

export const getManagerList = () => service({ url: '/sys/user/simple', method: 'get' })

export const addDepartment = (data) => service({ url: '/company/department', method: 'post', data })

export const apiGetDepartmentDetail = (id) => service({ url: '/company/department/' + id, method: 'get' })

export const apiUpdataDepartmentData = (data) => service({ url: '/company/department/' + data.id, method: 'put', data })

export const apiDelteDepartment = (id) => service({ url: '/company/department/' + id, method: 'delete' })

