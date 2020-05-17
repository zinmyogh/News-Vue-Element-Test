import { post, get, del } from "../utils/request";

/**
 * 上传动态朋友圈
 */
export const addMoment = (data) => {
  console.log("moment api: ", data);
  return post("moment/add/moment", data);
};

/**
 * 获取个人上传的所有动态朋友圈
 */
export const getMoment = () => {
  console.log("apiPi get moment: ");
  return get(`moment/getmoment`);
};

/**
 * 获取个人上传的所有动态朋友圈
 */
export const deleteMoment = (data) => {
  console.log("apiPi del moment: ", data);
  return del(`moment/deletemoment`, data);
};
