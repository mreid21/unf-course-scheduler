import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Base',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/Plans',
      name: 'Plans',
      component: () => import('../views/Plans.vue'),
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login.vue')
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
