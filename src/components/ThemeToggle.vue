<template>
  <div class="flex items-center gap-3">
    <InputSwitch
      v-model="checked"
      @change="onToggle"
      aria-label="Alternar tema claro/escuro"
      class="align-middle"
    />
    <i :class="iconClass" aria-hidden="true"></i>
    <span class="ml-2 text-sm">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import InputSwitch from "primevue/inputswitch";
import { toggleTheme, getSavedTheme } from "../theme-manager";

const initial =
  getSavedTheme() ??
  (window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

const checked = ref(initial === "dark");

const onToggle = async () => {
  await toggleTheme();

  const mode =
    getSavedTheme() ??
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  checked.value = mode === "dark";
};

const iconClass = computed(() =>
  checked.value ? "pi pi-sun text-yellow-400" : "pi pi-moon text-gray-300"
);
const label = computed(() => (checked.value ? "Modo claro" : "Modo escuro"));
</script>

<style scoped></style>
