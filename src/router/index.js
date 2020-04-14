import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  }
];

const router = new VueRouter({
  routes
});

export default router;
