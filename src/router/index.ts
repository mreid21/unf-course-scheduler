import { createRouter, createWebHistory } from 'vue-router';
import {useUserStore} from '../stores/useUserStore'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:username/Plans',
      name: 'Plans',
      component: () => import('../views/Plans.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:username/Plans/:planID',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      // path: "*",
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import('../views/Login.vue'),
      meta: {
        requiresAuth: false
      }
    }
  ],
});

router.beforeEach((to) => {
  const store = useUserStore()
  if(to.meta.requiresAuth && !store.user){
      console.log(to.query.userId)
      return {name: 'Login'}
  }
  if(to.name === 'Home'){
    store.setCurrentPlan(parseInt(to.params.planID as string))
  }
})

export default router;
