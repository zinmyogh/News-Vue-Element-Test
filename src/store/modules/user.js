import { Login, SetInfo } from "@/api/user";
import { setToken } from "../../utils/auth";
import { Message } from "element-ui";

const state = {
  token: "",
  userID: "",
  userName: "",
  phone: "",
  password: "",
  profilePic: "",
  introduction: "",
  roles: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    localStorage.setItem("token", token);
    state.token = token;
  },
  SET_NAME: (state, userName) => {
    localStorage.setItem("userName", userName);
    state.userName = userName;
  },
  SET_ID: (state, userID) => {
    localStorage.setItem("userID", userID);
    state.userID = userID;
  },
  SET_PHONE: (state, phone) => {
    localStorage.setItem("phone", phone);
    state.phone = phone;
  },
  SET_PROFILE: (state, profile) => {
    localStorage.setItem("profile", profile);
    state.profile = profile;
  },
  SET_INTRODUCTION: (state, introduction) => {
    localStorage.setItem("introduction", introduction);
    state.introduction = introduction;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  login({ commit }, userInfo) {
    const { phone, password } = userInfo;
    return new Promise((resolve, reject) => {
      Login({ phone: phone, password: password })
        .then((response) => {
          commit("SET_TOKEN", response.data.token);
          setToken(response.data.token);
          if (response.data.info.phone == "13100000000") {
            commit("SET_ROLES", ["admin"]);
            localStorage.setItem("roles", ["admin"]);
          } else {
            commit("SET_ROLES", ["editor"]);
            localStorage.setItem("roles", ["editor"]);
          }
          commit("SET_PHONE", JSON.parse(response.data.info.phone));
          commit("SET_NAME", response.data.info.userName);
          commit("SET_INTRODUCTION", response.data.info.introduction);
          resolve(response);
        })
        .catch((error) => {
          Message.error({
            message: "手机或密码错误！",
          });
          return reject(error);
        });
    });
  },

  setInfo({ commit }, data) {
    const { userName, introduction } = data;
    return new Promise((resolve, reject) => {
      SetInfo({ userName: userName, introduction: introduction })
        .then((response) => {
          commit("SET_NAME", response.data.info.userName);
          localStorage.setItem("userName", response.data.info.userName);
          commit("SET_INTRODUCTION", response.data.info.introduction);
          localStorage.setItem("introduction", response.data.info.introduction);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
