import api from './axios'
import type { Employee, PageResponse } from '@/types'

export const employeesApi = {
  getAll: (params?: any) => api.get<PageResponse<Employee>>('/employees', { params }),
  getById: (id: number) => api.get<Employee>(`/employees/${id}`),
  getMe: () => api.get<Employee>('/employees/me'),
  create: (data: Partial<Employee>) => api.post<Employee>('/employees', data),
  update: (id: number, data: Partial<Employee>) => api.put<Employee>(`/employees/${id}`, data),
  delete: (id: number) => api.delete<void>(`/employees/${id}`),
}
