import { defineStore } from 'pinia'
import { ref } from 'vue'
import { employeesApi } from '@/api/employees'
import type { Employee, PageResponse } from '@/types'
import { useToast } from 'vue-toastification'

export const useEmployeeStore = defineStore('employee', () => {
  const toast = useToast()
  
  // State
  const employees = ref<Employee[]>([])
  const loading = ref(false)
  const initialized = ref(false)
  
  // Pagination State
  const page = ref(0)
  const size = ref(10)
  const totalElements = ref(0)
  const totalPages = ref(0)
  const searchQuery = ref('')

  async function fetchEmployees(force = false) {
    // Cache: don't fetch if already initialized unless forced
    if (initialized.value && !force && employees.value.length > 0) {
      return
    }

    loading.value = true
    try {
      const response = await employeesApi.getAll({
        page: page.value,
        size: size.value,
        search: searchQuery.value,
      })
      
      employees.value = response.data.content
      totalElements.value = response.data.totalElements
      totalPages.value = response.data.totalPages
      initialized.value = true
    } catch (error) {
      toast.error('Failed to sync employees')
    } finally {
      loading.value = false
    }
  }

  async function createEmployee(data: Partial<Employee>) {
    const previousEmployees = [...employees.value]
    const tempId = Date.now()
    
    // Optimistic Add
    const optimisticEmp = { ...data, id: tempId, status: data.status || 'ACTIVE' } as Employee
    employees.value = [optimisticEmp, ...employees.value]

    try {
      const response = await employeesApi.create(data)
      // Replace temp with real
      const index = employees.value.findIndex(e => e.id === tempId)
      if (index !== -1) {
        employees.value[index] = response.data
      }
      toast.success('Employee created')
      return response.data
    } catch (error) {
      employees.value = previousEmployees
      throw error
    }
  }

  async function updateEmployee(id: number, data: Partial<Employee>) {
    const previousEmployees = [...employees.value]
    const index = employees.value.findIndex(e => e.id === id)
    
    if (index !== -1) {
      // Optimistic Update
      employees.value[index] = { ...employees.value[index], ...data } as Employee
    }

    try {
      const response = await employeesApi.update(id, data)
      toast.success('Employee updated')
      return response.data
    } catch (error) {
      employees.value = previousEmployees
      throw error
    }
  }

  async function deleteEmployee(id: number) {
    const previousEmployees = [...employees.value]
    
    // Optimistic Delete
    employees.value = employees.value.filter(e => e.id !== id)

    try {
      await employeesApi.delete(id)
      toast.success('Employee archived')
    } catch (error) {
      employees.value = previousEmployees
      throw error
    }
  }

  function setPage(p: number) {
    page.value = p
    fetchEmployees(true) // Force refresh on page change
  }

  function setSearch(query: string) {
    searchQuery.value = query
    page.value = 0
    fetchEmployees(true)
  }

  return {
    employees,
    loading,
    initialized,
    page,
    size,
    totalElements,
    totalPages,
    searchQuery,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    setPage,
    setSearch
  }
})
