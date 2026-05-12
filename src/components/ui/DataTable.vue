<template>
  <div class="w-full flex flex-col transition-colors duration-300">
    <!-- Filters / Search -->
    <div v-if="searchable" class="p-4 md:p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
      <div class="relative max-w-md">
        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg class="h-5 h-5 text-[var(--text-dim)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          :value="searchQuery"
          @input="onSearch"
          type="text"
          placeholder="Search employees, positions..."
          class="input pl-11 py-3"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto custom-scrollbar">
      <table class="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr class="bg-[var(--bg-input)]/50">
            <th 
              v-for="col in columns" 
              :key="col.key"
              class="px-6 py-4 text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest border-b border-[var(--border-subtle)]"
            >
              {{ col.label }}
            </th>
            <th class="px-6 py-4 text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest border-b border-[var(--border-subtle)] text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--border-subtle)] bg-[var(--bg-card)] relative">
          <tr v-if="loading && data.length === 0" class="animate-pulse">
            <td :colspan="columns.length + 1" class="px-6 py-12 text-center">
              <BaseSpinner />
            </td>
          </tr>
          <tr v-else-if="data.length === 0">
            <td :colspan="columns.length + 1" class="px-6 py-12 text-center text-[var(--text-dim)] italic">
              No results found.
            </td>
          </tr>
          <template v-else>
            <transition-group name="list">
              <tr 
                v-for="row in data" 
                :key="row.id" 
                class="hover:bg-primary-500/5 transition-colors group"
              >
                <td v-for="col in columns" :key="col.key" class="px-6 py-4 whitespace-nowrap">
                  <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                    <span class="text-sm font-medium text-[var(--text-main)]">{{ row[col.key] || '—' }}</span>
                  </slot>
                </td>
                <td class="px-6 py-4 text-right whitespace-nowrap">
                  <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <slot name="actions_col" :row="row"></slot>
                  </div>
                </td>
              </tr>
            </transition-group>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 bg-[var(--bg-input)]/30 border-t border-[var(--border-subtle)] flex items-center justify-between">
      <div class="text-xs font-medium text-[var(--text-dim)]">
        Showing <span class="text-[var(--text-main)]">{{ (page * size) + 1 }}</span> to 
        <span class="text-[var(--text-main)]">{{ Math.min((page + 1) * size, totalElements) }}</span> of 
        <span class="text-[var(--text-main)]">{{ totalElements }}</span> results
      </div>
      <div class="flex items-center gap-2">
        <button 
          @click="$emit('page-change', page - 1)" 
          :disabled="page === 0"
          class="p-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-muted)] hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
        </button>
        <span class="text-xs font-bold text-[var(--text-main)] px-3">Page {{ page + 1 }} of {{ totalPages }}</span>
        <button 
          @click="$emit('page-change', page + 1)" 
          :disabled="page >= totalPages - 1"
          class="p-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-muted)] hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSpinner from './BaseSpinner.vue'

interface Column {
  key: string
  label: string
}

defineProps<{
  columns: Column[]
  data: any[]
  loading?: boolean
  searchable?: boolean
  searchQuery?: string
  page: number
  size: number
  totalElements: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'search', query: string): void
  (e: 'page-change', page: number): void
}>()

function onSearch(event: Event) {
  const query = (event.target as HTMLInputElement).value
  emit('search', query)
}
</script>
