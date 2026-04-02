
import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";


export const useGetCustomerDetails = (customerId: string) => {
    return useQuery({
        queryKey: ["customerDetails", customerId],
        queryFn: async () => {  
            try {
                const res = await api.get(`/agent-dashboard/customer/${customerId}`);
                return res.data;
            }catch (error: any) {
                console.error("Error fetching customer details:", error);
                throw new Error(error?.response?.data?.message || "Failed to fetch customer details");
            }
        },
        enabled: !!customerId,
    });
}
