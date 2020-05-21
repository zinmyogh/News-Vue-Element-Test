import { post, get, upd, del } from "../utils/request";
/**
 *添加分类标题
 */
export const addCty = (data) => {
  return post(`admin/add/category`, data);
};

/**
 *获取所有分类标题
 */
export const getCty = () => {
  return get(`admin/get/category`);
};

/**
 *更改分类标题名
 */
export const updCty = (data) => {
  return upd(`admin/update/category`, data);
};

/**
 *删除分类标题
 */
export const delCty = (data) => {
  return del(`admin/delete/category`, data);
};

/**
 *上传图片
 */
export const adminImage = (data) => {
  console.log("admin add image : ", data);
  return post(`admin/adminimage`, data);
};
