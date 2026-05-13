<template>
  <div class="space-y-8 animate-in fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-4xl font-black text-[var(--text-main)] tracking-tight">Employee Directory</h1>
        <p class="text-[var(--text-muted)] mt-1">Manage company staff and their positions</p>
      </div>
      <BaseButton v-if="isAdmin" @click="openCreateModal" class="group">
        <template #icon-left>
          <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </template>
        Add Employee
      </BaseButton>
    </div>

    <!-- Table Card -->
    <div class="card overflow-hidden">
      <DataTable
        :columns="columns"
        :data="employeeStore.employees"
        :loading="employeeStore.loading"
        searchable
        :search-query="employeeStore.searchQuery"
        @search="employeeStore.setSearch"
        :page="employeeStore.page"
        :size="employeeStore.size"
        :total-elements="employeeStore.totalElements"
        :total-pages="employeeStore.totalPages"
        @page-change="employeeStore.setPage"
      >
        <template #cell-name="{ row }">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] flex items-center justify-center text-xs font-bold text-[var(--text-main)] shadow-sm">
              {{ row.firstName?.charAt(0) }}{{ row.lastName?.charAt(0) }}
            </div>
            <div>
              <div class="font-semibold text-[var(--text-main)]">{{ row.firstName }} {{ row.lastName }}</div>
              <div class="text-[10px] text-[var(--text-dim)] uppercase font-bold tracking-wider">{{ row.email }}</div>
            </div>
          </div>
        </template>

        <template #cell-salary="{ value }">
          <span v-if="value" class="font-mono text-emerald-600 dark:text-emerald-400 font-medium">{{ formatCurrency(value) }}</span>
          <span v-else class="text-[var(--text-dim)] italic">Hidden</span>
        </template>

        <template #cell-status="{ value }">
          <BaseBadge :variant="value === 'ACTIVE' ? 'success' : 'danger'">
            {{ value }}
          </BaseBadge>
        </template>

        <template #actions_col="{ row }">
          <div class="flex items-center gap-1">
            <BaseButton variant="ghost" size="sm" @click="openEditModal(row)" title="Edit">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
            </BaseButton>
            <BaseButton v-if="isAdmin" variant="ghost" size="sm" @click="confirmDelete(row)" title="Delete" class="hover:text-rose-600!">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </BaseButton>
          </div>
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
        :employee="form"
        :loading="submitting"
        :is-editing="isEditing"
        @submit="handleSubmit"
        @cancel="showModal = false"
      />
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEmployeeStore } from '@/stores/employee'
import type { Employee } from '@/types'
import { useAuth } from '@/composables/useAuth'
import { useToast } from 'vue-toastification'
import DataTable from '@/components/ui/DataTable.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import EmployeeForm from '@/components/employee/EmployeeForm.vue'

const employeeStore = useEmployeeStore()
const { isAdmin } = useAuth()
const toast = useToast()

const columns = [
  { key: 'name', label: 'Employee' },
  { key: 'position', label: 'Position' },
  { key: 'departmentName', label: 'Department' },
  { key: 'salary', label: 'Salary' },
  { key: 'status', label: 'Status' },
]

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

async function handleSubmit(data: Partial<Employee>) {
  submitting.value = true
  try {
    if (isEditing.value && data.id) {
      await employeeStore.updateEmployee(data.id, data)
    } else {
      await employeeStore.createEmployee(data)
    }
    showModal.value = false
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Action failed')
  } finally {
    submitting.value = false
  }
}

async function confirmDelete(emp: Employee) {
  if (confirm(`Archive ${emp.firstName} ${emp.lastName}?`)) {
    try {
      await employeeStore.deleteEmployee(emp.id)
    } catch (err) {
      toast.error('Failed to archive employee')
    }
  }
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
}

onMounted(() => {
  employeeStore.fetchEmployees()
})
</script>
