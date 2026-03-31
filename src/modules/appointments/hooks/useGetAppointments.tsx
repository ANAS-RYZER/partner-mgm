import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAppointments(search: string = "") {
  return useQuery({
    queryKey: ["appointments", search],
    queryFn: async () => {
      const res = await api.get(`/dashboard/agent?search=${search}`);
      return res.data.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
