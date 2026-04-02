
import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";


export const useGetCustomerAppointmentDetails = (customerId: string) => {
    return useQuery({
        queryKey: ["customerAppointments", customerId],
        queryFn: async () => {
            try {
                const res = await api.get(`/agent-dashboard/customer/${customerId}/appointments`);
                return res.data;
            }catch (error: any) {
                console.error("Error fetching customer appointments:", error);
                throw new Error(error?.response?.data?.message || "Failed to fetch customer appointments");
            }
        },
        enabled: !!customerId,
    });
}
