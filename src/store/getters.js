const getters = {
  token: (state) => state.user.token,
  info: (state) => state.user.info,
  phone: (state) => state.user.phone,
  profile: (state) => state.user.profile,
  name: (state) => state.user.userName,
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,
  permission_routes: (state) => state.permission.routes,
};
export default getters;
