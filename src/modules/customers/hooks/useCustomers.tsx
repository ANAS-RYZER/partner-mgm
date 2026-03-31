import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await api.get("/agent-dashboard/customers");
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, 
  });
};
