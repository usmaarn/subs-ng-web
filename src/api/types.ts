import type { User } from "@/stores/auth";

export type ApiResponse<T = any> = {
  message: string;
  data: T;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export class ApiError extends Error {
  constructor(
    public message: string,
    public detail?: Record<string, string>,
  ) {
    super(message);
  }
}
