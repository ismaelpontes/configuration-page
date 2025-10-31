<!-- <template>
  <div
    class="p-4 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors"
  >
    <header class="flex justify-between items-center mb-6 p-4 rounded-lg">
      <h1 class="text-2xl font-semibold">
        Demo PrimeVue + PrimeUIX + Tailwind (Dark/Light)
      </h1>
      <ThemeToggle />
    </header>

    <main class="p-6 rounded-lg">
      <p>Exemplo de um botão PrimeVue:</p>
      <Button label="Prime Button" class="mt-4" />
    </main>
  </div>
</template>

<script lang="ts">
import ThemeToggle from "./components/ThemeToggle.vue";
import Button from "primevue/button";

export default {
  name: "App",
  components: {
    ThemeToggle,
    Button,
  },
};
</script> -->
<template>
  <div id="app" class="min-h-screen bg-gray-900 text-gray-100">
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
