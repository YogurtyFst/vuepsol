import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import Register from "../views/Register/Register";
import Index from "../views/Home/Index";
import Detail from "../views/Home/Detail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: false
  },
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    hidden: true,
    children: [
      {
        path: '',
        component: Index
      },
      {
        path: 'index',
        name: 'index',
        component: Index
      },
      {
        path: 'detail/:id',
        name: 'detail',
        component: Detail
      }
    ]
  },
  {
    path:'/register',
    name: "Register",
    component: Register,
    hidden: false
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
