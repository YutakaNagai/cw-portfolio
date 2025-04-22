import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Privacy from "../pages/Privacy.vue";
import Terms from "../pages/Terms.vue";
import Disclaimer from "../pages/Disclaimer.vue";
import About from "../pages/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/privacy-policy",
    name: "Privacy",
    component: Privacy,
  },
  {
    path: "/terms",
    name: "Terms",
    component: Terms,
  },
  {
    path: "/disclaimer",
    name: "Disclaimer",
    component: Disclaimer,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
