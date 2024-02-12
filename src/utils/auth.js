import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

// 获取令牌（token）的函数
export function getToken() {
  return Cookies.get(TokenKey)
}

// 设置令牌（token）的函数
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除令牌（token）的函数
export function removeToken() {
  return Cookies.remove(TokenKey)
}
