import service from '@/api/index'

export const apiGetEmployeeList = (params) => {
  return service({
    url: '/sys/user',
    params
  })
}
