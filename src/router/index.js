import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import PlayerView from "../views/PlayerView.vue";
import AuthView from "../views/AuthView.vue";
import UsersView from "../views/UsersView.vue";
import { getCurrentUser } from "../main.js";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: AuthView,
      meta: {
        showNav: false
      }
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      meta: {
        authRequired: true,
        showNav: true
      }
    },
    {
      path: "/users",
      name: "Listofusers",
      component: UsersView,
      meta: {
        authRequired: true,
        showNav: true
      }
    },
    {
      path: "/play",
      name: "VideoPlayer",
      component: () => import("../views/PlayerView.vue"),
      // props: {},
      meta: {
        authRequired: true,
        showNav: true
      }
    },
    {
      path: "/about",
      name: "about",
      meta: {
        authRequired: true,
        showNav: true
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    const user = await getCurrentUser();
    if (user) {
      next();
    } else {
      alert('You must be logged in to see this page');
      next({
        path: '/',
      });
    }
  } else {
    next();
  }
});
export default router;
