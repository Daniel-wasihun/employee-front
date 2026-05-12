<template>
  <div class="flex h-screen bg-dark-900 text-dark-100 overflow-hidden">
    <!-- Sidebar -->
    <AppSidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden relative">
      <AppHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
      
      <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
        <div class="max-w-7xl mx-auto space-y-6">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
      
      <!-- Subtle background elements -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary-600/5 blur-[120px] -z-10 rounded-full" />
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/5 blur-[120px] -z-10 rounded-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

const isSidebarOpen = ref(false)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #2d2d2d;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #3d3d3d;
}
</style>
