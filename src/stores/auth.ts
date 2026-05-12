import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api/auth'
import router from '@/router'
import type { User, AuthResponse, UserRole } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem('ems_access_token') || null)
  const refreshToken = ref<string | null>(localStorage.getItem('ems_refresh_token') || null)
  const user = ref<User | null>(JSON.parse(localStorage.getItem('ems_user') || 'null'))

  const isAuthenticated = computed(() => !!accessToken.value)
  const role = computed<UserRole | null>(() => user.value?.role || null)
  const isAdmin = computed(() => role.value === 'ADMIN')
  const isManager = computed(() => role.value === 'MANAGER')
  const isEmployee = computed(() => role.value === 'EMPLOYEE')
  const userId = computed(() => user.value?.userId || null)
  const userEmail = computed(() => user.value?.email || null)

  function setAuth(data: AuthResponse) {
    accessToken.value = data.accessToken
    refreshToken.value = data.refreshToken
    user.value = { role: data.role, email: data.email, userId: data.userId }

    localStorage.setItem('ems_access_token', data.accessToken)
    localStorage.setItem('ems_refresh_token', data.refreshToken)
    localStorage.setItem('ems_user', JSON.stringify(user.value))
  }

  function clearAuth() {
    accessToken.value = null
    refreshToken.value = null
    user.value = null

    localStorage.removeItem('ems_access_token')
    localStorage.removeItem('ems_refresh_token')
    localStorage.removeItem('ems_user')
  }

  async function login(email: string, password: string): Promise<AuthResponse> {
    const response = await authApi.login({ email, password })
    setAuth(response.data)
    router.push('/dashboard')
    return response.data
  }

  async function refreshAccessToken(): Promise<string | null> {
    try {
      const response = await authApi.refresh({ refreshToken: refreshToken.value })
      setAuth(response.data)
      return response.data.accessToken
    } catch {
      logout()
      return null
    }
  }

  async function logout() {
    try {
      if (refreshToken.value) {
        await authApi.logout({ refreshToken: refreshToken.value })
      }
    } catch {
      // ignore logout API errors
    } finally {
      clearAuth()
      router.push('/login')
    }
  }

  return {
    accessToken,
    refreshToken,
    user,
    isAuthenticated,
    role,
    isAdmin,
    isManager,
    isEmployee,
    userId,
    userEmail,
    login,
    logout,
    refreshAccessToken,
    setAuth,
    clearAuth,
  }
})
