<template>
  <section class="max-w-5xl mx-auto px-4">
    <header class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Perfil do Usuário
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Busca de perfil de usuário usando Axios + TanStack Query para consumir a
        API pública JSONPlaceholder
      </p>
    </header>

    <div class="flex flex-col md:flex-row gap-6">
      <div class="w-full md:w-72">
        <div class="mb-3">
          <label class="text-sm block mb-1 text-gray-700 dark:text-gray-300">
            ID do usuário
          </label>
          <input
            v-model.number="localId"
            type="number"
            min="1"
            max="10"
            class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div class="flex flex-col sm:flex-row gap-2">
          <Button
            label="Buscar"
            severity="contrast"
            icon="pi pi-search"
            class="w-full sm:w-auto"
            @click="fetchNow"
          />
          <Button
            label="Refetch"
            severity="contrast"
            icon="pi pi-refresh"
            class="p-button-plain w-full sm:w-auto"
            @click="fetchNow"
          />
        </div>

        <div
          v-if="isFetching"
          class="mt-3 text-sm text-gray-600 dark:text-gray-400"
        >
          Buscando...
        </div>
      </div>

      <div class="flex-1">
        <div
          v-if="isLoading"
          class="p-6 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
        >
          <div class="animate-pulse space-y-3">
            <div class="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        <div
          v-else-if="isError"
          class="p-6 bg-red-50 dark:bg-red-900/10 rounded-md border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300"
        >
          <div class="font-medium">Erro ao carregar usuário</div>
          <div class="text-sm">{{ error?.message }}</div>
        </div>

        <div
          v-else-if="!dataToShow"
          class="p-6 bg-yellow-50 dark:bg-yellow-900/10 rounded-md border border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300"
        >
          Nenhum dado carregado. Clique em Buscar para carregar o perfil.
        </div>

        <div
          v-else
          class="p-6 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center gap-4">
            <Avatar
              :image="avatarUrl ?? undefined"
              size="xlarge"
              shape="circle"
              class="shadow"
            />
            <div>
              <div
                class="text-xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ dataToShow.name }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                @{{ dataToShow.username }}
              </div>
            </div>
            <div class="ml-auto text-sm text-gray-600 dark:text-gray-400">
              ID: {{ dataToShow.id }}
            </div>
          </div>

          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              class="bg-white dark:bg-gray-900 p-4 rounded border border-gray-100 dark:border-gray-700"
            >
              <div class="text-xs text-gray-500 dark:text-gray-400">Email</div>
              <div class="font-medium text-gray-900 dark:text-gray-100">
                {{ dataToShow.email }}
              </div>
            </div>

            <div
              class="bg-white dark:bg-gray-900 p-4 rounded border border-gray-100 dark:border-gray-700"
            >
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Telefone
              </div>
              <div class="font-medium text-gray-900 dark:text-gray-100">
                {{ dataToShow.phone || "-" }}
              </div>
            </div>

            <div
              class="bg-white dark:bg-gray-900 p-4 rounded border border-gray-100 dark:border-gray-700"
            >
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Website
              </div>
              <div class="font-medium text-gray-900 dark:text-gray-100">
                <a
                  v-if="dataToShow.website"
                  :href="`http://${dataToShow.website}`"
                  target="_blank"
                  class="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >{{ dataToShow.website }}</a
                >
                <span v-else>-</span>
              </div>
            </div>

            <div
              class="bg-white dark:bg-gray-900 p-4 rounded border border-gray-100 dark:border-gray-700"
            >
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Empresa
              </div>
              <div class="font-medium text-gray-900 dark:text-gray-100">
                {{ dataToShow.company?.name || "-" }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ dataToShow.company?.catchPhrase || "" }}
              </div>
            </div>

            <div
              class="md:col-span-2 bg-white dark:bg-gray-900 p-4 rounded border border-gray-100 dark:border-gray-700"
            >
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Endereço
              </div>
              <div class="font-medium text-gray-900 dark:text-gray-100">
                {{ dataToShow.address?.street }},
                {{ dataToShow.address?.suite }},
                {{ dataToShow.address?.city }} -
                {{ dataToShow.address?.zipcode }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue";
import { useUser } from "../composables/useUser";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import { useQueryClient } from "@tanstack/vue-query";
import { getUser } from "../services/users";
import type { UserDTO } from "../types/user.dto";

const props = defineProps<{ id?: string }>();
const localId = ref<number>(props.id ? Number(props.id) : 1);

const { data, error, isLoading, isError, isFetching } = useUser(localId, {
  enabled: false,
});

const qc = useQueryClient();

const fetchedData = ref<UserDTO | null>(null);

const avatarUrl = ref<string | null>(null);

const dataToShow = computed<UserDTO | null>(() => {
  return fetchedData.value ?? (data as unknown as UserDTO | null) ?? null;
});

const fetchNow = async () => {
  try {
    const key = ["user", String(localId.value)];
    const result = (await qc.fetchQuery({
      queryKey: key,
      queryFn: () => getUser(String(localId.value)),
    })) as UserDTO;
    fetchedData.value = result;
    const idx = ((Number(result.id) - 1) % 70) + 1;
    avatarUrl.value = `https://i.pravatar.cc/150?img=${idx}`;
  } catch (e) {
    console.error("Erro ao buscar usuário:", e);
    fetchedData.value = null;
    avatarUrl.value = null;
  }
};
</script>

<style scoped></style>
