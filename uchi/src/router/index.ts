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
      path: "/profile/edit",
      name: "Edit Profile",
      component: () => import("../views/Profile/EditCreateProfileView.vue"),
    },
    {
      path: "/register",
      name: "Register User",
      component: () => import("../views/RegisterView.vue"),
    },
  ],
});

export default router;
