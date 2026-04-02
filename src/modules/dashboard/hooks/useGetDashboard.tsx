import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useGetDashboard = () => {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: async () => {
            try {
                const res = await api.get("/agent-dashboard/agent/dashboard");
                return res.data;
            } catch (error: any) {
                console.error("Error fetching dashboard:", error);
                throw new Error(error?.response?.data?.message || "Failed to fetch dashboard");
            }
        },
        staleTime : 5 * 60 * 1000,
    });
}