import { post, get, del } from "../utils/request";

/**
 * 上传动态朋友圈
 */
export const addMoment = (data) => {
  return post("moment/add/moment", data);
};

/**
 * 获取个人上传的所有动态朋友圈
 */
export const getMoment = () => {
  return get(`moment/getmoment`);
};

/**
 * 获取个人上传的所有动态朋友圈
 */
export const deleteMoment = (data) => {
  return del(`moment/deletemoment`, data);
};
