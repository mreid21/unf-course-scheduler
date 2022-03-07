import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Plans from '../views/Plans.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/plans',
      name: 'Plans',
      component: Plans,
    },
    {
      path: '*',
      name: 'Catch',
      component: Home
    }
  ],
});

export default router;
