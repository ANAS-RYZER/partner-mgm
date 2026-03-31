"use client";

import { Button } from "@/components/ui/button";
import { LogOut, Copy, Check } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "@/modules/auth/state/useAuthState";
import { useRouter } from "next/navigation";
import useGetMe from "@/modules/auth/hooks/useGetMe";

const Header = () => {
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  const { data: me, isFetching: isMeFetching } = useGetMe();
  const [copied, setCopied] = useState(false);

  const referralCode = me?.agentId;

  console.log("Referral Code in Header:", referralCode);

  const handleCopy = async () => {
    if (!referralCode) return;

    await navigator.clipboard.writeText(referralCode);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    clearAuth();
    router.push("/auth/login");
  };

  return (
    <div className="w-full h-20 bg-mgm text-white flex items-center px-6 shadow-md justify-between">
      <h1 className="text-lg font-semibold text1-gold">Partner Dashboard</h1>

      <div className="flex items-center gap-5">
        <div>
          <p>Partner ID</p>

          <div className="flex items-center gap-2">
            <h1 className="font-semibold">{referralCode ?? "—"}</h1>

            {referralCode && (
              <button
                onClick={handleCopy}
                className="hover:text-yellow-300 transition"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        <Button className="bg-white/20 text-white" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
