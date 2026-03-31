import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await api.get("/dashboard/agent");
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
