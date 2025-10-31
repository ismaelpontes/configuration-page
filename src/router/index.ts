import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/settings",
    component: () => import("../pages/SettingsLayout.vue"),
    children: [
      {
        path: "",
        name: "settings-home",
        component: () => import("../pages/SettingsHome.vue"),
      },
      {
        path: ":submenu",
        name: "settings-sub",
        component: () => import("../pages/SettingsSubpage.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/",
    redirect: "/settings",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/settings",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
