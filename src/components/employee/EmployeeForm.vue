<template>
  <form @submit.prevent="$emit('submit')" class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Basic Info -->
    <div class="space-y-4">
      <h4 class="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest border-b border-[var(--border-subtle)] pb-2">Personal Information</h4>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="label uppercase tracking-widest text-[10px] font-bold">First Name</label>
          <input v-model="form.firstName" type="text" required class="input" placeholder="John">
        </div>
        <div>
          <label class="label uppercase tracking-widest text-[10px] font-bold">Last Name</label>
          <input v-model="form.lastName" type="text" required class="input" placeholder="Doe">
        </div>
      </div>

      <div>
        <label class="label uppercase tracking-widest text-[10px] font-bold">Email Address</label>
        <input v-model="form.email" type="email" required class="input" placeholder="john.doe@company.com">
      </div>

      <div>
        <label class="label uppercase tracking-widest text-[10px] font-bold">Phone Number</label>
        <input v-model="form.phone" type="text" class="input" placeholder="+1 (555) 000-0000">
      </div>
    </div>

    <!-- Employment Info -->
    <div class="space-y-4">
      <h4 class="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest border-b border-[var(--border-subtle)] pb-2">Employment Details</h4>
      
      <div>
        <label class="label uppercase tracking-widest text-[10px] font-bold">Position / Title</label>
        <input v-model="form.position" type="text" required class="input" placeholder="Software Engineer">
      </div>

      <div>
        <label class="label uppercase tracking-widest text-[10px] font-bold">Department</label>
        <select v-model="form.departmentId" required class="input">
          <option :value="undefined" disabled>Select Department</option>
          <option v-for="dept in departments" :key="dept.id" :value="dept.id">
            {{ dept.name }}
          </option>
        </select>
      </div>

      <div v-if="isAdmin">
        <label class="label uppercase tracking-widest text-[10px] font-bold">Salary (Yearly)</label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]">$</span>
          <input v-model.number="form.salary" type="number" step="0.01" class="input pl-8" placeholder="0.00">
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="label uppercase tracking-widest text-[10px] font-bold">Hire Date</label>
          <input v-model="form.hireDate" type="date" required class="input">
        </div>
        <div>
          <label class="label uppercase tracking-widest text-[10px] font-bold">Status</label>
          <select v-model="form.status" class="input">
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <div class="md:col-span-2 flex justify-end gap-3 pt-6 border-t border-[var(--border-subtle)]">
      <button type="button" @click="$emit('cancel')" class="btn-secondary px-6">Cancel</button>
      <button type="submit" class="btn-primary px-8" :disabled="loading">
        <BaseSpinner v-if="loading" size="sm" class="mr-2" />
        {{ submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { departmentsApi } from '@/api/departments'
import type { Employee, Department } from '@/types'
import { useAuth } from '@/composables/useAuth'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'

const props = defineProps<{
  form: Partial<Employee>;
  loading?: boolean;
  submitLabel?: string;
}>()

defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>()

const { isAdmin } = useAuth()
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
