<template>
  <section class="max-w-5xl mx-auto">
    <h1 class="text-2xl font-semibold mb-2">Configurações</h1>
    <p class="text-sm text-gray-400 mb-4">
      Selecione um item no menu à esquerda para ver as opções.
    </p>

    <div class="flex gap-3">
      <router-link
        to="/settings/conta"
        class="inline-block bg-gray-800 text-gray-200 px-3 py-2 rounded-md hover:bg-gray-700"
      >
        Conta
      </router-link>

      <router-link
        to="/settings/privacidade"
        class="inline-block bg-gray-800 text-gray-200 px-3 py-2 rounded-md hover:bg-gray-700"
      >
        Privacidade
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
