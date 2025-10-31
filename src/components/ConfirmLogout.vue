<template>
  <div>
    <div class="text-base text-gray-900 dark:text-gray-100 mb-4">
      Tem certeza que deseja sair?
    </div>

    <div class="flex justify-end gap-2">
      <Button label="Cancelar" class="p-button-text" @click="close(false)" />
      <Button label="Confirmar" severity="danger" @click="close(true)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const dialogRef = inject("dialogRef") as
  | { value: { close: (payload?: any) => void } }
  | undefined;

const close = (confirmed: boolean) => {
  if (
    dialogRef &&
    dialogRef.value &&
    typeof dialogRef.value.close === "function"
  ) {
    dialogRef.value.close({ confirmed });
  } else {
    console.warn("dialogRef not available");
  }
};
</script>
