import { api } from "#/lib/api";
import type { DashboardStats } from "#/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useDashboardStats(enabled = true) {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const { data } = await api.get<DashboardStats>("/dashboard/stats");
      return data;
    },
    // Requests are relative to `/api` and only valid in the browser.
    enabled: enabled && typeof window !== "undefined",
    staleTime: 30_000,
  });
}
