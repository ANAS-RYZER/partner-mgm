import { email } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
  userId: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  email?: string | null;
  referralCode?: string | null;
  setAuth: (data: { userId: string; email?: string | null; referralCode?: string | null }) => void;

  clearAuth: () => void;
  setHasHydrated: (hydrated: boolean) => void;
};
  
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      userId: null,
      isAuthenticated: false,
      hasHydrated: false,
      referralCode: null,
      

      setAuth: ({ email, userId , referralCode }) =>
        set({
          email,
          userId,
          isAuthenticated: true,
          referralCode,
          
        }),
       
      clearAuth: () =>
        set({
          email: null,
          userId: null,
          referralCode: null,
          isAuthenticated: false,
        }),

      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
