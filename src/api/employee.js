import service from '@/api/index'

export const apiGetEmployeeList = (params) => {
  return service({
    url: '/sys/user',
    params
  })
}

/**
 * 导出员工excel表
*/
export const apiExportEmployee = () => {
  return service({
    url: '/sys/user/export',
    responseType: 'blob'
  })
}
