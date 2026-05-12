<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight">Personal Profile</h1>
      <p class="text-dark-400 mt-1">Manage your professional information and settings</p>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <BaseSpinner size="lg" />
    </div>

    <div v-else-if="employee" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Left: Profile Card -->
      <div class="md:col-span-1 space-y-6">
        <div class="card p-8 flex flex-col items-center text-center">
          <div class="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-2xl shadow-primary-900/30 flex items-center justify-center text-4xl font-bold text-white mb-6 transform hover:rotate-3 transition-transform">
            {{ employee.firstName.charAt(0) }}{{ employee.lastName.charAt(0) }}
          </div>
          <h2 class="text-2xl font-bold text-white">{{ employee.firstName }} {{ employee.lastName }}</h2>
          <p class="text-primary-400 font-semibold tracking-wide uppercase text-xs mt-1">{{ employee.position }}</p>
          
          <div class="mt-6 flex flex-wrap justify-center gap-2">
            <BaseBadge variant="primary">{{ role }}</BaseBadge>
            <BaseBadge :variant="employee.status === 'ACTIVE' ? 'success' : 'danger'">{{ employee.status }}</BaseBadge>
          </div>
        </div>

        <div class="card p-6 space-y-4">
          <h4 class="text-[10px] font-bold text-dark-500 uppercase tracking-widest">Contact Info</h4>
          <div class="flex items-center gap-3 text-sm text-dark-300">
            <svg class="w-4 h-4 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            {{ employee.email }}
          </div>
          <div v-if="employee.phone" class="flex items-center gap-3 text-sm text-dark-300">
            <svg class="w-4 h-4 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            {{ employee.phone }}
          </div>
        </div>
      </div>

      <!-- Right: Detailed Info -->
      <div class="md:col-span-2 space-y-6">
        <div class="card p-8">
          <div class="flex items-center justify-between mb-8 pb-4 border-b border-dark-700/50">
            <h3 class="text-xl font-bold text-white">Employment History</h3>
            <div class="text-xs text-dark-400 font-medium">Employee ID: #{{ employee.id }}</div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-dark-500 uppercase tracking-widest">Department</span>
              <p class="text-lg font-semibold text-white">{{ employee.departmentName || 'Not Assigned' }}</p>
            </div>
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-dark-500 uppercase tracking-widest">Join Date</span>
              <p class="text-lg font-semibold text-white">{{ formatDate(employee.hireDate) }}</p>
            </div>
            <div v-if="employee.salary" class="space-y-1">
              <span class="text-[10px] font-bold text-dark-500 uppercase tracking-widest">Current Salary</span>
              <p class="text-lg font-semibold text-emerald-400">{{ formatCurrency(employee.salary) }}</p>
            </div>
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-dark-500 uppercase tracking-widest">Account Created</span>
              <p class="text-lg font-semibold text-white">{{ formatDate(employee.createdAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Security / Account Settings -->
        <div class="card p-8">
          <h3 class="text-xl font-bold text-white mb-6">Security Settings</h3>
          <button @click="toast.info('Feature coming soon!')" class="btn-ghost border border-dark-700/50 w-full justify-start gap-4 h-12">
            <svg class="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>
            Change Account Password
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { employeesApi } from '@/api/employees'
import { useAuth } from '@/composables/useAuth'
import type { Employee } from '@/types'
import { useToast } from 'vue-toastification'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const { role } = useAuth()
const toast = useToast()
const employee = ref<Employee | null>(null)
const loading = ref(true)

async function fetchMe() {
  try {
    const response = await employeesApi.getMe()
    employee.value = response.data
  } catch (err) {
    toast.error('Failed to load profile details')
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
}

onMounted(fetchMe)
</script>
