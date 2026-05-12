<template>
  <div class="space-y-8 animate-in">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-4xl font-black text-[var(--text-main)] tracking-tight">Departments</h1>
        <p class="text-[var(--text-muted)] mt-2 font-medium">Structure and manage your organization's hierarchy</p>
      </div>
      <button @click="openCreateModal" class="btn-primary group h-12 px-8">
        <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span>Initialize Department</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 3" :key="i" class="card h-64 animate-pulse bg-slate-200/50 dark:bg-slate-800/50"></div>
    </div>

    <!-- Department Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="dept in departments" :key="dept.id" class="card card-hover group p-8">
        <div class="flex items-start justify-between mb-8">
          <div class="w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shadow-sm">
            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
            <button @click="openEditModal(dept)" class="p-2.5 rounded-xl bg-[var(--bg-main)] text-[var(--text-dim)] hover:text-primary-600 border border-[var(--border-subtle)] hover:border-primary-500/30 transition-all">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
            </button>
            <button @click="confirmDelete(dept)" class="p-2.5 rounded-xl bg-[var(--bg-main)] text-[var(--text-dim)] hover:text-red-600 border border-[var(--border-subtle)] hover:border-red-500/30 transition-all">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
        
        <h3 class="text-2xl font-extrabold text-[var(--text-main)] mb-2 tracking-tight">{{ dept.name }}</h3>
        <p class="text-sm text-[var(--text-muted)] line-clamp-2 h-10 leading-relaxed">{{ dept.description || 'Global department for internal operations.' }}</p>
        
        <div class="mt-8 pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[var(--bg-main)] border border-[var(--border-subtle)] flex items-center justify-center text-[10px] font-black text-primary-600 uppercase">
              {{ dept.managerName ? dept.managerName.split(' ').map(n => n[0]).join('') : '??' }}
            </div>
            <div>
              <p class="text-[9px] font-black uppercase tracking-widest text-[var(--text-dim)]">Manager</p>
              <p class="text-sm font-bold text-[var(--text-main)] truncate max-w-[120px]">{{ dept.managerName || 'Not Assigned' }}</p>
            </div>
          </div>
          <div class="px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <span class="text-xs font-black tracking-tighter">{{ dept.employeeCount || 0 }}</span>
            <span class="text-[9px] font-black uppercase tracking-widest ml-1 opacity-60">Staff</span>
          </div>
        </div>
      </div>
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
            <div>
              <label class="label">Department Identity</label>
              <input v-model="form.name" type="text" required class="input" placeholder="e.g. Strategic Engineering">
            </div>
            <div>
              <label class="label">Strategic Description</label>
              <textarea v-model="form.description" class="input h-32 py-4 resize-none leading-relaxed" placeholder="Define the core mission of this department..."></textarea>
            </div>
          </div>

          <!-- Right Column (Manager Selection) -->
          <div class="space-y-6">
            <div>
              <label class="label">Assign Department Head</label>
              <div class="relative group">
                <select v-model="form.managerId" class="input appearance-none cursor-pointer pr-12">
                  <option :value="undefined">No Manager Assigned</option>
                  <option v-for="emp in employees" :key="emp.id" :value="emp.id">
                    {{ emp.firstName }} {{ emp.lastName }} ({{ emp.position }})
                  </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-[var(--text-dim)] group-hover:text-primary-500 transition-colors">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              <p class="mt-3 text-[10px] text-[var(--text-dim)] font-medium italic">Selecting a manager will link them as the official head of this unit.</p>
            </div>

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
          <button type="button" @click="showModal = false" class="btn-secondary px-8">Discard</button>
          <button type="submit" class="btn-primary min-w-[160px]" :disabled="submitting">
            <template v-if="submitting">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>Processing...</span>
            </template>
            <template v-else>
              <span>{{ isEditing ? 'Push Updates' : 'Commit Department' }}</span>
            </template>
          </button>
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

const toast = useToast()
const departments = ref<Department[]>([])
const employees = ref<Employee[]>([])
const loading = ref(true)
const showModal = ref(false)
const isEditing = ref(false)
const submitting = ref(false)
const form = ref<Partial<Department>>({})

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
