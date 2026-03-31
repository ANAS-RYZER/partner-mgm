
import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";


export const useGetCustomerDetails = (customerId: string) => {
    return useQuery({
        queryKey: ["customerDetails", customerId],
        queryFn: async () => {
            const res = await api.get(`/agent-dashboard/user/${customerId}`);
            console.log("customer details response", res);
            return res.data;
        },
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
        enabled: !!customerId, // only run if customerId is available
    });
}
