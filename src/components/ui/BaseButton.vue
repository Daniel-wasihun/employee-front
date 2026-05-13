<template>
  <component
    :is="to ? 'router-link' : href ? 'a' : 'button'"
    :to="to"
    :href="href"
    :type="to || href ? undefined : type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses[variant],
      sizeClasses[size],
      block ? 'w-full' : ''
    ]"
    @click="$emit('click', $event)"
  >
    <template v-if="loading">
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>{{ loadingText || 'Processing...' }}</span>
    </template>
    <template v-else>
      <slot name="icon-left"></slot>
      <slot></slot>
      <slot name="icon-right"></slot>
    </template>
  </component>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  loadingText?: string
  disabled?: boolean
  block?: boolean
  to?: string | object
  href?: string
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  block: false
})

defineEmits(['click'])

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'h-12 px-8 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/20 active:scale-95 transition-all duration-300'
}

const sizeClasses = {
  sm: 'h-9 px-4 text-xs rounded-xl',
  md: 'h-12 px-8 text-sm rounded-2xl',
  lg: 'h-14 px-10 text-base rounded-2xl'
}
</script>
