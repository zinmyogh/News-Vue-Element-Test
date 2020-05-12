import { post, get, upd, del } from "../utils/request";
/**
 *添加分类标题
 */
export const addCty = (data) => {
  // console.log("api addCty: ", data);
  return post(`admin/add/category`, data);
};

/**
 *获取所有分类标题
 */
export const getCty = () => {
  // console.log("apiPi getCty: ");
  return get(`admin/get/category`);
};

/**
 *更改分类标题名
 */
export const updCty = (data) => {
  console.log("apiPi updCty: ", data);
  return upd(`admin/update/category`, data);
};

/**
 *删除分类标题
 */
export const delCty = (data) => {
  // console.log("apiPi delCty: ", data);
  return del(`admin/delete/category`, data);
};
