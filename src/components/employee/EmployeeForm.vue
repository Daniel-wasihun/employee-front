<template>
  <form @submit.prevent="$emit('submit', employee)" class="space-y-10 animate-in">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <!-- Personal Intelligence Section -->
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-black text-primary-500 uppercase tracking-[0.2em] mb-6">Identity Information</h3>
            <div class="grid grid-cols-2 gap-6">
              <BaseInput
                :model-value="employee.firstName || ''"
                @update:model-value="employee.firstName = $event"
                label="First Name"
                placeholder="e.g. Alexander"
                required
              />
              <BaseInput
                :model-value="employee.lastName || ''"
                @update:model-value="employee.lastName = $event"
                label="Last Name"
                placeholder="e.g. Sterling"
                required
              />
            </div>
            <BaseInput
              :model-value="employee.email || ''"
              @update:model-value="employee.email = $event"
              type="email"
              label="Email Address"
              placeholder="a.sterling@organization.com"
              required
            />
            <BaseInput
              :model-value="employee.phone || ''"
              @update:model-value="employee.phone = $event"
              type="tel"
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

      <!-- Professional Placement Section -->
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-black text-primary-500 uppercase tracking-[0.2em] mb-6">Organizational Setup</h3>
          <div class="space-y-6">
            <BaseSelect
              v-model="employee.role"
              label="Strategic Authorization"
              required
              @update:model-value="onRoleChange"
            >
              <option :value="undefined" disabled>Select Authorization Level</option>
              <option v-for="role in roles" :key="role.value" :value="role.value">
                {{ role.label }}
              </option>
            </BaseSelect>

            <div class="grid grid-cols-2 gap-6">
              <BaseSelect
                v-model="employee.departmentId"
                label="Department"
                required
              >
                <option :value="undefined" disabled>Select Department</option>
                <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                  {{ dept.name }}
                </option>
              </BaseSelect>
              
              <BaseInput
                :model-value="employee.hireDate || ''"
                @update:model-value="employee.hireDate = $event"
                type="date"
                label="Hire Date"
                required
              />
            </div>

            <div class="grid grid-cols-2 gap-6">
              <BaseInput
                :model-value="employee.salary || 0"
                @update:model-value="employee.salary = $event"
                type="number"
                label="Salary"
                placeholder="0.00"
                required
              >
                <template #icon-left>
                  <span class="font-bold text-[var(--text-dim)]">$</span>
                </template>
              </BaseInput>

              <BaseSelect
                v-model="employee.status"
                label="Current Status"
                required
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </BaseSelect>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end items-center gap-4 pt-10 border-t border-(--border-subtle)">
      <BaseButton type="button" variant="secondary" @click="$emit('cancel')">
        Discard
      </BaseButton>
      <BaseButton
        type="submit"
        :loading="loading"
        :loading-text="isEditing ? 'Saving...' : 'Creating...'"
        class="min-w-[200px]"
      >
        {{ isEditing ? 'Save Changes' : 'Create Employee' }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { departmentsApi } from '@/api/departments'
import { metadataApi } from '@/api/metadata'
import type { Employee, Department } from '@/types'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps<{
  employee: Partial<Employee>
  loading?: boolean
  isEditing?: boolean
}>()

defineEmits(['submit', 'cancel'])

// Writable local copy — v-model inputs need a reactive ref, not a readonly prop
const employee = ref<Partial<Employee>>({ 
  role: 'EMPLOYEE',
  ...props.employee 
})

// Re-sync when parent swaps the employee (e.g. switching between create/edit modal)
watch(() => props.employee, (newVal) => {
  employee.value = { ...newVal }
}, { deep: true })

const departments = ref<Department[]>([])
const roles = ref<{ value: string, label: string }[]>([])

function onRoleChange(newRole: string) {
  const roleObj = roles.value.find(r => r.value === newRole)
  if (roleObj) {
    employee.value.position = roleObj.label
  }
}

onMounted(async () => {
  try {
    const [deptRes, roleRes] = await Promise.all([
      departmentsApi.getAll(),
      metadataApi.getRoles()
    ])
    departments.value = deptRes.data
    roles.value = roleRes.data
  } catch (err) {
    console.error('Failed to load form metadata', err)
  }
})
</script>
