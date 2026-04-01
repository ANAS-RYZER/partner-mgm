import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAppointments(
  search: string = "",
  status?: string,
  page: number = 1,
  limit: number = 10
) {
  return useQuery({
    queryKey: ["appointments", search, status, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (status) params.set("status", status);
      params.set("page", String(page));
      params.set("limit", String(limit));
      const query = params.toString();
      const res = await api.get(`/dashboard/agent${query ? `?${query}` : ""}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
