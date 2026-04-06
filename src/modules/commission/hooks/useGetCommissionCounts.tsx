import { useQuery } from "@tanstack/react-query"
import api from "@/lib/httpClient"

export const useGetCommissionCounts = () => {
    return useQuery({
        queryKey: ["commission-counts"],
        queryFn: async () => {
            try {
                const res = await api.get("/agent-dashboard/commissioncount")
                return res.data
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message)
                }
                throw new Error("An unknown error occurred")
            }
        }
    })
}