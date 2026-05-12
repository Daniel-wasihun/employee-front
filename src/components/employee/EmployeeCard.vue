<template>
  <div class="card hover:border-primary-600/30 transition-all duration-300 group">
    <div class="flex items-start gap-4 p-4">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-600/20 group-hover:scale-105 transition-transform">
        {{ initials }}
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="text-white font-semibold truncate">{{ employee.firstName }} {{ employee.lastName }}</h4>
        <p class="text-dark-400 text-sm truncate">{{ employee.position || 'No position' }}</p>
        <div class="flex items-center gap-2 mt-2">
          <BaseBadge :variant="employee.status === 'ACTIVE' ? 'success' : 'danger'" size="xs">
            {{ employee.status }}
          </BaseBadge>
          <span v-if="employee.departmentName" class="text-[10px] uppercase font-bold text-dark-500 tracking-widest truncate">{{ employee.departmentName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EmployeeSummary } from '@/types'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const props = defineProps<{
  employee: EmployeeSummary;
}>()

const initials = computed(() => {
  const f = props.employee.firstName?.[0] || ''
  const l = props.employee.lastName?.[0] || ''
  return (f + l).toUpperCase()
})
</script>
