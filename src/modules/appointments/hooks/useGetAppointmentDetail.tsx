import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export const useGetAppointmentDetail = (appointmentId: string) => {
    return useQuery({
        queryKey: ["appointmentDetail", appointmentId],
        queryFn: async () => {
            const res = await api.get(`/dashboard/agentappointmentdetails/${appointmentId}`);
            return res.data;
        },
        staleTime: 5 * 60 * 1000,
    });
}