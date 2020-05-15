import { post } from "../utils/request";
/**
 * 管理员添加广告
 */
export const addAdv = (data) => {
  return post("admin/insert/adv", data);
};
