import api from "@/lib/httpClient";
import { useMutation } from "@tanstack/react-query";

export default function useVerifyOtp() {
  return useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: async (data: { email: string; otp: string }) => {
      const response = await api.post("/agents/verify-otp", data);
      return response.data;
    },
  });
}
