export type UserRole = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

export interface User {
  userId: number;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  email: string;
  role: UserRole;
}

export interface Employee {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position?: string;
  departmentId?: number;
  departmentName?: string;
  salary?: number;
  hireDate?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeSummary {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position?: string;
  departmentName?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Department {
  id: number;
  name: string;
  description?: string;
  managerId?: number;
  managerName?: string;
  employeeCount?: number;
}

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  byDepartment: Record<string, number>;
  recentHires: EmployeeSummary[];
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
