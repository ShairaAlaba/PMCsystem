import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

import LandingPage from '@/views/LandingPage.vue'
import AuthPage from '@/views/AuthPage.vue'
import InspectorDashboard from '@/views/InspectorDashboard.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import RecordView from '@/views/RecordView.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/auth', component: AuthPage },
  {
    path: '/inspector',
    component: InspectorDashboard,
    meta: { requiresAuth: true, role: 'inspector' },
  },
  {
    path: '/inspector/record/:id',
    component: RecordView,
    meta: { requiresAuth: true, role: 'inspector' },
  },
  {
    path: '/admin',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' },
  },
  // ✅ THIS WAS THE MISSING ROUTE — admin record view
  {
    path: '/admin/record/:id',
    component: RecordView,
    meta: { requiresAuth: true, role: 'admin' },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth) {
    if (!auth.isLoggedIn) return next('/auth')
    if (to.meta.role && auth.user.role !== to.meta.role) {
      return next(auth.isAdmin ? '/admin' : '/inspector')
    }
  }
  if (to.path === '/auth' && auth.isLoggedIn) {
    return next(auth.isAdmin ? '/admin' : '/inspector')
  }
  next()
})

export default router