<template>
  <div class="max-w-5xl mx-auto space-y-10 animate-in">
    <!-- Profile Header Card -->
    <div class="card overflow-hidden border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)]">
      <div class="h-48 bg-gradient-to-r from-primary-600 via-primary-500 to-sky-400 relative">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div class="absolute -bottom-16 left-12">
          <div class="w-32 h-32 rounded-[2.5rem] bg-[var(--bg-card)] p-2 shadow-2xl">
            <div class="w-full h-full rounded-[2rem] bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-3xl font-black text-white shadow-inner">
              {{ profile?.firstName[0] }}{{ profile?.lastName[0] }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="pt-20 pb-10 px-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 class="text-4xl font-black text-[var(--text-main)] tracking-tight">
            {{ profile?.firstName }} {{ profile?.lastName }}
          </h1>
          <div class="flex items-center gap-3 mt-2">
            <span class="px-3 py-1 rounded-lg bg-primary-500/10 text-primary-600 text-xs font-black uppercase tracking-widest border border-primary-500/20">
              {{ profile?.position || 'Staff Member' }}
            </span>
            <span class="text-sm font-bold text-[var(--text-dim)]">•</span>
            <span class="text-sm font-bold text-[var(--text-muted)]">{{ profile?.departmentName || 'Operations' }}</span>
          </div>
        </div>
        <div class="flex gap-4">
          <div class="px-6 py-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] text-center min-w-[120px]">
            <p class="text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest mb-1">Status</p>
            <BaseBadge :variant="profile?.status === 'ACTIVE' ? 'success' : 'danger'">{{ profile?.status }}</BaseBadge>
          </div>
          <div class="px-6 py-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] text-center min-w-[120px]">
            <p class="text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest mb-1">Identity</p>
            <p class="text-sm font-black text-[var(--text-main)] uppercase tracking-tighter">ID-{{ profile?.id?.toString().padStart(4, '0') }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Personnel Data -->
      <div class="lg:col-span-2 space-y-10">
        <div class="card p-10">
          <div class="flex items-center justify-between mb-10">
            <h2 class="text-xl font-black text-[var(--text-main)] tracking-tight">Personnel Intelligence</h2>
            <div class="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-600">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div class="space-y-2">
              <label class="label">First Identification</label>
              <div class="input bg-[var(--bg-main)]/50 font-bold">{{ profile?.firstName }}</div>
            </div>
            <div class="space-y-2">
              <label class="label">Last Identification</label>
              <div class="input bg-[var(--bg-main)]/50 font-bold">{{ profile?.lastName }}</div>
            </div>
            <div class="space-y-2">
              <label class="label">Electronic Mail</label>
              <div class="input bg-[var(--bg-main)]/50 font-bold">{{ profile?.email }}</div>
            </div>
            <div class="space-y-2">
              <label class="label">Contact Frequency</label>
              <div class="input bg-[var(--bg-main)]/50 font-bold">{{ profile?.phone || 'Not Specified' }}</div>
            </div>
          </div>
        </div>

        <div class="card p-10">
          <div class="flex items-center justify-between mb-10">
            <h2 class="text-xl font-black text-[var(--text-main)] tracking-tight">Contractual Specification</h2>
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div class="space-y-2">
              <label class="label">Deployment Unit</label>
              <div class="input bg-[var(--bg-main)]/50 font-bold">{{ profile?.departmentName }}</div>
            </div>
            <div class="space-y-2">
              <label class="label">Strategic Role</label>
              <div class="input bg-[var(--bg-main)]/50 font-bold">{{ profile?.position }}</div>
            </div>
            <div class="space-y-2">
              <label class="label">Activation Date</label>
              <div class="input bg-[var(--bg-main)]/50 font-bold">{{ profile?.hireDate }}</div>
            </div>
            <div class="space-y-2">
              <label class="label">Financial Tier</label>
              <div class="input bg-[var(--bg-main)]/50 font-bold">${{ profile?.salary?.toLocaleString() }} / yr</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Side Column -->
      <div class="space-y-10">
        <div class="card p-8 bg-slate-900 text-white border-none shadow-2xl">
          <h3 class="text-lg font-black tracking-tight mb-6">System Security</h3>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Access Management</p>
          
          <button class="w-full btn-primary bg-primary-600 hover:bg-primary-500 mb-4 h-12">
            Reset Access Token
          </button>
          <button class="w-full btn-secondary bg-slate-800 border-slate-700 text-white hover:bg-slate-700 h-12">
            View Activity Logs
          </button>
          
          <div class="mt-8 pt-8 border-t border-slate-800">
            <div class="flex items-center justify-between text-xs mb-2">
              <span class="text-slate-500 font-bold uppercase">Security Level</span>
              <span class="text-emerald-400 font-black">HIGH</span>
            </div>
            <div class="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-500 w-full rounded-full"></div>
            </div>
          </div>
        </div>

        <div class="card p-8 bg-gradient-to-br from-primary-500/10 to-transparent">
          <h3 class="text-sm font-black text-[var(--text-main)] uppercase tracking-widest mb-4">Organizational Node</h3>
          <p class="text-xs text-[var(--text-muted)] leading-relaxed font-medium">
            This personnel record is cryptographically linked to the <strong>{{ profile?.departmentName }}</strong> unit. Any modifications require administrative clearance.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { employeesApi } from '@/api/employees'
import type { Employee } from '@/types'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'

const profile = ref<Employee | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await employeesApi.getMe()
    profile.value = response.data
  } finally {
    loading.value = false
  }
})
</script>
