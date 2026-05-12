import axios from 'axios'
import type { AuthResponse } from '@/types'

const authAxios = axios.create({
  baseURL: '/api/v1/auth',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

export const authApi = {
  login: (data: any) => authAxios.post<AuthResponse>('/login', data),
  register: (data: any) => authAxios.post<AuthResponse>('/register', data),
  refresh: (data: { refreshToken: string | null }) => authAxios.post<AuthResponse>('/refresh', data),
  logout: (data: { refreshToken: string | null }) => authAxios.post<void>('/logout', data),
}
