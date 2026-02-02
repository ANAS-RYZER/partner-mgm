import api from "@/lib/httpClient";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await api.post("/agents/login", data);
      console.log("Login Response:", response);
      return response.data;
    },
  });
}
