import api from "../config/axios";
import type { UserDTO } from "../types/user.dto";

export const getUser = async (userId: number | string): Promise<UserDTO> => {
  const response = await api.get<UserDTO>(`/users/${userId}`);

  return response as unknown as UserDTO;
};

export default {
  getUser,
};
