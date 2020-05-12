/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueQuillEditor from "vue-quill-editor";
// import axios from "axios";
// import request from "./utils/request";

import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme
// import "./permission";

// import scroll from "vue-seamless-scroll/src";
// Vue.use(scroll);

Vue.use(VueQuillEditor /* { default global options } */);

// const http = axios.create({
//   baseURL: "http://192.168.0.106:3000",
//   timeout: 10000,
// });
// Vue.prototype.$request = request;

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
