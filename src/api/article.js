import { post } from "../utils/request";

/***
 * 上传文章
 */
export const articleUpload = (data) => {
  console.log("apiPi article: ", data);
  return post(`article/postarticle`, data);
};
