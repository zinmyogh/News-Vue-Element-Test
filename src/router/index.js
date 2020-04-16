import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
// import MainContent from "../components/body/MainContent";
import CreateArticle from "../components/CreateArticle";
import CreateMoment from "../components/CreateMoment";
import CreateVideo from "../components/CreateVideo";
import Video from "../components/Video";
import Photo from "../components/Photo";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/create/article",
        component: CreateArticle,
      },
      {
        path: "/create/moment",
        component: CreateMoment,
      },
      {
        path: "/create/video",
        component: CreateVideo,
      },
      {
        path: "/video",
        component: Video,
      },
      {
        path: "/photo",
        component: Photo,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
