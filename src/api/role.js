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

/**
 * 更新角色数据
*/
export const updateRole = (data) => {
  return service({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除角色
*/
export const delRole = (id) => {
  return service({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
