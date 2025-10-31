<template>
  <section class="max-w-5xl mx-auto px-4">
    <header class="mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {{ displayName }}
      </h2>
    </header>

    <div>
      <template v-if="submenu === 'privacidade'">
        <ul class="space-y-3">
          <li
            class="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <div class="flex items-start gap-3">
              <i
                class="pi pi-lock text-lg text-gray-600 dark:text-gray-300 mt-1"
              ></i>
              <div>
                <div class="font-medium text-gray-900 dark:text-gray-100">
                  Perfil privado
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Somente pessoas que você aprovar podem ver suas postagens
                </div>
              </div>
            </div>

            <div>
              <InputSwitch v-model="toggles.privateProfile" />
            </div>
          </li>

          <li
            class="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <div class="flex items-start gap-3">
              <i
                class="pi pi-user-edit text-lg text-gray-600 dark:text-gray-300 mt-1"
              ></i>
              <div>
                <div class="font-medium text-gray-900 dark:text-gray-100">
                  Marcações e menções
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Controle quem pode marcar e mencionar você
                </div>
              </div>
            </div>
            <i class="pi pi-chevron-right text-gray-500 dark:text-gray-400"></i>
          </li>

          <li
            class="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <div class="flex items-start gap-3">
              <i
                class="pi pi-eye text-lg text-gray-600 dark:text-gray-300 mt-1"
              ></i>
              <div>
                <div class="font-medium text-gray-900 dark:text-gray-100">
                  Status online
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Quem pode ver quando você está ativo
                </div>
              </div>
            </div>
            <div
              class="flex items-center gap-3 text-gray-700 dark:text-gray-400"
            >
              <span class="text-sm">Ninguém</span>
              <i class="pi pi-chevron-right"></i>
            </div>
          </li>

          <li class="h-px bg-gray-200 dark:bg-gray-700 my-4"></li>

          <li class="text-gray-600 dark:text-gray-400 text-sm">
            Outras configurações de privacidade
          </li>

          <li
            class="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <div class="flex items-start gap-3">
              <i
                class="pi pi-eye-slash text-lg text-gray-600 dark:text-gray-300 mt-1"
              ></i>
              <div>
                <div class="font-medium text-gray-900 dark:text-gray-100">
                  Ocultar número de curtidas e compartilhamentos
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Algumas configurações podem ser gerenciadas em outra seção.
                </div>
              </div>
            </div>
            <i class="pi pi-external-link text-gray-500 dark:text-gray-400"></i>
          </li>
        </ul>
      </template>

      <template v-else-if="submenu === 'conta'">
        <div class="space-y-4">
          <div
            class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700"
          >
            <div class="font-medium text-gray-900 dark:text-gray-100">
              Email
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              seu-email@exemplo.com
            </div>
          </div>

          <div
            class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700"
          >
            <div class="font-medium text-gray-900 dark:text-gray-100">
              Senha
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Gerencie sua senha e métodos de autenticação
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="submenu === 'ajuda'">
        <div class="space-y-4">
          <div
            class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700"
          >
            <div class="font-medium text-gray-900 dark:text-gray-100">
              Central de Ajuda
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Encontre respostas para suas perguntas frequentes
            </div>
          </div>

          <div
            class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700"
          >
            <div class="font-medium text-gray-900 dark:text-gray-100">
              Contatar Suporte
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Fale com nossa equipe de suporte para obter ajuda personalizada
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div
          class="bg-gray-100 dark:bg-gray-800 p-6 rounded-md text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-start gap-4">
            <i
              class="pi pi-exclamation-triangle text-2xl text-yellow-500 mt-1"
            ></i>
            <div class="flex-1">
              <h3
                class="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-50"
              >
                Página não encontrada
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                A página "<span
                  class="font-medium text-gray-800 dark:text-gray-100"
                  >{{ submenu || "Geral" }}</span
                >" não existe. Você pode escolher uma das páginas abaixo ou
                pesquisar por um nome.
              </p>

              <div class="mb-4">
                <div class="flex flex-wrap gap-2">
                  <router-link
                    v-for="s in availableSubmenus"
                    :key="s.key"
                    :to="`/settings/${s.key}`"
                    class="inline-block bg-gray-800 text-gray-200 dark:bg-white dark:text-gray-800 px-3 py-2 rounded-md hover:bg-gray-700"
                  >
                    <i
                      :class="
                        s.icon + ' text-lg text-gray-600 dark:text-gray-300'
                      "
                    ></i>
                    <span>{{ s.label }}</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
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

const availableSubmenus = [
  { key: "privacidade", label: "Privacidade", icon: "pi pi-lock" },
  { key: "conta", label: "Conta", icon: "pi pi-user" },
  { key: "ajuda", label: "Ajuda", icon: "pi pi-question-circle" },
];
</script>
