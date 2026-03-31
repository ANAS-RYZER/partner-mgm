import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useCustomerKPI = () => {
  return useQuery({
    queryKey: ["customerKPI"],
    queryFn: async () => {
      const res = await api.get("/agent-dashboard/customer-count");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

};