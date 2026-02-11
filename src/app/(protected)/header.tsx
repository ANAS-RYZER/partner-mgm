'use client'

import { Button } from "@/components/ui/button";
import { LogOut, Copy, Check } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "@/modules/auth/state/useAuthState";

const Header = () => {
  const referralCode = useAuthStore((s) => s.referralCode);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!referralCode) return;

    await navigator.clipboard.writeText(referralCode);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-20 bg-mgm text-white flex items-center px-6 shadow-md justify-between">
      <h1 className="text-lg font-semibold text1-gold">
        Agent Dashboard
      </h1>

      <div className="flex items-center gap-5">
        <div>
          <p>Partner Referral ID</p>

          <div className="flex items-center gap-2">
            <h1 className="font-semibold">
              {referralCode ?? "—"}
            </h1>

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

        <Button className="bg-white/20 text-white">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
