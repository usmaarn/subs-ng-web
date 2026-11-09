import type { AxiosError } from "axios";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export { cn } from "cn";

export function populateFormErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  error: AxiosError<any>,
) {
  const detail = error.response?.data?.detail;

  if (Array.isArray(detail)) {
    detail.forEach((d: any) => {
      form.setError(d.loc.slice(1).join("."), {
        type: d.type,
        message: d.msg,
      });
    });
  }
}
