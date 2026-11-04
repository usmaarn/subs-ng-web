import type { User } from "@/stores/auth";

export type ApiResponse<T = any> = {
    message: string;
    data: T;
}

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    user: User;
}


export class ApiError extends Error {
    constructor(
        public message: string,
        public details?: Record<string, string>
    ) {
        super(message);
    }
}