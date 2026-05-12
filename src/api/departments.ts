import api from './axios'
import type { Department } from '@/types'

export const departmentsApi = {
  getAll: () => api.get<Department[]>('/departments'),
  getById: (id: number) => api.get<Department>(`/departments/${id}`),
  create: (data: Partial<Department>) => api.post<Department>('/departments', data),
  update: (id: number, data: Partial<Department>) => api.put<Department>(`/departments/${id}`, data),
  delete: (id: number) => api.delete<void>(`/departments/${id}`),
}
