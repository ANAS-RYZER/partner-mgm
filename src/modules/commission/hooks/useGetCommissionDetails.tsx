import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useGetCommissionDetails = (orderId: string, page: number = 1, limit: number = 10, search: string = "") => {
    return useQuery({
        queryKey: ["commission-details", orderId, page, limit, search],
        queryFn: async () => {
            try {
                const res = await api.get(`/agent-dashboard/agentcommission/${orderId}?search=${search}&page=${page}&limit=${limit}`);
                return res.data;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error("An unknown error occurred");
            }
        }
    });
};