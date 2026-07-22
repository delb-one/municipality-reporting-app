import api from "./api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    return api.post("/api/auth/login", payload);
  },
};