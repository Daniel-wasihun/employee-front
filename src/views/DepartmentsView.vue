<template>
  <div class="space-y-6 animate-in fade-in">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">Departments</h1>
        <p class="text-[var(--text-muted)] mt-1">Manage company structure and teams</p>
      </div>
      <button @click="openCreateModal" class="btn-primary flex items-center gap-2 group">
        <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        New Department
      </button>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <BaseSpinner size="lg" />
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="dept in departments" :key="dept.id" class="card group hover:border-primary-500/30 transition-all duration-300">
        <div class="p-6">
          <div class="flex items-start justify-between mb-6">
            <div class="w-12 h-12 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6.75h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
            </div>
            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button @click="openEditModal(dept)" class="p-2 text-[var(--text-dim)] hover:text-primary-600 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
              <button @click="confirmDelete(dept)" class="p-2 text-[var(--text-dim)] hover:text-red-600 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
            </div>
          </div>
          
          <h3 class="text-xl font-bold text-[var(--text-main)] mb-2">{{ dept.name }}</h3>
          <p class="text-sm text-[var(--text-muted)] line-clamp-2 mb-6 h-10">{{ dept.description || 'No description provided.' }}</p>
          
          <div class="flex items-center justify-between pt-5 border-t border-[var(--border-subtle)]">
            <div class="flex flex-col">
              <span class="text-[10px] uppercase font-bold text-[var(--text-dim)] tracking-wider">Manager</span>
              <span class="text-sm font-medium text-[var(--text-main)]">{{ dept.managerName || 'Unassigned' }}</span>
            </div>
            <div class="bg-[var(--bg-input)] px-3 py-1.5 rounded-xl border border-[var(--border-subtle)] shadow-sm">
              <span class="text-sm font-bold text-[var(--text-main)]">{{ dept.employeeCount || 0 }}</span>
              <span class="text-[10px] text-[var(--text-dim)] ml-1 font-bold uppercase tracking-widest">Staff</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <BaseModal v-model="showModal" :title="isEditing ? 'Edit Department' : 'Create Department'">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="label uppercase tracking-widest text-[10px] font-bold">Department Name</label>
          <input v-model="form.name" type="text" required class="input" placeholder="e.g. Engineering">
        </div>
        <div>
          <label class="label uppercase tracking-widest text-[10px] font-bold">Description</label>
          <textarea v-model="form.description" class="input h-24 py-3 resize-none" placeholder="Tell us about this department..."></textarea>
        </div>
        <div class="flex justify-end gap-3 pt-6">
          <button type="button" @click="showModal = false" class="btn-secondary px-6">Cancel</button>
          <button type="submit" class="btn-primary px-8" :disabled="submitting">
            {{ isEditing ? 'Save Changes' : 'Create' }}
          </button>
        </div>
      </form>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { departmentsApi } from '@/api/departments'
import type { Department } from '@/types'
import { useToast } from 'vue-toastification'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const toast = useToast()
const departments = ref<Department[]>([])
const loading = ref(true)
const showModal = ref(false)
const isEditing = ref(false)
const submitting = ref(false)
const form = ref<Partial<Department>>({})

async function fetchDepartments() {
  loading.value = true
  try {
    const response = await departmentsApi.getAll()
    departments.value = response.data
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  isEditing.value = false
  form.value = { name: '', description: '' }
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
      toast.success('Department updated')
    } else {
      await departmentsApi.create(form.value)
      toast.success('Department created')
    }
    showModal.value = false
    fetchDepartments()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Error saving department')
  } finally {
    submitting.value = false
  }
}

async function confirmDelete(dept: Department) {
  if (confirm(`Delete ${dept.name}? This will affect all associated employees.`)) {
    try {
      await departmentsApi.delete(dept.id)
      toast.success('Department deleted')
      fetchDepartments()
    } catch (err) {
      toast.error('Cannot delete department with active employees')
    }
  }
}

onMounted(fetchDepartments)
</script>
