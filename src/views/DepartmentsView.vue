<template>
  <div class="space-y-8 animate-in">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-4xl font-black text-[var(--text-main)] tracking-tight">Departments</h1>
        <p class="text-[var(--text-muted)] mt-2 font-medium">Structure and manage your organization's hierarchy</p>
      </div>
      <BaseButton @click="openCreateModal" class="group">
        <template #icon-left>
          <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </template>
        Initialize Department
      </BaseButton>
    </div>

    <!-- DataTable Section -->
    <div class="card overflow-hidden">
      <DataTable
        :columns="columns"
        :data="departments"
        :loading="loading"
        searchable
        :page="0"
        :size="10"
        :total-elements="departments.length"
        :total-pages="1"
      >
        <template #cell-name="{ row }">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-600 shadow-sm">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-bold text-[var(--text-main)]">{{ row.name }}</p>
              <p class="text-[10px] text-[var(--text-dim)] font-medium uppercase tracking-wider">ID-{{ row.id.toString().padStart(3, '0') }}</p>
            </div>
          </div>
        </template>

        <template #cell-description="{ value }">
          <p class="text-sm text-[var(--text-muted)] line-clamp-1 max-w-xs font-medium">
            {{ value || 'Global operations unit.' }}
          </p>
        </template>

        <template #cell-employeeCount="{ value }">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-600">
            <span class="text-xs font-black">{{ value || 0 }}</span>
            <span class="text-[9px] font-black uppercase tracking-widest opacity-60">Staff</span>
          </div>
        </template>

        <template #actions_col="{ row }">
          <div class="flex items-center gap-1">
            <BaseButton variant="ghost" size="sm" @click="openEditModal(row)" title="Edit">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
            </BaseButton>
            <BaseButton variant="ghost" size="sm" @click="confirmDelete(row)" title="Delete" class="hover:text-rose-600!">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </BaseButton>
          </div>
        </template>
      </DataTable>
    </div>

    <!-- Modal -->
    <BaseModal 
      v-model="showModal" 
      :title="isEditing ? 'Update Department' : 'New Department'" 
      subtitle="Define organizational structure and management"
      size="lg"
    >
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Left Column -->
          <div class="space-y-6">
            <BaseInput
              v-model="form.name"
              label="Department Identity"
              placeholder="e.g. Strategic Engineering"
              required
            />
            <BaseInput
              v-model="form.description"
              is="textarea"
              label="Strategic Description"
              placeholder="Define the core mission of this department..."
            />
          </div>

          <!-- Right Column (Manager Selection) -->
          <div class="space-y-6">
            <BaseSelect
              v-model="form.managerId"
              label="Assign Department Head"
            >
              <option :value="undefined">No Manager Assigned</option>
              <option v-for="emp in employees" :key="emp.id" :value="emp.id">
                {{ emp.firstName }} {{ emp.lastName }} ({{ emp.position }})
              </option>
            </BaseSelect>

            <div class="p-6 rounded-2xl bg-primary-500/5 border border-primary-500/10">
              <h4 class="text-[10px] font-black uppercase tracking-widest text-primary-600 mb-2">Management Note</h4>
              <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                Changes to department heads are logged and will be reflected in the organizational chart immediately.
              </p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end items-center gap-4 pt-8 border-t border-[var(--border-subtle)]">
          <BaseButton variant="secondary" @click="showModal = false">
            Discard
          </BaseButton>
          <BaseButton
            type="submit"
            :loading="submitting"
            :loading-text="isEditing ? 'Updating...' : 'Committing...'"
            class="min-w-[160px]"
          >
            {{ isEditing ? 'Push Updates' : 'Commit Department' }}
          </BaseButton>
        </div>
      </form>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { departmentsApi } from '@/api/departments'
import { employeesApi } from '@/api/employees'
import type { Department, Employee } from '@/types'
import { useToast } from 'vue-toastification'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import DataTable from '@/components/ui/DataTable.vue'

const toast = useToast()
const departments = ref<Department[]>([])
const employees = ref<Employee[]>([])
const loading = ref(true)
const showModal = ref(false)
const isEditing = ref(false)
const submitting = ref(false)
const form = ref<Partial<Department>>({})

const columns = [
  { key: 'name', label: 'Functional Unit' },
  { key: 'description', label: 'Strategic Mission' },
  { key: 'managerName', label: 'Department Head' },
  { key: 'employeeCount', label: 'Headcount' },
]

async function fetchData() {
  loading.value = true
  try {
    const [deptRes, empRes] = await Promise.all([
      departmentsApi.getAll(),
      employeesApi.getAll({ size: 1000 }) // Get all for selection
    ])
    departments.value = deptRes.data
    employees.value = empRes.data.content
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  isEditing.value = false
  form.value = { name: '', description: '', managerId: undefined }
  showModal.value = true
}

function openEditModal(dept: Department) {
  isEditing.value = true
  form.value = { ...dept }
  showModal.value = true
}

async function handleSubmit() {
  submitting.value = true
  try {
    if (isEditing.value && form.value.id) {
      await departmentsApi.update(form.value.id, form.value)
      toast.success('Department architecture updated')
    } else {
      await departmentsApi.create(form.value)
      toast.success('New department initialized')
    }
    showModal.value = false
    fetchData()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Transaction failed')
  } finally {
    submitting.value = false
  }
}

async function confirmDelete(dept: Department) {
  if (confirm(`Are you sure you want to decommission the ${dept.name} department?`)) {
    try {
      await departmentsApi.delete(dept.id)
      toast.success('Department decommissioned')
      fetchData()
    } catch (err) {
      toast.error('Cannot decommission department with active staff members')
    }
  }
}

onMounted(fetchData)
</script>
