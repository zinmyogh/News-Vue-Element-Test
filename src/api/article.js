import { get, post, upd, del } from "../utils/request";

/**
 * 获取个人上传的文章 by ID
 */
export const getArticleByID = (data) => {
  // console.log("apiPi get article by ID: ", data);
  return post(`article/getarticlebyid`, data);
};

/**
 * 获取个人上传的文章 by Hot
 */
export const getHotArticle = (data) => {
  // console.log("apiPi get hot article: ", data);
  return get(`article/gethotarticle`, data);
};

/**
 * 获取个人上传的所有文章
 */
export const getArticle = () => {
  // console.log("apiPi get article: ");
  return get(`article/getarticle`);
};

/***
 * 上传文章
 */
export const addArticle = (data) => {
  // console.log("apiPi article: ", data);
  return post(`article/postarticle`, data);
};

/**
 * 获取个人上传的所有文章
 */
export const deleteArticle = (data) => {
  // console.log("apiPi del article: ", data);
  return del(`article/deletearticle`, data);
};
/**
 * 更改文章标题和内容
 */
export const updateArticle = (data) => {
  // console.log("apiPi del article: ", data);
  return upd(`article/updatearticle`, data);
};
