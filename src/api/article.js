import { post, get } from "../utils/request";

/***
 * 上传文章
 */
export const addArticle = (data) => {
  console.log("apiPi article: ", data);
  return post(`article/postarticle`, data);
};

/**
 * 获取个人上传的所有文章
 */
export const getArticle = () => {
  console.log("apiPi get article: ");
  return get(`article/getarticle`);
};
