import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'

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
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

// Route guard to check authentication
router.beforeEach(async (to, from, next) => {
  // Initialize auth store
  const authStore = useAuthStore()

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const hasInitializedAuth =
    authStore.accessToken !== null || authStore.refreshToken !== null || authStore.user !== null

  // Try to initialize auth state from localStorage
  if (!hasInitializedAuth) {
    authStore.initializeAuth()
  }

  if (requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login page if not authenticated
    next({
      path: '/auth/login',
      query: { redirect: to.fullPath },
    })
  } else {
    // Allow navigation
    next()
  }
})

export default router
