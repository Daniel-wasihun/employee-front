<template>
  <teleport to="body">
    <div class="fixed top-4 right-4 z-[100] space-y-2 max-w-sm w-full pointer-events-none">
      <transition-group name="slide-up">
        <div
          v-for="toast in notifications"
          :key="toast.id"
          :class="toastClass(toast.type)"
          class="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-xl cursor-pointer"
          @click="removeNotification(toast.id)"
        >
          <svg v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
          <svg v-else class="w-5 h-5 text-sky-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
          <p class="text-sm font-medium">{{ toast.message }}</p>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notification'

const store = useNotificationStore()
const { notifications } = storeToRefs(store)
const { removeNotification } = store

function toastClass(type) {
  const variants = {
    success: 'bg-dark-800/90 border-emerald-600/20 text-emerald-300',
    error: 'bg-dark-800/90 border-red-600/20 text-red-300',
    info: 'bg-dark-800/90 border-sky-600/20 text-sky-300',
  }
  return variants[type] || variants.info
}
</script>
