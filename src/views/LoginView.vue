<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--bg-main)] relative overflow-hidden px-4">
    <!-- Sophisticated Background Effects -->
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-500/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s"></div>
    </div>

    <!-- Login Container -->
    <div class="w-full max-w-[480px] relative z-10 animate-in">
      <div class="card p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border-[var(--border-strong)]/20">
        <!-- Logo/Branding -->
        <div class="flex flex-col items-center mb-12">
          <div class="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-2xl shadow-primary-600/30 mb-6 scale-110">
            <svg class="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18" />
            </svg>
          </div>
          <h1 class="text-3xl font-black text-[var(--text-main)] tracking-tight">EMS<span class="text-primary-500">PRO</span></h1>
          <p class="text-sm font-bold text-[var(--text-dim)] uppercase tracking-[0.2em] mt-2">Enterprise Intelligence</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-8">
          <div class="space-y-6">
            <div class="space-y-2">
              <label class="label">Corporate Email</label>
              <div class="relative group">
                <div class="absolute left-4 inset-y-0 flex items-center text-[var(--text-dim)] group-focus-within:text-primary-500 transition-colors">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                </div>
                <input v-model="email" type="email" required class="input pl-12 h-14" placeholder="name@company.com">
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-end mb-1">
                <label class="label mb-0">Access Credential</label>
                <a href="#" class="text-[10px] font-black text-primary-500 uppercase tracking-widest hover:text-primary-400 transition-colors">Recovery?</a>
              </div>
              <div class="relative group">
                <div class="absolute left-4 inset-y-0 flex items-center text-[var(--text-dim)] group-focus-within:text-primary-500 transition-colors">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                </div>
                <input v-model="password" type="password" required class="input pl-12 h-14" placeholder="••••••••">
              </div>
            </div>
          </div>

          <button type="submit" class="w-full btn-primary h-14 text-base tracking-tight" :disabled="loading">
            <template v-if="loading">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span class="ml-2">Authenticating...</span>
            </template>
            <template v-else>
              <span>Authorize Access</span>
            </template>
          </button>
        </form>

        <!-- Footer -->
        <div class="mt-12 flex items-center justify-between">
          <button @click="toggleTheme" class="flex items-center gap-2 text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest hover:text-primary-500 transition-colors">
            <svg v-if="theme === 'light'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
            <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
            Mode Toggle
          </button>
          <p class="text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest">v1.0.0-PRO</p>
        </div>
      </div>
      
      <p class="text-center mt-8 text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-[0.25em]">Secure Terminal Interface</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const { login } = useAuthStore()
const toast = useToast()
const { theme, toggleTheme } = useTheme()

const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  try {
    await login(email.value, password.value)
    toast.success('Access Granted. Welcome back.')
    router.push('/dashboard')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Authentication Failed')
  } finally {
    loading.value = false
  }
}
</script>
