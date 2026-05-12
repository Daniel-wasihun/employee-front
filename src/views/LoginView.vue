<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-main)] transition-colors duration-500 overflow-hidden relative">
    <!-- Animated background accents -->
    <div class="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full animate-pulse" />
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" style="animation-delay: 2s" />
    </div>

    <div class="w-full max-w-md animate-in slide-up duration-700">
      <div class="card p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <!-- Theme Toggle in Login -->
        <button 
          @click="toggleTheme" 
          class="absolute top-4 right-4 p-2 rounded-xl text-[var(--text-dim)] hover:text-primary-600 hover:bg-primary-500/10 transition-all border border-transparent hover:border-primary-500/20"
        >
          <svg v-if="theme === 'light'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        </button>

        <!-- Logo Section -->
        <div class="flex flex-col items-center mb-10">
          <div class="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center shadow-xl shadow-primary-600/30 mb-4 transform hover:scale-110 transition-transform">
            <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18" />
            </svg>
          </div>
          <h1 class="text-3xl font-black text-[var(--text-main)] tracking-tighter">EMS<span class="text-primary-600">Pro</span></h1>
          <p class="text-[var(--text-muted)] text-sm mt-2 font-medium">Enterprise Management Suite</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div class="space-y-2">
            <label class="label uppercase tracking-widest text-[10px] font-bold">Work Email</label>
            <div class="relative group">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-[var(--text-dim)] group-focus-within:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                </svg>
              </span>
              <input 
                v-model="email" 
                type="email" 
                required 
                class="input pl-11" 
                placeholder="admin@ems.com"
                :disabled="loading"
              >
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <label class="label uppercase tracking-widest text-[10px] font-bold">Password</label>
              <a href="#" class="text-[10px] font-bold text-primary-600 hover:text-primary-500 uppercase tracking-widest transition-colors">Forgot?</a>
            </div>
            <div class="relative group">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-[var(--text-dim)] group-focus-within:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input 
                v-model="password" 
                type="password" 
                required 
                class="input pl-11" 
                placeholder="••••••••"
                :disabled="loading"
              >
            </div>
          </div>

          <button 
            type="submit" 
            class="btn-primary w-full h-12 text-base font-bold tracking-tight mt-4"
            :disabled="loading"
          >
            <template v-if="loading">
              <BaseSpinner size="sm" class="mr-2" /> Authenticating...
            </template>
            <template v-else>Sign In to Workspace</template>
          </button>
        </form>

        <div class="mt-8 p-4 bg-primary-500/5 rounded-2xl border border-primary-500/10">
          <p class="text-[10px] font-bold text-primary-600 uppercase tracking-[2px] mb-2 text-center">Demo Accounts</p>
          <div class="flex flex-col gap-1 text-xs font-medium text-[var(--text-muted)] text-center">
            <span>Admin: admin@ems.com / admin123</span>
            <span>Manager: manager@ems.com / manager123</span>
          </div>
        </div>
      </div>
      
      <p class="text-center mt-8 text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-[3px]">
        &copy; 2026 EMS PRO &bull; V1.0.4-STABLE
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useTheme } from '@/composables/useTheme'
import { useToast } from 'vue-toastification'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'

const { login } = useAuth()
const router = useRouter()
const toast = useToast()
const { theme, toggleTheme } = useTheme()

const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  try {
    await login(email.value, password.value)
    toast.success('Access granted. Welcome back!')
    router.push('/dashboard')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Authentication failed. Please check credentials.')
  } finally {
    loading.value = false
  }
}
</script>
