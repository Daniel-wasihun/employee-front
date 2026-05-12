<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-400 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden p-4 md:p-6">
        <!-- Full Page Backdrop with Deep Blur -->
        <div 
          class="fixed inset-0 bg-slate-950/40 dark:bg-black/70 backdrop-blur-premium transition-opacity" 
          @click="close"
        ></div>

        <!-- Modal Container -->
        <Transition
          enter-active-class="transition duration-500 ease-out delay-100"
          enter-from-class="opacity-0 scale-95 translate-y-8"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
          appear
        >
          <div 
            :class="[
              'relative bg-[var(--bg-card)] rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] border border-[var(--border-strong)]/30 overflow-hidden w-full transition-all duration-500',
              sizeClasses[size]
            ]"
          >
            <!-- Header -->
            <div class="px-8 py-6 border-b border-[var(--border-subtle)] flex items-center justify-between bg-gradient-to-r from-[var(--bg-input)] to-transparent">
              <div>
                <h3 class="text-xl font-black text-[var(--text-main)] tracking-tight">{{ title }}</h3>
                <p v-if="subtitle" class="text-xs font-bold text-[var(--text-dim)] uppercase tracking-widest mt-1">{{ subtitle }}</p>
              </div>
              <button 
                @click="close" 
                class="p-3 rounded-2xl text-[var(--text-dim)] hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <!-- Body -->
            <div class="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <slot />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const emit = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl'
}
</script>
