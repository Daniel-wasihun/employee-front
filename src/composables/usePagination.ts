import { ref, computed } from 'vue'
import type { PageResponse } from '@/types'

export function usePagination(fetchFn: () => Promise<any>, defaultSize = 10) {
  const page = ref(0)
  const size = ref(defaultSize)
  const totalElements = ref(0)
  const totalPages = ref(0)
  const isLast = ref(true)
  const loading = ref(false)

  const hasNext = computed(() => !isLast.value)
  const hasPrev = computed(() => page.value > 0)

  function updateFromResponse(response: PageResponse<any>) {
    page.value = response.page
    size.value = response.size
    totalElements.value = response.totalElements
    totalPages.value = response.totalPages
    isLast.value = response.last
  }

  async function goToPage(pageNum: number) {
    page.value = pageNum
    loading.value = true
    try {
      await fetchFn()
    } finally {
      loading.value = false
    }
  }

  async function nextPage() {
    if (hasNext.value) await goToPage(page.value + 1)
  }

  async function prevPage() {
    if (hasPrev.value) await goToPage(page.value - 1)
  }

  return {
    page,
    size,
    totalElements,
    totalPages,
    isLast,
    loading,
    hasNext,
    hasPrev,
    updateFromResponse,
    goToPage,
    nextPage,
    prevPage,
  }
}
