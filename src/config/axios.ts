import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

export interface ApiError {
  message: string;
  status?: number | null;
  data?: any;
}

const api: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers = config.headers ?? {};
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
    } catch {
      console.log("Error retrieving auth token :>> ");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data ?? response,
  (error: AxiosError) => {
    const normalized: ApiError = {
      message: error.message || "Erro na requisição",
      status: error.response?.status ?? null,
      data: error.response?.data ?? null,
    };
    return Promise.reject(normalized);
  }
);

export default api;
