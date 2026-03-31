import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/agent-dashboard/me");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

