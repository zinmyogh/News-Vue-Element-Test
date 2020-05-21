/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueQuillEditor from "vue-quill-editor";
import filters from "./utils/filters";
import i18n from "./i18n/i18n";
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme

Vue.use(VueQuillEditor /* { default global options } */);

Vue.use(ElementUI);

Vue.config.productionTip = false;

// 定义全局时间戳过滤器
// Vue.filter("time", dateDiff);
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]));

window.app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
