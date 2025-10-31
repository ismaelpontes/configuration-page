<template>
  <div
    class="h-screen flex bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
  >
    <aside
      v-show="!isMobile || mobileMenuVisible"
      :class="[
        'min-w-[260px] border-r border-gray-300 dark:border-gray-600',
        isMobile
          ? 'fixed inset-0 z-30 w-full p-4 overflow-auto bg-gray-200 dark:bg-gray-900'
          : 'bg-gray-200 dark:bg-gray-900',
      ]"
      aria-label="Menu de configurações"
    >
      <div class="flex flex-col justify-between h-full">
        <div class="p-4">
          <div
            class="mb-4 text-sm font-semibold flex items-center justify-between"
          >
            <span>Configurações</span>

            <div class="flex items-center gap-2">
              <Button
                v-if="isMobile"
                icon="pi pi-times"
                class="p-button-rounded p-button-text"
                @click="closeMobileMenu"
                severity="contrast"
                aria-label="Fechar menu"
              />
            </div>
          </div>

          <nav class="flex flex-col gap-2">
            <router-link
              to="/settings"
              class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-600 hover:text-gray-300"
              exact-active-class="bg-gray-600 text-gray-200 dark:bg-gray-800 dark:text-white"
              @click="onMenuSelect"
            >
              <i class="pi pi-th-large text-lg" aria-hidden="true"></i>
              <span class="text-sm">Visão geral</span>
            </router-link>

            <router-link
              to="/settings/privacidade"
              class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-600 hover:text-gray-300"
              active-class="bg-gray-600 text-gray-200 dark:bg-gray-800 dark:text-white"
              @click="onMenuSelect"
            >
              <i class="pi pi-lock text-lg" aria-hidden="true"></i>
              <span class="text-sm">Privacidade</span>
            </router-link>

            <router-link
              to="/settings/conta"
              class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-600 hover:text-gray-300"
              active-class="bg-gray-600 text-gray-200 dark:bg-gray-800 dark:text-white"
              @click="onMenuSelect"
            >
              <i class="pi pi-user text-lg" aria-hidden="true"></i>
              <span class="text-sm">Conta</span>
            </router-link>

            <router-link
              to="/settings/perfil"
              class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-600 hover:text-gray-300"
              active-class="bg-gray-600 text-gray-200 dark:bg-gray-800 dark:text-white"
              @click="onMenuSelect"
            >
              <i class="pi pi-id-card text-lg" aria-hidden="true"></i>
              <span class="text-sm">Perfil</span>
            </router-link>

            <router-link
              to="/settings/ajuda"
              class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-600 hover:text-gray-300"
              active-class="bg-gray-600 text-gray-200 dark:bg-gray-800 dark:text-white"
              @click="onMenuSelect"
            >
              <i class="pi pi-question-circle text-lg" aria-hidden="true"></i>
              <span class="text-sm">Ajuda</span>
            </router-link>
          </nav>
        </div>

        <div class="px-8 mb-4">
          <Button
            label="Sair"
            severity="contrast"
            class="w-full justify-start"
            aria-label="Sair"
            @click="openLogoutDialog"
            icon="pi pi-sign-out"
          />
        </div>
      </div>
    </aside>

    <div
      v-if="isMobile && mobileMenuVisible"
      class="fixed inset-0 bg-black/40 z-20 md:hidden"
      @click="closeMobileMenu"
    />

    <main class="flex-1 overflow-auto p-6">
      <div
        v-if="isMobile && !mobileMenuVisible"
        class="mb-4 flex items-center gap-3 justify-between"
      >
        <div class="flex items-center gap-3">
          <Button
            icon="pi pi-arrow-left"
            class="p-button-text"
            @click="goBackToSettings"
            severity="contrast"
            aria-label="Voltar"
          />
        </div>
      </div>

      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useDialog } from "primevue/usedialog";
import Button from "primevue/button";

import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const ConfirmLogoutAsync = defineAsyncComponent(
  () => import("../components/ConfirmLogout.vue")
);

const dialog = useDialog();

const openLogoutDialog = () => {
  dialog.open(ConfirmLogoutAsync, {
    header: "Confirmar logout",
    modal: true,
    style: { width: "320px" },
    onClose: (opt: any) => {
      const confirmed = opt?.data?.confirmed;
      if (confirmed) {
        console.log("Usuário confirmou logout");
      } else {
        console.log("Usuário cancelou logout");
      }
    },
  });
};

const route = useRoute();
const router = useRouter();

const isMobile = ref(false);

function updateIsMobile() {
  isMobile.value = window.matchMedia("(max-width: 767px)").matches;
}

const mobileMenuVisible = ref(true);

watch(
  () => route.path,
  (p) => {
    if (isMobile.value) {
      if (p === "/settings" || p === "/settings/") {
        mobileMenuVisible.value = true;
      } else {
        mobileMenuVisible.value = false;
      }
    } else {
      mobileMenuVisible.value = true;
    }
  },
  { immediate: true }
);

onMounted(() => {
  updateIsMobile();
  const mq = window.matchMedia("(max-width: 767px)");
  const listener = () => {
    updateIsMobile();
    if (!isMobile.value) {
      mobileMenuVisible.value = true;
    } else {
      mobileMenuVisible.value =
        route.path === "/settings" || route.path === "/settings/";
    }
  };
  mq.addEventListener?.("change", listener);
  (onBeforeUnmount as any)(() => mq.removeEventListener?.("change", listener));
});

function onMenuSelect() {
  if (isMobile.value) {
    setTimeout(() => {
      mobileMenuVisible.value = false;
    }, 80);
  }
}

function closeMobileMenu() {
  mobileMenuVisible.value = false;
}

function goBackToSettings() {
  router.push("/settings");
  if (isMobile.value) {
    mobileMenuVisible.value = true;
  }
}
</script>

<style scoped>
@media (max-width: 767px) {
  aside[aria-label="Menu de configurações"] {
    z-index: 30;
  }
}
</style>
