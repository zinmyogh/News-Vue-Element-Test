import { post, get } from "../utils/request";

/**
 *
 * @param {上传视屏} data
 */
export const addVideo = (data) => {
  console.log("video: ", data);
  return post("video/postvideo", data);
};
/**
 * 获取个人上传的所有视屏
 */
export const getVideo = () => {
  console.log("apiPi get video: ");
  return get(`video/getvideo`);
};
