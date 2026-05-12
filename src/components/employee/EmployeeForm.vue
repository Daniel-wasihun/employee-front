<template>
  <form @submit.prevent="$emit('submit', employee)" class="space-y-10 animate-in">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <!-- Personal Intelligence Section -->
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-black text-primary-500 uppercase tracking-[0.2em] mb-6">Personal Intelligence</h3>
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="label">First Name</label>
                <input v-model="employee.firstName" type="text" required class="input" placeholder="e.g. Alexander">
              </div>
              <div>
                <label class="label">Last Name</label>
                <input v-model="employee.lastName" type="text" required class="input" placeholder="e.g. Sterling">
              </div>
            </div>
            <div>
              <label class="label">Professional Email</label>
              <input v-model="employee.email" type="email" required class="input" placeholder="a.sterling@organization.com">
            </div>
            <div>
              <label class="label">Contact Number</label>
              <input v-model="employee.phone" type="tel" class="input" placeholder="+1 (555) 000-0000">
            </div>
          </div>
        </div>
      </div>

      <!-- Professional Placement Section -->
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-black text-primary-500 uppercase tracking-[0.2em] mb-6">Professional Placement</h3>
          <div class="space-y-6">
            <div>
              <label class="label">Strategic Role</label>
              <input v-model="employee.position" type="text" required class="input" placeholder="e.g. Principal Architect">
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="label">Functional Unit</label>
                <div class="relative group">
                  <select v-model="employee.departmentId" required class="input appearance-none pr-10">
                    <option :value="undefined" disabled>Select Unit</option>
                    <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                      {{ dept.name }}
                    </option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-(--text-dim) group-hover:text-primary-500">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              <div>
                <label class="label">Activation Date</label>
                <input v-model="employee.hireDate" type="date" required class="input">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="label">Financial Allocation</label>
                <div class="relative">
                  <span class="absolute left-4 inset-y-0 flex items-center text-(--text-dim) font-bold">$</span>
                  <input v-model="employee.salary" type="number" step="0.01" required class="input pl-8" placeholder="0.00">
                </div>
              </div>
              <div>
                <label class="label">Status Tier</label>
                <div class="relative group">
                  <select v-model="employee.status" required class="input appearance-none pr-10">
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-(--text-dim) group-hover:text-primary-500">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end items-center gap-4 pt-10 border-t border-(--border-subtle)">
      <button type="button" @click="$emit('cancel')" class="btn-secondary px-10">Discard</button>
      <button type="submit" class="btn-primary min-w-[200px] h-12" :disabled="loading">
        <template v-if="loading">
          <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <span class="ml-2">Processing...</span>
        </template>
        <template v-else>
          <span>{{ isEditing ? 'Save Changes' : 'Create Employee' }}</span>
        </template>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { departmentsApi } from '@/api/departments'
import type { Employee, Department } from '@/types'

const props = defineProps<{
  employee: Partial<Employee>
  loading?: boolean
  isEditing?: boolean
}>()

defineEmits(['submit', 'cancel'])

// Writable local copy — v-model inputs need a reactive ref, not a readonly prop
const employee = ref<Partial<Employee>>({ ...props.employee })

// Re-sync when parent swaps the employee (e.g. switching between create/edit modal)
watch(() => props.employee, (newVal) => {
  employee.value = { ...newVal }
}, { deep: true })

const departments = ref<Department[]>([])

onMounted(async () => {
  try {
    const response = await departmentsApi.getAll()
    departments.value = response.data
  } catch (err) {
    console.error('Failed to load departments', err)
  }
})
</script>
