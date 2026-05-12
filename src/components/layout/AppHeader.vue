<template>
  <header class="h-16 flex-shrink-0 bg-dark-800/40 backdrop-blur-md border-b border-dark-700/50 flex items-center justify-between px-4 md:px-8 z-30">
    <div class="flex items-center gap-4">
      <button 
        @click="$emit('toggle-sidebar')"
        class="md:hidden p-2 rounded-xl text-dark-400 hover:text-white hover:bg-dark-700 transition-all"
        aria-label="Toggle sidebar"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
      </button>
      <h2 class="text-lg font-semibold text-white tracking-tight hidden sm:block">
        {{ routeName }}
      </h2>
    </div>

    <div class="flex items-center gap-2 sm:gap-4">
      <div class="hidden sm:flex flex-col items-end mr-2">
        <span class="text-sm font-medium text-white">{{ userEmail }}</span>
        <span class="text-[10px] uppercase tracking-widest text-dark-400 font-bold">{{ role }}</span>
      </div>
      
      <div class="relative group">
        <button class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-dark-700 transition-all">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-900/20">
            {{ userInitials }}
          </div>
          <svg class="w-4 h-4 text-dark-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        
        <!-- Dropdown -->
        <div class="absolute right-0 top-full mt-2 w-48 bg-dark-800 border border-dark-700/50 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 z-50">
          <router-link to="/profile" class="flex items-center gap-3 px-4 py-2 text-sm text-dark-200 hover:bg-dark-700 hover:text-white transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
            My Profile
          </router-link>
          <hr class="my-2 border-dark-700/50">
          <button @click="logout" class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const { userEmail, role, logout } = useAuth()

const routeName = computed(() => (route.name as string) || 'EMS')

const userInitials = computed(() => {
  if (!userEmail.value) return 'U'
  return userEmail.value.charAt(0).toUpperCase()
})

defineEmits<{
  (e: 'toggle-sidebar'): void;
}>()
</script>
