import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useCustomerOrder = (customerId: string) => {
    return useQuery({
        queryKey: ["customer-order", customerId],
        queryFn: async () => {
            try {
                const res = await api.get(
                    `/agent-dashboard/customer/${customerId}/orders`
                );
                return res.data;
            } catch (error: any) {
                console.error("Error fetching customer orders:", error);
                throw new Error(
                    error?.response?.data?.message ||
                    "Failed to fetch customer orders"
                );
            }
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: !!customerId,
    });
};