<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="onBackdropClick" />

        <!-- Modal -->
        <transition name="slide-up">
          <div
            v-if="modelValue"
            class="relative w-full bg-dark-800 border border-dark-700/50 rounded-2xl shadow-2xl flex flex-col my-auto"
            :class="sizeClass"
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-dark-700/50">
              <h3 class="text-lg font-semibold text-white truncate">{{ title }}</h3>
              <button
                @click="$emit('update:modelValue', false)"
                class="p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-colors"
                aria-label="Close modal"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="px-6 py-5 overflow-y-auto max-h-[calc(100vh-160px)]">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="flex items-center justify-end gap-3 px-6 py-4 border-t border-dark-700/50 bg-dark-850/50 rounded-b-2xl">
              <slot name="footer" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdrop?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  size: 'md',
  closeOnBackdrop: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>()

const sizeClass = computed(() => ({
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}[props.size]))

const onBackdropClick = () => {
  if (props.closeOnBackdrop) {
    emit('update:modelValue', false)
  }
}
</script>
