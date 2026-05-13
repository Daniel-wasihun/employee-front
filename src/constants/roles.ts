export const USER_ROLES = [
  { value: 'ADMIN', label: 'Administrator', description: 'Full system access and management' },
  { value: 'MANAGER', label: 'Department Manager', description: 'Manage specific departments and staff' },
  { value: 'EMPLOYEE', label: 'Staff Member', description: 'Standard personnel access' }
] as const;

export type UserRoleValue = typeof USER_ROLES[number]['value'];
