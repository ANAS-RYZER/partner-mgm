import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export const useGetAppointmentDetail = (appointmentId: string) => {
    return useQuery({
        queryKey: ["appointmentDetail", appointmentId],
        queryFn: async () => {
            try {
                const res = await api.get(`/dashboard/agentappointmentdetails/${appointmentId}`);
                return res.data;
            }catch (error: any) {
                console.error("Error fetching appointment detail:", error);
                throw new Error(error?.response?.data?.message || "Failed to fetch appointment detail");
            }
        },
    });
}