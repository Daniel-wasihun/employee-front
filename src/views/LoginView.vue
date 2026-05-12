<template>
  <div class="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated background gradients -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 blur-[150px] -z-10 rounded-full animate-pulse" />
    <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] -z-10 rounded-full animate-pulse" style="animation-delay: 2s" />

    <div class="w-full max-w-md">
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-2xl shadow-primary-900/30 mb-4 transform hover:scale-110 transition-transform duration-300">
          <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18" />
          </svg>
        </div>
        <h1 class="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h1>
        <p class="text-dark-400 mt-2">Sign in to manage your workforce</p>
      </div>

      <div class="bg-dark-800/50 backdrop-blur-xl border border-dark-700/50 rounded-3xl shadow-2xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-semibold text-dark-300 mb-2">Email Address</label>
            <div class="relative group">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500 group-focus-within:text-primary-400 transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              </span>
              <input 
                id="email" 
                v-model="email" 
                type="email" 
                required 
                placeholder="name@company.com"
                class="input pl-12 h-12"
              >
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label for="password" class="block text-sm font-semibold text-dark-300">Password</label>
              <a href="#" class="text-xs text-primary-400 hover:text-primary-300 transition-colors">Forgot password?</a>
            </div>
            <div class="relative group">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500 group-focus-within:text-primary-400 transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
              </span>
              <input 
                id="password" 
                v-model="password" 
                type="password" 
                required 
                placeholder="••••••••"
                class="input pl-12 h-12"
              >
            </div>
          </div>

          <BaseAlert v-if="error" type="error" class="text-xs">
            {{ error }}
          </BaseAlert>

          <button 
            type="submit" 
            class="btn-primary w-full h-12 text-base font-bold shadow-lg shadow-primary-900/30 flex items-center justify-center gap-3"
            :disabled="loading"
          >
            <BaseSpinner v-if="loading" size="sm" />
            <span v-else>Sign In</span>
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-dark-700/50 text-center">
          <p class="text-dark-400 text-sm">
            Demo Accounts: <span class="text-dark-200">admin@ems.com / admin123</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import BaseAlert from '@/components/ui/BaseAlert.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import { useToast } from 'vue-toastification'

const { login } = useAuth()
const toast = useToast()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    await login(email.value, password.value)
    toast.success('Logged in successfully!')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Invalid credentials'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}
</script>
