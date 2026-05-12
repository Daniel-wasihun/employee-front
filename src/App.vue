<template>
  <div class="min-h-screen transition-colors duration-300">
    <router-view />
    <ToastNotification />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import ToastNotification from '@/components/ui/ToastNotification.vue'

const { theme } = useTheme()

onMounted(() => {
  // Theme is already initialized by useTheme's internal onMounted
  console.log(`[EMS] System initialized with ${theme.value} mode.`)
})
</script>

<style>
/* Global Transitions */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Base scrollbar for the whole app */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--border-strong);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--text-dim);
}
</style>
