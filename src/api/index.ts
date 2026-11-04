import type { LoginDto, RegisterDto } from "@/schema/auth";
import type { AuthResponse } from "./types";
import { makeRequest } from "./utils";

export const api = {
    register: (data: RegisterDto) => makeRequest<AuthResponse>({
        url: "/register",
        method: "POST",
        data,
    }),
    login: (data: LoginDto) => makeRequest<AuthResponse>({
        url: "/login",
        method: "POST",
        data,
    }),
}