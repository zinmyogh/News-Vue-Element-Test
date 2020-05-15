import { post } from "../utils/request";
/**
 *
 * @param {vuex, 登录} data
 */
export const Login = (data) => {
  console.log("apiPi: ", data);
  return post(`user/login`, data);
};
/***
 * vuex
 * 添加用户信息{用户名，励志短语}
 */
export const SetInfo = (data) => {
  console.log("apiPi: ", data);
  return post(`user/adduserinfo`, data);
};

/***
 * 修改密码
 */
export const changePass = (data) => {
  console.log("apiPi: ", data);
  return post(`user/changepass`, data);
};
