import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LandingPage.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsPage.vue'),
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue'),
      meta: { layout: 'auth' },
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/RegisterPage.vue'),
      meta: { layout: 'auth' },
    },
    {
      path: '/me',
      name: 'profile',
      component: () => import('../views/ProfilePage.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
