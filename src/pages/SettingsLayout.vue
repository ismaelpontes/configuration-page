<template>
  <div class="h-screen flex">
    <aside
      class="w-64 bg-gray-900 border-r border-gray-800 p-4 flex-shrink-0"
      aria-label="Menu de configurações"
    >
      <nav class="space-y-2">
        <router-link
          to="/settings/privacidade"
          class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
          active-class="bg-gray-800 text-white"
        >
          <i class="pi pi-lock text-lg"></i>
          <span class="text-sm">Privacidade</span>
        </router-link>

        <router-link
          to="/settings/conta"
          class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
          active-class="bg-gray-800 text-white"
        >
          <i class="pi pi-user text-lg"></i>
          <span class="text-sm">Conta</span>
        </router-link>

        <router-link
          to="/settings/ajuda"
          class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
          active-class="bg-gray-800 text-white"
        >
          <i class="pi pi-question-circle text-lg"></i>
          <span class="text-sm">Ajuda</span>
        </router-link>
      </nav>
    </aside>

    <main class="flex-1 overflow-auto p-6 bg-gray-900">
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
