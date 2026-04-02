import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useCustomers = (
  search: string = "",
  page: number = 1,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["customers", search, page, limit],
    queryFn: async () => {
      try {
        const res = await api.get(`/agent-dashboard/customers?search=${search}&page=${page}&limit=${limit}`);
        return res.data;
      } catch (error: any) {
        console.error("Error fetching customers:", error);
        throw new Error(error?.response?.data?.message || "Failed to fetch customers");
      }
    },
  });
};
