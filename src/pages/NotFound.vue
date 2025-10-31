<template>
  <section class="text-center py-20">
    <h1 class="text-4xl font-bold mb-2">404</h1>
    <p class="mb-6">Página não encontrada.</p>
    <router-link to="/" class="text-blue-600 dark:text-blue-400 hover:underline"
      >Voltar para Home</router-link
    >
  </section>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
