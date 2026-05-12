<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-white tracking-tight">Employee Directory</h1>
        <p class="text-dark-400 mt-1">Manage company staff and their positions</p>
      </div>
      <button v-if="isAdmin" @click="openCreateModal" class="btn-primary flex items-center gap-2 group">
        <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Employee
      </button>
    </div>

    <!-- Table Card -->
    <div class="card overflow-hidden">
      <DataTable
        :columns="columns"
        :data="employees"
        :loading="loading"
        searchable
        :search-query="search"
        @search="onSearch"
        :page="page"
        :size="size"
        :total-elements="totalElements"
        :total-pages="totalPages"
        @page-change="goToPage"
      >
        <template #cell-name="{ row }">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-dark-700 border border-dark-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
              {{ row.firstName.charAt(0) }}{{ row.lastName.charAt(0) }}
            </div>
            <div>
              <div class="font-semibold text-white">{{ row.firstName }} {{ row.lastName }}</div>
              <div class="text-[10px] text-dark-400 uppercase font-bold tracking-wider">{{ row.email }}</div>
            </div>
          </div>
        </template>

        <template #cell-salary="{ value }">
          <span v-if="value" class="font-mono text-emerald-400">{{ formatCurrency(value) }}</span>
          <span v-else class="text-dark-500 italic">Hidden</span>
        </template>

        <template #cell-status="{ value }">
          <BaseBadge :variant="value === 'ACTIVE' ? 'success' : 'danger'">
            {{ value }}
          </BaseBadge>
        </template>

        <template #actions_col="{ row }">
          <button @click="openEditModal(row)" class="p-2 rounded-lg text-dark-300 hover:text-primary-400 hover:bg-primary-500/10 transition-all" title="Edit">
            <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
          </button>
          <button v-if="isAdmin" @click="confirmDelete(row)" class="p-2 rounded-lg text-dark-300 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Delete">
            <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
          </button>
        </template>
      </DataTable>
    </div>

    <!-- Create/Edit Modal -->
    <BaseModal
      v-model="showModal"
      :title="isEditing ? 'Edit Employee' : 'Add New Employee'"
      size="lg"
    >
      <EmployeeForm
        :form="form"
        :loading="submitting"
        :submit-label="isEditing ? 'Save Changes' : 'Create Employee'"
        @submit="handleSubmit"
        @cancel="showModal = false"
      />
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { employeesApi } from '@/api/employees'
import type { Employee } from '@/types'
import { useAuth } from '@/composables/useAuth'
import { usePagination } from '@/composables/usePagination'
import { useToast } from 'vue-toastification'
import DataTable from '@/components/ui/DataTable.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import EmployeeForm from '@/components/employee/EmployeeForm.vue'

const { isAdmin } = useAuth()
const toast = useToast()

const employees = ref<Employee[]>([])
const search = ref('')

const columns = [
  { key: 'name', label: 'Employee' },
  { key: 'position', label: 'Position' },
  { key: 'departmentName', label: 'Department' },
  { key: 'salary', label: 'Salary' },
  { key: 'status', label: 'Status' },
]

const { page, size, totalElements, totalPages, loading, updateFromResponse, goToPage } = usePagination(fetchEmployees)

async function fetchEmployees() {
  try {
    const response = await employeesApi.getAll({
      page: page.value,
      size: size.value,
      search: search.value,
    })
    employees.value = response.data.content
    updateFromResponse(response.data)
  } catch (err) {
    toast.error('Failed to fetch employees')
  }
}

// Modal & Form State
const showModal = ref(false)
const isEditing = ref(false)
const submitting = ref(false)
const form = ref<Partial<Employee>>({})

function openCreateModal() {
  isEditing.value = false
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    status: 'ACTIVE',
    hireDate: new Date().toISOString().split('T')[0],
  }
  showModal.value = true
}

function openEditModal(emp: Employee) {
  isEditing.value = true
  form.value = { ...emp }
  showModal.value = true
}

async function handleSubmit() {
  submitting.value = true
  try {
    if (isEditing.value && form.value.id) {
      await employeesApi.update(form.value.id, form.value)
      toast.success('Employee updated successfully')
    } else {
      await employeesApi.create(form.value)
      toast.success('Employee created successfully')
    }
    showModal.value = false
    fetchEmployees()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Action failed')
  } finally {
    submitting.value = false
  }
}

async function confirmDelete(emp: Employee) {
  if (confirm(`Are you sure you want to delete ${emp.firstName} ${emp.lastName}?`)) {
    try {
      await employeesApi.delete(emp.id)
      toast.success('Employee deleted')
      fetchEmployees()
    } catch (err) {
      toast.error('Failed to delete employee')
    }
  }
}

function onSearch(query: string) {
  search.value = query
  page.value = 0
  fetchEmployees()
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
}

onMounted(fetchEmployees)
</script>
