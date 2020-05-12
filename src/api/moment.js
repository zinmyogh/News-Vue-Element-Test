import { post } from "../utils/request";

export const momentUpl = (data) => {
  console.log("moment api: ", data);
  return post("moment/add/moment", data);
};
