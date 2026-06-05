import { apiClient } from "./client";

export interface LoginRequest { email: string; password: string; }
export interface RegisterRequest { name: string; email: string; password: string; }
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: { id: string; name: string; email: string; };
}

export const authApi = {
  login: (data: LoginRequest) => apiClient.post<AuthResponse>("/api/auth/login", data),
  register: (data: RegisterRequest) => apiClient.post<AuthResponse>("/api/auth/register", data),
  logout: () => apiClient.post("/api/auth/logout"),
  me: () => apiClient.get("/api/auth/me"),
};
