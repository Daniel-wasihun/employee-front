<template>
  <div :class="classes" role="alert" class="transition-all duration-300">
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0">
        <svg v-if="type === 'success'" class="w-5 h-5 text-emerald-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <svg v-else-if="type === 'error'" class="w-5 h-5 text-red-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
        <svg v-else-if="type === 'warning'" class="w-5 h-5 text-amber-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
        <svg v-else class="w-5 h-5 text-sky-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium"><slot /></p>
      </div>
      <button v-if="dismissible" @click="$emit('dismiss')" class="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors" aria-label="Dismiss alert">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'success' | 'error' | 'warning' | 'info';
  dismissible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  dismissible: false,
})

defineEmits<{
  (e: 'dismiss'): void;
}>()

const classes = computed(() => {
  const base = 'rounded-xl px-4 py-3 border backdrop-blur-md'
  const variants = {
    success: 'bg-emerald-600/10 border-emerald-600/20 text-emerald-300',
    error: 'bg-red-600/10 border-red-600/20 text-red-300',
    warning: 'bg-amber-600/10 border-amber-600/20 text-amber-300',
    info: 'bg-sky-600/10 border-sky-600/20 text-sky-300',
  }
  return `${base} ${variants[props.type] || variants.info}`
})
</script>
