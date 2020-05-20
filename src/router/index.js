import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";

import Adv from "../views/administrator/Adv";
import Img from "../views/administrator/Img";
import Cty from "../views/administrator/Cty";

import MainBody from "../views/MainBody";
import CreateArticle from "../views/CreateArticle";
import CreateMoment from "../views/CreateMoment";
import CreateVideo from "../views/CreateVideo";
import EditArticle from "../components/article/EditArticle";

import MyPost from "../views/me/MyPost";
import ReviewArticle from "../components/article/ArticlePostReview";
import MyAccount from "../views/me/MyAccount";
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
    meta: { isPublic: true, keepAlive: true },
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
        path: "/editarticle",
        name: "EditArticle",
        component: EditArticle,
        meta: { keepAlive: true },
      },
      {
        path: "/mypost",
        component: MyPost,
        meta: { keepAlive: true },
      },
      {
        path: "/review/article",
        name: "ReviewArticle",
        component: ReviewArticle,
      },
      {
        path: "/myaccount",
        component: MyAccount,
        meta: { keepAlive: true },
      },
      {
        path: "/administrator/upload/adv",
        component: Adv,
        meta: { keepAlive: true },
      },
      {
        path: "/administrator/upload/img",
        component: Img,
        meta: { keepAlive: true },
      },
      {
        path: "/administrator/upload/cty",
        component: Cty,
        meta: { keepAlive: true },
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
  // mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && localStorage.token == undefined) {
    return next("/login");
  } else {
    next();
  }
});

export default router;
