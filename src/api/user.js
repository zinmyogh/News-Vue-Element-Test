import request from "../utils/request";
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

// export function Login(data) {
//   console.log("api user: ", data);
//   return request({
//     url: "user/login",
//     method: "post",
//     data,
//   });
// }

export function getInfo(token) {
  return request({
    url: "user/getuserinfo",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/vue-element-admin/user/logout",
    method: "post",
  });
}
