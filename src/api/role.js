import service from '@/api/index.js'

/**
 * 获取角色列表
*/
export const apiGetRoleList = (params) => {
  return service({
    url: '/sys/role',
    params
  })
}

/**
 * 新增角色
*/
export const addRole = (data) => {
  return service({
    url: '/sys/role',
    method: 'post',
    data
  })
}
