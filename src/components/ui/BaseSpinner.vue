<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div :class="spinnerClass" class="animate-spin rounded-full border-2 border-current border-t-transparent text-primary-500" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const spinnerClass = computed(() => ({
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-10 h-10',
}[props.size]))

const containerClass = computed(() => ({
  sm: 'p-0.5',
  md: 'p-1',
  lg: 'p-2',
}[props.size]))
</script>
