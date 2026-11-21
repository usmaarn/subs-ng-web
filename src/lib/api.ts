import axios, { create } from "axios";
import { clearSession, getSession, setSession } from "@/server/session";

export const api = create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

export function apiErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        if (typeof message === "string" && message.trim()) {
            return message;
        }
        if (error.code === "ERR_NETWORK") {
            return "Cannot reach the server. Please check your connection and try again.";
        }
    }
    return "Something went wrong. Please try again.";
}

api.interceptors.request.use(async (req) => {
    const accessToken = (await getSession())?.accessToken;
    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req
})

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const session = await getSession();

            try {
                const { data } = await axios.post("/api/auth/refresh", {
                    refreshToken: session?.refreshToken,
                });

                const newAccessToken = data.accessToken;

                await setSession({
                    data: {
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken
                    }
                })

                api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                processQueue(null, newAccessToken);

                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                await clearSession();
                window.location.href = `/login?redirect_url=${encodeURIComponent(window.location.pathname)}`;
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
