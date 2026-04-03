"use client";

import { Button } from "@/components/ui/button";
import { LogOut, Copy, Check, Menu } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "@/modules/auth/state/useAuthState";
import { useRouter } from "next/navigation";
import useGetMe from "@/modules/auth/hooks/useGetMe";
import { toast } from "sonner";

type HeaderProps = {
  menuOpen?: boolean;
  onMenuClick?: () => void;
};

function agentDisplayName(me: unknown): string {
  if (!me || typeof me !== "object") return "Partner";
  const root = me as Record<string, unknown>;
  const agent = root.agent;
  if (agent && typeof agent === "object") {
    const a = agent as Record<string, unknown>;
    if (typeof a.name === "string" && a.name.trim()) return a.name.trim();
    if (typeof a.fullName === "string" && a.fullName.trim()) return a.fullName.trim();
    const fn = typeof a.firstName === "string" ? a.firstName : "";
    const ln = typeof a.lastName === "string" ? a.lastName : "";
    const joined = `${fn} ${ln}`.trim();
    if (joined) return joined;
  }
  if (typeof root.name === "string" && root.name.trim()) return root.name.trim();
  return "Partner";
}

const Header = ({ menuOpen = false, onMenuClick }: HeaderProps) => {
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  const { data: me } = useGetMe();
  const [copied, setCopied] = useState(false);

  const referralCode = me?.agent?.agentId;
  const displayName = agentDisplayName(me);

  const handleCopy = async () => {
    if (!referralCode) return;

    await navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success("Referral code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    clearAuth();
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-30 flex min-h-20 w-full shrink-0 items-center justify-between bg-mgm px-4 py-2 text-white shadow-md sm:px-6 md:py-0">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        {onMenuClick ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 self-center text-white hover:bg-white/10 md:hidden"
            onClick={onMenuClick}
            aria-expanded={menuOpen}
            aria-controls="app-sidebar-nav"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        ) : null}

        <div className="min-w-0 md:hidden">
          <p className="truncate text-sm font-semibold leading-tight text-white">
            {displayName}
          </p>
          <div className="mt-0.5 flex min-w-0 items-center gap-1.5">
            <span className="min-w-0 truncate font-mono text-xs font-medium text-gold">
              {referralCode ?? "—"}
            </span>
            {referralCode ? (
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 rounded p-1 transition hover:bg-white/10"
                aria-label="Copy referral code"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            ) : null}
          </div>
        </div>

        <h1 className="hidden truncate text-lg font-semibold text1-gold md:block">
          Partner Dashboard
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2 md:gap-5">
        <div className="hidden text-right md:block">
          <p className="text-sm text-white/60">Partner ID</p>
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm font-semibold">{referralCode ?? ""}</span>
            {referralCode ? (
              <button
                type="button"
                onClick={handleCopy}
                className="transition hover:text-yellow-300"
                aria-label="Copy referral code"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            ) : null}
          </div>
        </div>

        <Button
          className="bg-white/20 text-white hover:bg-white/30"
          onClick={handleLogout}
        >
          <LogOut className="mr-0 h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
