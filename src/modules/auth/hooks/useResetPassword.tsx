import api from "@/lib/httpClient";
import { useMutation } from "@tanstack/react-query";

export default function useResetPassword() {
  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async ({
      
      newPassword,
      currentPassword,
      userId,
    }: {
      
      newPassword: string;
      currentPassword: string;
      userId: string;
    }) => {
      const response = await api.put(`/agents/${userId}/reset-password`, {
       
        newPassword,
        currentPassword,
      });
      return response.data;
    },
  });
}
