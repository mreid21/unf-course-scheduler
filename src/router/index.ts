import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/plans',
      name: 'Plans',
      component: () => import('../views/Plans.vue'),
    },
    {
      // path: "*",
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import('../views/Login.vue'),
    }
  ],
});

export default router;
