<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight">Dashboard Overview</h1>
      <p class="text-dark-400 mt-1">Real-time workforce analytics and metrics</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in statsCards" :key="stat.title" class="card p-6 flex items-center gap-5 group hover:border-primary-500/30 transition-all duration-300">
        <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${stat.colorClass} group-hover:scale-110 transition-transform duration-300`">
          <component :is="stat.icon" class="w-7 h-7 text-white" />
        </div>
        <div>
          <p class="text-xs font-bold text-dark-400 uppercase tracking-wider mb-1">{{ stat.title }}</p>
          <p class="text-2xl font-bold text-white tabular-nums">
            <template v-if="loading"><div class="h-8 w-16 bg-dark-700 animate-pulse rounded" /></template>
            <template v-else>{{ stat.value }}</template>
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Hires -->
      <div class="lg:col-span-2 card overflow-hidden">
        <div class="px-6 py-4 border-b border-dark-700/50 flex items-center justify-between">
          <h3 class="font-bold text-white flex items-center gap-2">
            <svg class="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
            Recent Hires
          </h3>
          <router-link to="/employees" class="text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors uppercase tracking-widest">View All</router-link>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-dark-850/50 text-left">
                <th class="px-6 py-3 text-xs font-bold text-dark-400 uppercase tracking-wider">Employee</th>
                <th class="px-6 py-3 text-xs font-bold text-dark-400 uppercase tracking-wider">Position</th>
                <th class="px-6 py-3 text-xs font-bold text-dark-400 uppercase tracking-wider">Department</th>
                <th class="px-6 py-3 text-xs font-bold text-dark-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-dark-700/30">
              <tr v-for="emp in stats?.recentHires" :key="emp.id" class="hover:bg-dark-700/20 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-xs font-bold text-white">{{ emp.firstName.charAt(0) }}{{ emp.lastName.charAt(0) }}</div>
                    <span class="text-sm font-medium text-white">{{ emp.firstName }} {{ emp.lastName }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-dark-300">{{ emp.position }}</td>
                <td class="px-6 py-4 text-sm text-dark-300">{{ emp.departmentName }}</td>
                <td class="px-6 py-4">
                  <BaseBadge :variant="emp.status === 'ACTIVE' ? 'success' : 'danger'">{{ emp.status }}</BaseBadge>
                </td>
              </tr>
              <tr v-if="loading && !stats">
                <td colspan="4" class="px-6 py-12 text-center"><BaseSpinner /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Department Distribution -->
      <div class="card p-6 flex flex-col h-full">
        <h3 class="font-bold text-white flex items-center gap-2 mb-6">
          <svg class="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" /></svg>
          Departments
        </h3>
        <div class="flex-1 space-y-4">
          <div v-for="(count, dept) in stats?.byDepartment" :key="dept" class="space-y-1.5">
            <div class="flex justify-between text-xs">
              <span class="font-medium text-dark-200">{{ dept }}</span>
              <span class="text-dark-400">{{ count }} employees</span>
            </div>
            <div class="h-1.5 w-full bg-dark-700 rounded-full overflow-hidden">
              <div 
                class="h-full bg-primary-500 rounded-full transition-all duration-1000"
                :style="{ width: `${(count / (stats?.totalEmployees || 1)) * 100}%` }"
              />
            </div>
          </div>
          <div v-if="!stats && !loading" class="flex flex-col items-center justify-center h-full text-dark-500 italic py-10">
            No department data
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, markRaw, h } from 'vue'
import { dashboardApi } from '@/api/dashboard'
import type { DashboardStats } from '@/types'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'

const stats = ref<DashboardStats | null>(null)
const loading = ref(true)

const UserGroupIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' })])
const ActiveIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })])
const InactiveIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' })])
const GrowthIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M2.25 18L9 11.25l4.306 4.307a11.25 11.25 0 005.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941' })])

const statsCards = computed(() => [
  { 
    title: 'Total Employees', 
    value: stats.value?.totalEmployees || 0, 
    icon: markRaw(UserGroupIcon),
    colorClass: 'bg-primary-500 shadow-primary-900/40' 
  },
  { 
    title: 'Active Now', 
    value: stats.value?.activeEmployees || 0, 
    icon: markRaw(ActiveIcon),
    colorClass: 'bg-emerald-500 shadow-emerald-900/40' 
  },
  { 
    title: 'On Leave', 
    value: stats.value?.inactiveEmployees || 0, 
    icon: markRaw(InactiveIcon),
    colorClass: 'bg-amber-500 shadow-amber-900/40' 
  },
  { 
    title: 'Total Growth', 
    value: '+12%', 
    icon: markRaw(GrowthIcon),
    colorClass: 'bg-sky-500 shadow-sky-900/40' 
  },
])

onMounted(async () => {
  try {
    const response = await dashboardApi.getStats()
    stats.value = response.data
  } finally {
    loading.value = false
  }
})
</script>
