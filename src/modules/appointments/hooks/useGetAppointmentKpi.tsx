import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useGetAppointmentKpi = () => {
    return useQuery({
        queryKey: ["appointmentKpi"],
        queryFn: async () => {
            const res = await api.get("/dashboard/counts");
            return res.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}