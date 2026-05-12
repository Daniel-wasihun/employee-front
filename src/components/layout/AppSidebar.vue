<template>
  <aside 
    class="fixed inset-y-0 left-0 z-40 w-64 bg-[var(--bg-sidebar)] border-r border-[var(--border-subtle)] transition-all duration-300 transform md:relative md:translate-x-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Logo -->
    <div class="h-16 flex items-center gap-3 px-6 border-b border-[var(--border-subtle)]">
      <div class="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-600/20">
        <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18" />
        </svg>
      </div>
      <h1 class="text-xl font-bold text-[var(--text-main)] tracking-tight">EMS<span class="text-primary-500">Pro</span></h1>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
      <p class="px-2 mb-4 text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-[2px]">Main Menu</p>
      
      <router-link 
        v-for="item in navItems" 
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group"
        :class="$route.path === item.path ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'text-[var(--text-muted)] hover:text-primary-600 hover:bg-primary-500/10'"
      >
        <component :is="item.icon" class="w-5 h-5 transition-transform group-hover:scale-110" />
        <span class="font-medium">{{ item.name }}</span>
      </router-link>

      <div v-if="adminItems.length > 0" class="pt-6">
        <p class="px-2 mb-4 text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-[2px]">Administration</p>
        <router-link 
          v-for="item in adminItems" 
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group"
          :class="$route.path === item.path ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'text-[var(--text-muted)] hover:text-primary-600 hover:bg-primary-500/10'"
        >
          <component :is="item.icon" class="w-5 h-5 transition-transform group-hover:scale-110" />
          <span class="font-medium">{{ item.name }}</span>
        </router-link>
      </div>
    </nav>

    <!-- Footer / Version -->
    <div class="p-6 border-t border-[var(--border-subtle)]">
      <div class="bg-[var(--bg-input)] rounded-2xl p-4 flex items-center gap-3 border border-[var(--border-subtle)]">
        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span class="text-xs text-[var(--text-muted)] font-medium">System Online</span>
      </div>
    </div>
  </aside>

  <!-- Mobile Backdrop -->
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden transition-all duration-300"
    @click="$emit('close')"
  />
</template>

<script setup lang="ts">
import { computed, markRaw, h } from 'vue'
import { useAuth } from '@/composables/useAuth'

// Icons as functional components
const DashboardIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' })])
const EmployeesIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' })])
const DepartmentsIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6.75h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z' })])
const ProfileIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z' })])

defineProps<{ isOpen: boolean }>()
defineEmits<{ (e: 'close'): void }>()

const { hasRole } = useAuth()

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: markRaw(DashboardIcon) },
  { name: 'My Profile', path: '/profile', icon: markRaw(ProfileIcon) },
]

const adminItems = computed(() => {
  const items = []
  if (hasRole('ADMIN', 'MANAGER')) {
    items.push({ name: 'Employees', path: '/employees', icon: markRaw(EmployeesIcon) })
  }
  if (hasRole('ADMIN')) {
    items.push({ name: 'Departments', path: '/departments', icon: markRaw(DepartmentsIcon) })
  }
  return items
})
</script>
