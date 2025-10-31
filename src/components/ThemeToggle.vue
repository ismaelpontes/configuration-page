<template>
  <button @click="onToggle" class="p-button p-button-text">
    <i :class="iconClass" aria-hidden="true"></i>
    <span class="ml-2">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toggleTheme, getSavedTheme } from "../theme-manager";

const mode = ref(
  getSavedTheme() ??
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
);

async function onToggle() {
  await toggleTheme();
  mode.value = mode.value === "dark" ? "light" : "dark";
}

const iconClass = () => (mode.value === "dark" ? "pi pi-sun" : "pi pi-moon");
const label = () => (mode.value === "dark" ? "Light" : "Dark");
</script>
