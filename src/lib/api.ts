import { apiClient, getApiErrorMessage } from "@/api/client";

export { getApiErrorMessage };

export async function sendPasswordResetOtp(data: { email: string }) {
  const response = await apiClient.post<{ message: string }>(
    "/auth/forgot-password",
    data,
  );
  return response.data;
}

export async function resetPassword(data: {
  email: string;
  code: string;
  password: string;
}) {
  const response = await apiClient.post<{ message: string }>(
    "/auth/reset-password",
    data,
  );
  return response.data;
}
