import router from '@/router'
import nprogress from 'nprogress'
import store from '@/store'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  // 如果携带 token
  if (store.getters.token) {
    // 如果是要切换去登录页
    if (to.path === '/login') {
      // next(地址) 里面有地址，则不会执行路由的后置守卫
      next('/') // 中转到主页
      nprogress.done()
    } else {
      // 判断是否获取过资料
      if (!store.getters.userId) {
        // 注意：这是异步操作
        await store.dispatch('user/fetchUserInfo')
      }
      // 放过
      next()
    }
  } else {
    // 没有 token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nprogress.done()
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})
