import { post } from "../utils/request";

export const addAdv = (data) => {
  return post("admin/insert/adv", data);
};
