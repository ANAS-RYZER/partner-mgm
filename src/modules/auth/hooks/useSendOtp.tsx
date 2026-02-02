import api from "@/lib/httpClient";
import { useMutation } from "@tanstack/react-query";

export default function useSendOtp() {
  return useMutation({
    mutationKey: ["send-otp"],
    mutationFn: async (data: { email: string }) => {
      const response = await api.post("/agents/send-otp", data);
      return response.data;
    },
  });
}
