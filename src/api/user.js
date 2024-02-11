import request from '@/utils/request'

export const login = (data) => request({ url: '/sys/login', method: 'post', data })

export const getUserInfo = () => request({ url: '/sys/profile', method: 'get' })

export const updatePassword = (data) => request({ url: '/sys/user/updatePass', method: 'put', data })
