<template>
  <div class="space-y-2 w-full">
    <div v-if="label" class="flex justify-between items-end mb-1">
      <label :for="id" class="label mb-0">{{ label }}</label>
      <slot name="label-right"></slot>
    </div>
    
    <div class="relative group">
      <!-- Icon Left -->
      <div 
        v-if="$slots['icon-left']" 
        class="absolute left-4 inset-y-0 flex items-center text-[var(--text-dim)] group-focus-within:text-primary-500 transition-colors pointer-events-none"
      >
        <slot name="icon-left"></slot>
      </div>

      <component
        :is="is"
        :id="id"
        :type="is === 'input' ? type : undefined"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="[
          'input',
          is === 'textarea' ? 'h-32 py-4 resize-none leading-relaxed' : '',
          $slots['icon-left'] ? 'pl-12' : '',
          $slots['icon-right'] ? 'pr-12' : '',
          error ? 'border-rose-500/50 focus:border-rose-500' : ''
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement | HTMLTextAreaElement).value)"
      />

      <!-- Icon Right -->
      <div 
        v-if="$slots['icon-right']" 
        class="absolute right-4 inset-y-0 flex items-center text-[var(--text-dim)] group-focus-within:text-primary-500 transition-colors pointer-events-none"
      >
        <slot name="icon-right"></slot>
      </div>
    </div>

    <p v-if="error" class="text-[10px] font-bold text-rose-500 uppercase tracking-widest mt-1 ml-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  label?: string
  id?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  is?: 'input' | 'textarea'
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  is: 'input'
})

defineEmits(['update:modelValue'])
</script>
