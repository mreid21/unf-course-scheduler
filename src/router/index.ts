import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
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
      component: () => import('../views/Home.vue'),
    }
  ],
});

export default router;
