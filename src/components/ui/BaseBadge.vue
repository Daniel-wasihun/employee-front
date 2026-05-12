<template>
  <span 
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-300',
      variantClasses[variant]
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary'

defineProps<{
  variant?: BadgeVariant
}>()

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  danger: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
  info: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20',
  secondary: 'bg-[var(--bg-input)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
}
</script>
