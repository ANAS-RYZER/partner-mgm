"use client";
import { useAuthStore } from "@/modules/auth/state/useAuthState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useAuthStore();

  const hasRefreshToken =
    typeof window !== "undefined" &&
    !!sessionStorage.getItem("refreshToken");

  useEffect(() => {
    if (!hasHydrated) return;

    // Don't immediately redirect while we still have a refresh token.
    // An API call (ex: /me) will trigger the interceptor to refresh access.
    if (!isAuthenticated && !hasRefreshToken) {
      router.replace("/auth/login");
    }
  }, [hasHydrated, isAuthenticated, hasRefreshToken, router]);
  if (!hasHydrated) return null;
  if (!isAuthenticated && !hasRefreshToken) return null;
  return <>{children}</>;
}
