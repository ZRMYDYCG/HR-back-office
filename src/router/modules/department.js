import layout from '@/layout'

export default {
  // 路由信息
  path: '/department',
  component: layout, // 一级路由
  children: [{
    path: '', // 子路由 path 地址为空，表示默认二级路由
    component: () => import('@/views/department'),
    name: 'department', // 标记路由，也可以方便路由跳转
    meta: {
      icon: 'tree',
      title: '组织'
    }
  }]
}
