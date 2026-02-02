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

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [hasHydrated, isAuthenticated, router]);
  if (!hasHydrated) return null;
  if (!isAuthenticated) return null;
  return <>{children}</>;
}
