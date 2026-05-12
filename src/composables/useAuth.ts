import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { UserRole } from '@/types'

export function useAuth() {
  const authStore = useAuthStore()

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const role = computed(() => authStore.role)
  const isAdmin = computed(() => authStore.isAdmin)
  const isManager = computed(() => authStore.isManager)
  const isEmployee = computed(() => authStore.isEmployee)
  const userId = computed(() => authStore.userId)
  const userEmail = computed(() => authStore.userEmail)

  function hasRole(...roles: UserRole[]) {
    return authStore.role && roles.includes(authStore.role)
  }

  function canAccess(requiredRoles: UserRole[]) {
    if (!requiredRoles || requiredRoles.length === 0) return true
    return authStore.role && requiredRoles.includes(authStore.role)
  }

  return {
    isAuthenticated,
    role,
    isAdmin,
    isManager,
    isEmployee,
    userId,
    userEmail,
    hasRole,
    canAccess,
    login: authStore.login,
    logout: authStore.logout,
  }
}
