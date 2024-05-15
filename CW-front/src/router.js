import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/pages/Home.vue";
import Login from "./components/pages/Login.vue";
import Register from "./components/pages/Register.vue";
import ClientPage from "./components/pages/ClientPage.vue";
import ServicesPage from "./components/pages/ServicesPage.vue";
import ServicePage from "./components/pages/ServicePage.vue";
// lazy-loaded
const Profile = () => import("./components/pages/ProfilePage.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const VisitsPage = () => import("./components/pages/VisitsPage.vue")
const CompaniesPage = () => import("./components/pages/CompaniesPage.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/visits",
    name: "visits",
    // lazy-loaded
    component: VisitsPage,
  },
  {
    path: '/companies',
    name: "companies",
    component: CompaniesPage,
  },
  {
    path: "/clients/:id",
    name: "clientPage",
    component: ClientPage,
  },
  {
    path: '/services',
    name: "services",
    component: ServicesPage,
  },
  {
    path: "/services/:id",
    name: "servicePage",
    component: ServicePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
