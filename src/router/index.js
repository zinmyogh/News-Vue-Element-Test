import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";

import Adv from "../views/administrator/Adv";
import Img from "../views/administrator/Img";
import Cty from "../views/administrator/Cty";
import AdminAccount from "../views/administrator/AdminAccount";

// import ImgWeb from "../views/administrator/ImgWeb";
// import ImgApp from "../views/administrator/ImgApp";
// import MainContent from "../components/body/MainContent";
import MainBody from "../components/body/MainBody";
import CreateArticle from "../components/article/CreateArticle";
import CreateMoment from "../components/CreateMoment";
import CreateVideo from "../components/CreateVideo";
import Video from "../components/Video";

// import MyInfo from "../components/me/MyInfo";
import MyPost from "../components/me/MyPost";
import MyAccount from "../components/me/MyAccount";
import Photo from "../components/Photo";
import NotFound from "../views/error-page/404";

import Privacy from "../views/footer/Privacy";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { isPublic: true },
    // meta: { keepAlive: true },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { isPublic: true, keepAlive: true },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/mainbody",
    meta: {
      keepAlive: true,
      // roles: ["admin", "editor"]
    },
    children: [
      {
        path: "/mainbody",
        component: MainBody,
        meta: { keepAlive: true },
      },
      {
        path: "/createarticle",
        component: CreateArticle,
        meta: { keepAlive: true },
      },
      {
        path: "/createmoment",
        component: CreateMoment,
        meta: { keepAlive: true },
      },
      {
        path: "/createvideo",
        component: CreateVideo,
        meta: { keepAlive: true },
      },
      {
        path: "/video",
        component: Video,
        meta: { keepAlive: true },
      },
      {
        path: "/photo",
        component: Photo,
        meta: { keepAlive: true },
      },
      // {
      //   path: "/myinfo",
      //   component: MyInfo,
      //   meta: { keepAlive: true },
      // },
      {
        path: "/mypost",
        component: MyPost,
        meta: { keepAlive: true },
      },
      {
        path: "/myaccount",
        component: MyAccount,
        meta: { keepAlive: true },
      },
      {
        path: "/administrator/upload/adv",
        component: Adv,
        hidden: true,
      },
      {
        path: "/administrator/upload/img",
        component: Img,
        hidden: true,
        // children: [
        //   {
        //     path: "/administrator/upload/imgweb",
        //     component: ImgWeb,
        //   },
        //   {
        //     path: "/administrator/upload/imgapp",
        //     component: ImgApp,
        //   },
        // ],
      },
      {
        path: "/administrator/upload/cty",
        component: Cty,
        hidden: true,
      },
      {
        path: "/administrator/upload/account",
        component: AdminAccount,
        hidden: true,
      },
    ],
  },
  {
    path: "/footer/privacy",
    component: Privacy,
    hidden: true,
  },
  {
    path: "/4040",
    component: NotFound,
    hidden: true,
  },
  { path: "*", redirect: "/4040", hidden: true },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log("router index -- token:  ",localStorage.token);
  if (!to.meta.isPublic && localStorage.token == undefined) {
    return next("/login");
  } else {
    next();
  }
});

// export const asyncRoutes = [
//   // 404 page must be placed at the end !!!
//   { path: "*", redirect: "/404", hidden: true },
// ];
// const createRouter = () =>
//   new VueRouter({
//     // mode: 'history', // require service support
//     scrollBehavior: () => ({ y: 0 }),
//     routes: constantRoutes,
//   });

// const router = createRouter();

// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter();
//   router.matcher = newRouter.matcher; // reset router
// }

// router.beforeEach((to, from, next) => {
//   // 检测路由配置中是否有requiresAuth这个meta属性
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // 判断是否已登录
//     if (this.$store.getters.isLoggedIn) {
//       next();
//       return;
//     }
//     // 未登录则跳转到登录界面
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router;
