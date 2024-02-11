const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 用户登录接口取用
  userId: state => state.user.userInfo.userId, // 路由前置导航取用
  avatar: state => state.user.userInfo.staffPhoto, // 用户头像取用
  name: state => state.user.userInfo.username // 用户昵称取用
}
export default getters
