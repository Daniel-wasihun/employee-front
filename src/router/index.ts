import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { UserRole } from '@/types'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    component: () => import('@/components/layout/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/dashboard',
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue'),
      },
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('@/views/EmployeesView.vue'),
        meta: { roles: ['ADMIN', 'MANAGER'] as UserRole[] },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue'),
      },
      {
        path: 'departments',
        name: 'Departments',
        component: () => import('@/views/DepartmentsView.vue'),
        meta: { roles: ['ADMIN'] as UserRole[] },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth !== false && !authStore.isAuthenticated) {
    next({ name: 'Login' })
    return
  }

  if (to.name === 'Login' && authStore.isAuthenticated) {
    next({ name: 'Dashboard' })
    return
  }

  const roles = to.meta.roles as UserRole[] | undefined
  if (roles && authStore.role && !roles.includes(authStore.role)) {
    next({ name: 'Dashboard' })
    return
  }

  next()
})

export default router
