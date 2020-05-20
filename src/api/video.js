import { post, get, del } from "../utils/request";

/**
 *
 * @param {上传视屏} data
 */
export const addVideo = (data) => {
  return post("video/postvideo", data);
};
/**
 * 获取个人上传的所有视屏
 */
export const getVideo = () => {
  return get(`video/getvideo`);
};

/**
 * change video title
 */
export const updateVideoCaption = (data) => {
  return post("video/updatevideo", data);
};

/**
 * delete video post
 */
export const deleteVideoPost = (data) => {
  return del("video/deletevideo", data);
};
