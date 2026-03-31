
import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";


export const useGetCustomerAppointmentDetails = (customerId: string) => {
    return useQuery({
        queryKey: ["customerAppointments", customerId],
        queryFn: async () => {
            const res = await api.get(`/agent-dashboard/user/${customerId}/appointments`);
            console.log("customer appointments response", res);
            return res.data;
        },
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
        enabled: !!customerId, // only run if customerId is available
    });
}
