<template>
  <section class="max-w-5xl mx-auto">
    <header class="mb-4 pb-3 border-b border-gray-800">
      <h2 class="text-xl font-semibold">{{ displayName }}</h2>
    </header>

    <div>
      <template v-if="submenu === 'privacidade'">
        <ul class="space-y-3">
          <li
            class="flex items-center justify-between bg-gray-800 p-4 rounded-md hover:bg-gray-700"
          >
            <div class="flex items-start gap-3">
              <i class="pi pi-lock text-lg text-gray-300 mt-1"></i>
              <div>
                <div class="font-medium">Perfil privado</div>
                <div class="text-sm text-gray-400">
                  Somente pessoas que você aprovar podem ver suas postagens
                </div>
              </div>
            </div>

            <div>
              <InputSwitch v-model="toggles.privateProfile" />
            </div>
          </li>

          <li
            class="flex items-center justify-between bg-gray-800 p-4 rounded-md hover:bg-gray-700"
          >
            <div class="flex items-start gap-3">
              <i class="pi pi-user-edit text-lg text-gray-300 mt-1"></i>
              <div>
                <div class="font-medium">Marcações e menções</div>
                <div class="text-sm text-gray-400">
                  Controle quem pode marcar e mencionar você
                </div>
              </div>
            </div>
            <i class="pi pi-chevron-right text-gray-400"></i>
          </li>

          <li
            class="flex items-center justify-between bg-gray-800 p-4 rounded-md hover:bg-gray-700"
          >
            <div class="flex items-start gap-3">
              <i class="pi pi-eye text-lg text-gray-300 mt-1"></i>
              <div>
                <div class="font-medium">Status online</div>
                <div class="text-sm text-gray-400">
                  Quem pode ver quando você está ativo
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 text-gray-400">
              <span class="text-sm">Ninguém</span>
              <i class="pi pi-chevron-right"></i>
            </div>
          </li>

          <li class="h-px bg-gray-800 my-4"></li>

          <li class="text-gray-400 text-sm">
            Outras configurações de privacidade
          </li>

          <li
            class="flex items-center justify-between bg-gray-800 p-4 rounded-md hover:bg-gray-700"
          >
            <div class="flex items-start gap-3">
              <i class="pi pi-eye-slash text-lg text-gray-300 mt-1"></i>
              <div>
                <div class="font-medium">
                  Ocultar número de curtidas e compartilhamentos
                </div>
                <div class="text-sm text-gray-400">
                  Algumas configurações podem ser gerenciadas em outra seção.
                </div>
              </div>
            </div>
            <i class="pi pi-external-link text-gray-400"></i>
          </li>
        </ul>
      </template>

      <template v-else-if="submenu === 'conta'">
        <div class="space-y-4">
          <div class="bg-gray-800 p-4 rounded-md">
            <div class="font-medium">Email</div>
            <div class="text-sm text-gray-400">seu-email@exemplo.com</div>
          </div>

          <div class="bg-gray-800 p-4 rounded-md">
            <div class="font-medium">Senha</div>
            <div class="text-sm text-gray-400">
              Gerencie sua senha e métodos de autenticação
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="bg-gray-800 p-4 rounded-md text-gray-300">
          <p class="mb-2">
            Subpágina:
            <strong class="text-white">{{ submenu || "Geral" }}</strong>
          </p>
          <p class="text-sm text-gray-400">
            Implemente o conteúdo desta subpágina conforme necessário.
          </p>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";

interface Props {
  submenu?: string;
}

const props = defineProps<Props>();
const submenu = props.submenu ?? "";

const displayName = computed(() => {
  if (!submenu) return "Geral";
  const map: Record<string, string> = {
    privacidade: "Privacidade",
    conta: "Conta",
    ajuda: "Ajuda",
  };
  return map[submenu] ?? submenu;
});

const toggles = reactive({
  privateProfile: false,
});
</script>
