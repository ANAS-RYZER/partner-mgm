import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useCustomers = (search: string = "") => {
  return useQuery({
    queryKey: ["customers", search],
    queryFn: async () => {
      const res = await api.get(`/agent-dashboard/customers?search=${search}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, 
  });
};
