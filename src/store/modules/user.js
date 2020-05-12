import { Login, SetInfo, getInfo, logout } from "@/api/user";
import { setToken, removeToken } from "../../utils/auth";
import { resetRouter } from "../../router";

// const info = {
//   userID: "",
//   userName: "",
//   phone: "",
//   password: "",
//   profilePic: "",
//   introduction: "",
// };
const state = {
  token: "",
  userID: "",
  userName: "",
  phone: "",
  password: "",
  profilePic: "",
  introduction: "",
  // info: info,
  roles: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    localStorage.setItem("token", token);
    state.token = token;
  },
  // SET_INFO(state, payload) {
  //   state.info = payload;
  //   console.log("userinfo: ", state.info);
  // },
  SET_NAME: (state, userName) => {
    console.log("mutations; ", userName);
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
  // user login
  login({ commit }, userInfo) {
    const { phone, password } = userInfo;
    // console.log(phone, password);
    return new Promise((resolve, reject) => {
      // console.log("enter");
      Login({ phone: phone, password: password })
        .then((response) => {
          console.log("response", response.data);
          commit("SET_TOKEN", response.data.token);
          setToken(response.data.token);
          // commit("SET_NAME", response.info.phone);
          if (response.data.info.phone == "13100000000") {
            commit("SET_ROLES", ["admin"]);
            localStorage.setItem("roles", ["admin"]);
          } else {
            commit("SET_ROLES", ["editor"]);
            localStorage.setItem("roles", ["editor"]);
          }
          commit("SET_PHONE", JSON.parse(response.data.info.phone));
          // localStorage.setItem("phone", JSON.parse(response.data.info.phone));
          commit("SET_NAME", response.data.info.userName);
          // localStorage.setItem("userName", response.data.info.userName);
          commit("SET_INTRODUCTION", response.data.info.introduction);
          // localStorage.setItem("introduction", response.data.info.introduction);
          // commit("SET_INFO", response.data.info);
          // localStorage.setItem("info", response.data.info);
          // console.log(response.info.phone);
          resolve(response);
        })
        .catch((error) => {
          console.log("error lar");
          reject(error);
        });
    });
  },

  setInfo({ commit }, data) {
    const { userName, introduction } = data;
    return new Promise((resolve, reject) => {
      // console.log("enter");
      SetInfo({ userName: userName, introduction: introduction })
        .then((response) => {
          console.log("response", response.data.info.userName);
          commit("SET_NAME", response.data.info.userName);
          localStorage.setItem("userName", response.data.info.userName);
          commit("SET_INTRODUCTION", response.data.info.introduction);
          localStorage.setItem("introduction", response.data.info.introduction);
          // commit("SET_INFO", JSON.stringify(localStorage.token));
          // localStorage.setItem("info", JSON.stringify(response.data.info));
          resolve(response);
        })
        .catch((error) => {
          console.log("error lar");
          reject(error);
        });
    });
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const { roles, name, avatar, introduction } = data;

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject("getInfo: roles must be a non-null array!");
          }

          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_INTRODUCTION", introduction);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          removeToken();
          resetRouter();

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch("tagsView/delAllViews", null, { root: true });

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
