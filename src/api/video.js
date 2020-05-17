import { post, get, del } from "../utils/request";

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

/**
 * change video title
 */
export const updateVideoCaption = (data) => {
  console.log("api change video title: ", data);
  return post("video/updatevideo", data);
};

/**
 * delete video post
 */
export const deleteVideoPost = (data) => {
  console.log("api delete video post: ", data);
  return del("video/deletevideo", data);
};
