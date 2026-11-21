import { api } from "#/lib/api";
import { toast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import axios, { type Method } from "axios";
import { useState } from "react";

type UseRequestOptions = {
  method?: Method;
  onError?: (errs: Record<string, string>) => void;
  onSuccess?: (data: any) => void;
};

export function useRequest<TData = any>(url: string, opt?: UseRequestOptions) {
  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const {
    mutate: submit,
    mutateAsync: submitAsync,
    ...request
  } = useMutation({
    mutationFn: (data: any) =>
      api.request<TData>({
        url,
        method: opt?.method ?? "POST",
        data,
      }),
    onSuccess(response) {
      setErrors(null);
      opt?.onSuccess?.(response.data);
      return response.data;
    },
    onError(error) {
      let errs: Record<string, string>;
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as
          | { message?: string; errors?: Record<string, string> }
          | undefined;
        errs = {
          message: data?.message ?? error.message,
          ...(data?.errors ?? {}),
        };
      } else {
        errs = { message: error.message };
      }

      toast.danger(errs.message);
      setErrors(errs);
      opt?.onError?.(errs);
    },
  });

  const clearErrors = () => setErrors(null);

  return { errors, clearErrors, submit, submitAsync, ...request };
}
