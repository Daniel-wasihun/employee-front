<template>
  <div class="overflow-hidden rounded-2xl border border-dark-700/50">
    <!-- Search + Actions bar -->
    <div v-if="searchable || $slots.actions" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-dark-800/40">
      <div v-if="searchable" class="relative w-full sm:w-72">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          :value="searchQuery"
          @input="onSearch"
          placeholder="Search..."
          class="input pl-10 py-2 text-sm"
        />
      </div>
      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-dark-800/60">
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3 text-left text-xs font-semibold text-dark-300 uppercase tracking-wider transition-colors"
              :class="col.sortable !== false ? 'cursor-pointer hover:text-primary-400' : ''"
              @click="col.sortable !== false && $emit('sort', col.key)"
            >
              <div class="flex items-center gap-1">
                {{ col.label }}
                <svg v-if="sortBy === col.key" class="w-3 h-3" :class="sortDir === 'asc' ? '' : 'rotate-180'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </div>
            </th>
            <th v-if="$slots.actions_col" class="px-4 py-3 text-right text-xs font-semibold text-dark-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-dark-700/30">
          <tr v-if="loading" class="bg-dark-800/20">
            <td :colspan="columns.length + ($slots.actions_col ? 1 : 0)" class="px-4 py-12 text-center">
              <BaseSpinner />
            </td>
          </tr>
          <tr v-else-if="!data.length" class="bg-dark-800/20">
            <td :colspan="columns.length + ($slots.actions_col ? 1 : 0)" class="px-4 py-12 text-center text-dark-400 text-sm">
              No data found
            </td>
          </tr>
          <tr
            v-else
            v-for="(row, index) in data"
            :key="row.id || index"
            class="bg-dark-800/20 hover:bg-dark-700/30 transition-colors"
          >
            <td v-for="col in columns" :key="col.key" class="px-4 py-3.5 text-sm text-dark-200">
              <slot :name="'cell-' + col.key" :row="row" :value="getRowValue(row, col.key)">
                {{ getRowValue(row, col.key) ?? '—' }}
              </slot>
            </td>
            <td v-if="$slots.actions_col" class="px-4 py-3.5 text-right">
              <div class="flex justify-end gap-1">
                <slot name="actions_col" :row="row" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-dark-800/40 border-t border-dark-700/30">
      <p v-if="totalElements > 0" class="text-xs text-dark-400">
        Showing {{ (page * size) + 1 }} to {{ Math.min((page + 1) * size, totalElements) }} of {{ totalElements }}
      </p>
      <p v-else class="text-xs text-dark-400">
        No records to show
      </p>
      <div class="flex items-center gap-1">
        <button
          class="btn-ghost btn-sm"
          :disabled="page === 0"
          @click="$emit('page-change', page - 1)"
        >
          Previous
        </button>
        <div class="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none no-scrollbar">
          <button
            v-for="p in displayedPages"
            :key="p"
            class="btn-sm min-w-[32px] h-8 rounded-lg text-xs"
            :class="p === page ? 'bg-primary-600 text-white' : 'btn-ghost'"
            @click="$emit('page-change', p)"
          >
            {{ p + 1 }}
          </button>
        </div>
        <button
          class="btn-ghost btn-sm"
          :disabled="page >= totalPages - 1"
          @click="$emit('page-change', page + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseSpinner from './BaseSpinner.vue'

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

const props = withDefaults(defineProps<{
  columns: Column[];
  data: any[];
  loading?: boolean;
  searchable?: boolean;
  searchQuery?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  page?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}>(), {
  columns: () => [],
  data: () => [],
  loading: false,
  searchable: false,
  searchQuery: '',
  page: 0,
  size: 10,
  totalElements: 0,
  totalPages: 0,
})

const emit = defineEmits<{
  (e: 'search', query: string): void;
  (e: 'sort', key: string): void;
  (e: 'page-change', page: number): void;
}>()

const displayedPages = computed(() => {
  const pages: number[] = []
  const maxPages = 5
  let start = Math.max(0, (props.page || 0) - Math.floor(maxPages / 2))
  let end = Math.min(props.totalPages || 0, start + maxPages)
  
  if (end - start < maxPages) {
    start = Math.max(0, end - maxPages)
  }
  
  for (let i = start; i < end; i++) pages.push(i)
  return pages
})

const onSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('search', target.value)
}

const getRowValue = (row: any, key: string) => {
  return row[key]
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
