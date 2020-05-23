import { get, post } from "../utils/request";
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
  return post(`user/adduserinfo`, data);
};

/***
 * 修改密码
 */
export const changePass = (data) => {
  return post(`user/changepass`, data);
};

/***
 * 获取followers
 */
export const getFollowers = () => {
  return get(`follow/getfollowers`);
};
/***
 * 获取follow
 */
export const getFollow = () => {
  return get(`follow/getfollow`);
};
/***
 * 获取follow
 */
export const getTotalLike = () => {
  return get(`user/gettotallike`);
};
/***
 * 获取发表文章总数
 */
export const getArticlePostCount = () => {
  return get(`user/getarticlepostcount`);
};

/**
 *获取adminimage
 */
export const getAdminImage = () => {
  return get(`user/getadminimage`);
};

/**
 *获取adminpublic
 */
export const getAdminPublic = () => {
  return get(`user/getadminpublic`);
};
