/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueQuillEditor from "vue-quill-editor";
import dateDiff from "./utils/time";

import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme

Vue.use(VueQuillEditor /* { default global options } */);

Vue.use(ElementUI);

Vue.config.productionTip = false;

// import Moment from "moment";

// 定义全局时间戳过滤器
Vue.filter("time", dateDiff);
// Vue.filter("removeHtml", (input) => {
//   return (
//     input &&
//     input
//       .replace(/<(?:.|\n)*?>/gm, "")
//       .replace(/(&rdquo;)/g, '"')
//       .replace(/&ldquo;/g, '"')
//       .replace(/&mdash;/g, "-")
//       .replace(/&nbsp;/g, "")
//       .replace(/&gt;/g, ">")
//       .replace(/&lt;/g, "<")
//       .replace(/<[\w\s"':=\/]*/, "")
//   );
// });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
