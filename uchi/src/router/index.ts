import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/reserve",
      name: "reserve",
      component: () => import("../views/ReserveView.vue"),
    },
    {
      path: "/reserve/:id",
      name: "reserveAmenity",
      component: () => import("../views/ReserveAmenityView.vue"),
    },
    {
      path: "/reports",
      name: "All Reports",
      component: () => import("../views/Reports/ReportsView.vue"),
    },
    {
      path: "/reports/:id",
      name: "Report",
      component: () => import("../views/Reports/ReportView.vue"),
    },
    {
      path: "/reports/add",
      name: "Add Report",
      component: () => import("../views/Reports/AddReportView.vue"),
    },
    {
      path: "/messages",
      name: "Messages",
      component: () => import("../views/MessagesView.vue"),
      children: [{
        path: "/messages/message/:id",
        name: "Message",
        component: () => import("../components/Messages/Message.vue"),
      }
      ]
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/Profile/ProfileView.vue"),
    },
    {
      path: "/profile/create",
      name: "Create Profile",
      component: () => import("../views/Profile/CreateUser.vue"),
    },
    {
      path: "/profile/edit",
      name: "Edit Profile",
      component: () => import("../views/Profile/EditCreateProfileView.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/Register/RegisterView.vue"),
    },
    {
      path: "/register/tenant",
      name: "Register Tenant",
      component: () => import("../views/Register/User.vue"),
    },
    {
      path: "/register/admin",
      name: "Register Administrator",
      component: () => import("../views/Register/Admin.vue"),
    },
    {
      path: "/register/tower",
      name: "Register Tower",
      component: () => import("../views/Register/Tower.vue"),
    },
    {
      path: "/register/apartment",
      name: "Register Apartment",
      component: () => import("../views/Register/Apartment.vue"),
    },
    {
      path: "/users",
      name: "Users View",
      component: () => import("../views/UsersView.vue"),
    },
    {
      path: "/requests",
      name: "Requests View",
      component: () => import("../views/Requests.vue"),
    },
    {
      path: "/users/edit/:id",
      name: "User Edit",
      component: () => import("../views/UserView.vue"),
    },
    {
      path: "/reservations",
      name: "Reservations",
      component: () => import("../views/ReservationsView.vue"),
    },
  ],
});

export default router;
