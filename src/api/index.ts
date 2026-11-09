import type { LoginDto, RegisterDto, VerifyEmailDto } from "@/schema/auth";
import type { User } from "@/stores/auth";
import { apiClient } from "./client";
import type { AuthResponse } from "./types";

export const api = {
  register: (data: RegisterDto) =>
    apiClient.post<AuthResponse>("/auth/register", data),
  login: (data: LoginDto) => apiClient.post<AuthResponse>("/auth/login", data),
  verifyEmail: (data: VerifyEmailDto) =>
    apiClient.post<User>("/auth/email/verify", data),
  sendEmailVerificationOtp: () =>
    apiClient.post<AuthResponse>("/auth/email/send-otp"),
  getUser: () => apiClient.get<User>("/users/me"),
};
