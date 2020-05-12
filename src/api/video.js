import { post } from "../utils/request";

export const addvideo = (data) => {
  console.log("video: ", data);
  return post("video/postvideo", data);
};
