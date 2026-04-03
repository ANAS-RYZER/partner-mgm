import { useQuery } from "@tanstack/react-query";

import api from "@/lib/httpClient";
export const useGetCommissionsList = (search: string = "", page: number = 1, limit: number = 10) => {
    return useQuery({
        queryKey: ["commissions-list", search, page, limit],
        queryFn: async () => {
            try {
                const res = await api.get(`/agent-dashboard/commissionlist?search=${search}&page=${page}&limit=${limit}`);
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

