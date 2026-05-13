<template>
  <div class="space-y-10 animate-in pb-12">
    <!-- Premium Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <p class="text-[10px] font-black text-primary-500 uppercase tracking-[0.3em] mb-2">Internal Analytics</p>
        <h1 class="text-4xl font-black text-[var(--text-main)] tracking-tight">Organization Overview</h1>
      </div>
      <div class="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] p-1.5 rounded-2xl shadow-sm">
        <div class="px-4 py-2 rounded-xl bg-primary-500/10 text-primary-600 text-xs font-bold">Real-time</div>
        <div class="px-4 py-2 text-[var(--text-dim)] text-xs font-bold">{{ currentDate }}</div>
      </div>
    </div>

    <!-- Stats Grid with Glassmorphism -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="stat in statsCards" :key="stat.title" class="card card-hover p-8 group relative overflow-hidden">
        <div class="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary-500/5 rounded-full blur-2xl group-hover:bg-primary-500/10 transition-colors duration-500"></div>
        <div class="flex flex-col gap-6 relative z-10">
          <div :class="`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${stat.colorClass} group-hover:rotate-12 transition-transform duration-500 text-white`">
            <component :is="stat.icon" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-[11px] font-black text-[var(--text-dim)] uppercase tracking-widest mb-1">{{ stat.title }}</p>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black text-[var(--text-main)] tracking-tighter">
                <template v-if="loading"><div class="h-9 w-20 bg-[var(--bg-main)] animate-pulse rounded-lg" /></template>
                <template v-else>{{ stat.value }}</template>
              </span>
              <span v-if="stat.trend" class="text-xs font-black text-emerald-500">{{ stat.trend }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Recent Talent Acquisition -->
      <div class="lg:col-span-2 card p-1">
        <div class="p-8 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-black text-[var(--text-main)] tracking-tight">Recent Acquisitions</h3>
            <p class="text-xs font-bold text-[var(--text-dim)] uppercase tracking-widest mt-1">Latest talent onboarding</p>
          </div>
          <BaseButton to="/employees" variant="secondary" size="sm">
            View Directory
          </BaseButton>
        </div>
        <div class="overflow-x-auto px-4 pb-4">
          <table class="w-full">
            <thead>
              <tr class="text-left">
                <th class="px-6 py-4 text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest">Candidate</th>
                <th class="px-6 py-4 text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest">Specialization</th>
                <th class="px-6 py-4 text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest">Department</th>
                <th class="px-6 py-4 text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--border-subtle)]/50">
              <tr v-for="emp in stats?.recentHires" :key="emp.id" class="hover:bg-primary-500/[0.03] transition-colors group">
                <td class="px-6 py-5">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--bg-input)] to-[var(--bg-main)] border border-[var(--border-subtle)] flex items-center justify-center text-xs font-black text-[var(--text-main)] shadow-sm group-hover:scale-110 transition-transform">
                      {{ emp.firstName[0] }}{{ emp.lastName[0] }}
                    </div>
                    <div>
                      <p class="text-sm font-bold text-[var(--text-main)]">{{ emp.firstName }} {{ emp.lastName }}</p>
                      <p class="text-[10px] text-[var(--text-dim)] font-medium">{{ emp.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5 text-sm font-semibold text-[var(--text-muted)]">{{ emp.position }}</td>
                <td class="px-6 py-5">
                  <span class="px-3 py-1 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[10px] font-black text-[var(--text-muted)] uppercase">{{ emp.departmentName }}</span>
                </td>
                <td class="px-6 py-5 text-right">
                  <BaseBadge :variant="emp.status === 'ACTIVE' ? 'success' : 'danger'">{{ emp.status }}</BaseBadge>
                </td>
              </tr>
              <tr v-if="loading && !stats">
                <td colspan="4" class="px-6 py-20 text-center"><BaseSpinner /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Structural Insights -->
      <div class="card p-8 flex flex-col h-full bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-main)]">
        <h3 class="text-xl font-black text-[var(--text-main)] tracking-tight mb-2">Structural Allocation</h3>
        <p class="text-xs font-bold text-[var(--text-dim)] uppercase tracking-widest mb-10">Departmental headcount</p>
        
        <div class="flex-1 space-y-8">
          <div v-for="(count, dept) in stats?.byDepartment" :key="dept" class="space-y-3">
            <div class="flex justify-between items-end">
              <div>
                <span class="text-sm font-bold text-[var(--text-main)] block">{{ dept }}</span>
                <span class="text-[10px] font-black text-primary-500 uppercase tracking-widest">{{ Math.round((count / (stats?.totalEmployees || 1)) * 100) }}% Impact</span>
              </div>
              <span class="text-xs font-black text-[var(--text-dim)] bg-[var(--bg-input)] px-2 py-1 rounded-md">{{ count }}</span>
            </div>
            <div class="h-2.5 w-full bg-[var(--border-subtle)]/30 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(2,113,187,0.3)]"
                :style="{ width: `${(count / (stats?.totalEmployees || 1)) * 100}%` }"
              />
            </div>
          </div>
          <div v-if="!stats && !loading" class="flex flex-col items-center justify-center h-full text-[var(--text-dim)] italic py-10">
            Scanning organization...
          </div>
        </div>

        <div class="mt-12 p-6 rounded-3xl bg-primary-600 text-white shadow-2xl shadow-primary-600/20">
          <p class="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">System Insight</p>
          <p class="text-sm font-bold leading-relaxed">
            Your workforce has grown by 12% this quarter. Engineering leads in talent acquisition.
          </p>
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
import BaseButton from '@/components/ui/BaseButton.vue'

const stats = ref<DashboardStats | null>(null)
const loading = ref(true)
const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const UserGroupIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '2.5' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' })])
const ActiveIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '2.5' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })])
const InactiveIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '2.5' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' })])
const GrowthIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '2.5' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M2.25 18L9 11.25l4.306 4.307a11.25 11.25 0 005.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941' })])

const statsCards = computed(() => [
  { 
    title: 'Workforce', 
    value: stats.value?.totalEmployees || 0, 
    icon: markRaw(UserGroupIcon),
    colorClass: 'bg-primary-600 shadow-primary-600/30',
    trend: '+4'
  },
  { 
    title: 'Operational', 
    value: stats.value?.activeEmployees || 0, 
    icon: markRaw(ActiveIcon),
    colorClass: 'bg-emerald-600 shadow-emerald-600/30',
    trend: '98%'
  },
  { 
    title: 'Standby', 
    value: stats.value?.inactiveEmployees || 0, 
    icon: markRaw(InactiveIcon),
    colorClass: 'bg-amber-600 shadow-amber-600/30' 
  },
  { 
    title: 'Expansion', 
    value: '12%', 
    icon: markRaw(GrowthIcon),
    colorClass: 'bg-sky-600 shadow-sky-600/30' 
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
