<template>
  <header class="h-16 flex-shrink-0 bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-subtle)] flex items-center justify-between px-4 md:px-8 z-30 transition-colors duration-300">
    <div class="flex items-center gap-4">
      <button 
        @click="$emit('toggle-sidebar')"
        class="md:hidden p-2 rounded-xl text-[var(--text-muted)] hover:text-primary-600 hover:bg-primary-500/10 transition-all"
        aria-label="Toggle sidebar"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
      </button>
      <h2 class="text-lg font-semibold text-[var(--text-main)] tracking-tight hidden sm:block">
        {{ routeName }}
      </h2>
    </div>

    <div class="flex items-center gap-2 sm:gap-4">
      <!-- Theme Toggle -->
      <button 
        @click="toggleTheme" 
        class="p-2.5 rounded-xl text-[var(--text-muted)] hover:text-primary-600 hover:bg-primary-500/10 transition-all border border-transparent hover:border-primary-500/20"
        :title="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
      >
        <svg v-if="theme === 'light'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      </button>

      <div class="hidden sm:flex flex-col items-end mr-2">
        <span class="text-sm font-medium text-[var(--text-main)]">{{ userEmail }}</span>
        <span class="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">{{ role }}</span>
      </div>
      
      <div class="relative group">
        <button class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-primary-500/10 transition-all border border-transparent group-hover:border-primary-500/20">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-600/20">
            {{ userInitials }}
          </div>
          <svg class="w-4 h-4 text-[var(--text-muted)] group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        
        <!-- Dropdown -->
        <div class="absolute right-0 top-full mt-3 w-56 bg-[var(--bg-card)] backdrop-blur-xl border border-[var(--border-strong)]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-90 group-hover:scale-100 z-50 overflow-hidden">
          <div class="px-4 py-2 border-b border-[var(--border-subtle)] mb-1 sm:hidden">
            <p class="text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest">Account</p>
            <p class="text-xs font-bold text-[var(--text-main)] truncate">{{ userEmail }}</p>
          </div>
          <router-link to="/profile" class="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-main)] hover:bg-primary-500/10 hover:text-primary-600 transition-colors font-semibold">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
            Personnel Profile
          </router-link>
          <button @click="logout" class="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors text-left font-bold">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
            Terminate Session
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
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const { userEmail, role, logout } = useAuth()
const { theme, toggleTheme } = useTheme()

const routeName = computed(() => (route.name as string) || 'EMS')

const userInitials = computed(() => {
  if (!userEmail.value) return 'U'
  return userEmail.value.charAt(0).toUpperCase()
})

defineEmits<{
  (e: 'toggle-sidebar'): void;
}>()
</script>
