import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await api.get("/agent-dashboard/customers");
      console.log("customers response", res);
      return res.data;
    },
  });
};
