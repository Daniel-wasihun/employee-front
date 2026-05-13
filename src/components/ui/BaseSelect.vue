<template>
  <div class="space-y-2 w-full">
    <label v-if="label" :for="id" class="label">{{ label }}</label>
    
    <div class="relative group">
      <select
        :id="id"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        class="input appearance-none pr-10"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <slot></slot>
      </select>
      
      <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-[var(--text-dim)] group-hover:text-primary-500 transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <p v-if="error" class="text-[10px] font-bold text-rose-500 uppercase tracking-widest mt-1 ml-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number | undefined
  label?: string
  id?: string
  required?: boolean
  disabled?: boolean
  error?: string
}

withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false
})

defineEmits(['update:modelValue'])
</script>
