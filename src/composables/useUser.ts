import { computed, unref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getUser } from "../services/users";
import type { UserDTO } from "../types/user.dto";

export const useUser = (
  userId: number | string | import("vue").Ref<number | string>,
  options?: { enabled?: boolean }
) => {
  const queryKey = computed(() => {
    const id = unref(userId);
    return ["user", id !== undefined && id !== null ? String(id) : ""];
  });

  const enabled =
    options?.enabled === false
      ? false
      : computed(() => {
          const id = unref(userId);
          return id !== undefined && id !== null && String(id).trim() !== "";
        });

  const query = useQuery<UserDTO, Error>({
    queryKey,
    queryFn: async () => {
      const id = String(unref(userId) || "1");
      const res = await getUser(id);
      if (res === undefined || res === null) {
        throw new Error("Nenhum dado retornado pelo serviço de usuário");
      }
      return res as UserDTO;
    },
    enabled: enabled as any,
    staleTime: 1000 * 60 * 2,
    retry: 1,
    placeholderData: (previousData) => previousData,
  });

  return query;
};
