import { AxiosError, type AxiosRequestConfig } from "axios";
import { apiClient } from "./client";
import { ApiError, type ApiResponse } from "./types";
import { toast } from "@/components/ui/toast";

export async function makeRequest<T = any>(options: AxiosRequestConfig) {
    try {
        const res = await apiClient.request({
            ...options,
            headers: {
                ...options.headers,
            }
        })
        return res.data as ApiResponse<T>
    } catch (err: any) {
        if (err instanceof AxiosError) {
            toast.add({ title: "Axios Error" })
        }

        throw new ApiError(
            err?.response?.data?.message ?? err.message,
            err?.response?.data?.details ?? {},
        )
    }
}