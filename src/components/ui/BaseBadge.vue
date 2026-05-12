<template>
  <span :class="classes">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'xs' | 'sm' | 'md';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm',
})

const classes = computed(() => {
  const base = 'inline-flex items-center font-medium rounded-full transition-colors duration-200'
  const sizes = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }
  const variants = {
    default: 'bg-dark-700 text-dark-300',
    primary: 'bg-primary-600/10 text-primary-400 border border-primary-600/20',
    success: 'bg-emerald-600/10 text-emerald-400 border border-emerald-600/20',
    warning: 'bg-amber-600/10 text-amber-400 border border-amber-600/20',
    danger: 'bg-red-600/10 text-red-400 border border-red-600/20',
    info: 'bg-sky-600/10 text-sky-400 border border-sky-600/20',
  }
  return `${base} ${sizes[props.size]} ${variants[props.variant]}`
})
</script>
