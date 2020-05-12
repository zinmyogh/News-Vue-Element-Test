import axios from "axios";
import BaseURL from "../api/default";
// import { MessageBox, Message } from "element-ui";
// import store from "@/store";
// import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: BaseURL.BaseUrl, // url = base url + request url
  // // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    console.log("0");
    console.log(config.url);
    if (config.url != "user/login" || config.url != "user/register") {
      config.headers["authorization"] = localStorage.token;
    }
    console.log("1");
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    console.log("2");
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

//封装get请求
export function get(url) {
  // console.log("req: req", url);
  //默认配置
  let sendObject = {
    url: url,
    method: "get",
  };
  return service(sendObject);
}

//封装post请求
export function post(url, data) {
  // console.log("req: req", url, data);
  //默认配置
  let sendObject = {
    url: url,
    method: "post",
    // headers: {
    //   "Content-Type": "application/json;charset=UTF-8",
    // },
    data: data,
  };
  // sendObject.data = JSON.stringify(data);
  return service(sendObject);
}

//封装delete请求
export function upd(url, data) {
  console.log("req: upd: ", url, data);
  //默认配置
  let sendObject = {
    url: url,
    method: "put",
    data: data,
  };
  return service(sendObject);
}

//封装delete请求
export function del(url, data) {
  // console.log("req: req", url, data);
  //默认配置
  let sendObject = {
    url: url,
    method: "delete",
    data: data,
  };
  return service(sendObject);
}

export { service };
