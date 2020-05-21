const state = {
  lang: localStorage.lang || "cn",
};

const mutations = {
  switchLang(state, lang) {
    state.lang = lang;
    window.app.$i18n.locale = lang;
    localStorage.setItem("lang", lang);
  },
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
