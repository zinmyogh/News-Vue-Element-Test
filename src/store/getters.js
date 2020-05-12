const getters = {
  // sidebar: state => state.app.sidebar,
  // size: state => state.app.size,
  // device: state => state.app.device,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  token: (state) => state.user.token,
  info: (state) => state.user.info,
  phone: (state) => state.user.phone,
  profile: (state) => state.user.profile,
  // avatar: state => state.user.avatar,
  name: (state) => state.user.userName,
  introduction: (state) => state.user.introduction,
  // introduction: state => state.user.introduction,
  roles: (state) => state.user.roles,
  permission_routes: (state) => state.permission.routes,
  // errorLogs: state => state.errorLog.logs
};
export default getters;
