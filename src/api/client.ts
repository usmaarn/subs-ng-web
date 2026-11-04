import { useAuthStore } from "@/stores/auth";
import axios from "axios";

export const apiClient = axios.create({ baseURL: "/api" });

// Track whether a refresh is already in progress to avoid parallel refresh calls
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().session?.accessToken ?? null;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Queue the request until the refresh completes
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axios.post("/auth/refresh", {
                    refreshToken: localStorage.getItem("refresh_token"),
                });

                const newToken = data.access_token;
                localStorage.setItem("access_token", newToken);
                apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

                processQueue(null, newToken);
                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                // Redirect to login or emit an event
                localStorage.removeItem("access_token");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);


export function getApiErrorMessage(error: any, fallback = "an unknown error occured"): string {
    if (axios.isAxiosError(error)) {
        return error.response?.data.message ?? error.message ?? fallback
    }
    return error.message ?? fallback
}