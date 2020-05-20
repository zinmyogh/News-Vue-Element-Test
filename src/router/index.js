import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import(/* webpackChunkName: "start" */ "../views/Home");
const Login = () => import(/* webpackChunkName: "start" */ "../views/Login");
const Register = () =>
  import(/* webpackChunkName: "start" */ "../views/Register");

const Adv = () =>
  import(/* webpackChunkName: "administrator" */ "../views/administrator/Adv");
const Img = () =>
  import(/* webpackChunkName: "administrator" */ "../views/administrator/Img");
const Cty = () =>
  import(/* webpackChunkName: "administrator" */ "../views/administrator/Cty");

const MainBody = () =>
  import(/* webpackChunkName: "user-use" */ "../views/MainBody");
const CreateArticle = () =>
  import(/* webpackChunkName: "user-use" */ "../views/CreateArticle");
const CreateMoment = () =>
  import(/* webpackChunkName: "user-use" */ "../views/CreateMoment");
const CreateVideo = () =>
  import(/* webpackChunkName: "user-use" */ "../views/CreateVideo");
const EditArticle = () =>
  import(
    /* webpackChunkName: "user-use" */ "../components/article/EditArticle"
  );
const ReviewArticle = () =>
  import(
    /* webpackChunkName: "user-use" */ "../components/article/ArticlePostReview"
  );

const MyPost = () =>
  import(/* webpackChunkName: "info" */ "../views/me/MyPost");
const MyAccount = () =>
  import(/* webpackChunkName: "info" */ "../views/me/MyAccount");
const NotFound = () =>
  import(/* webpackChunkName: "info" */ "../views/error-page/404");
const Privacy = () =>
  import(/* webpackChunkName: "info" */ "../views/footer/Privacy");

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
