import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import useVerifyOtp from "../hooks/useVerifyOtp";
import { useAuthStore } from "../state/useAuthState";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const VerificationOtpPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const { email } = useAuthStore();
  console.log("Email from store:", email);
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();

  const handleSubmit = () => {
    if (otp.length !== 6) {
      alert("Enter 6-digit OTP");
      return;
    }

    verifyOtp(
      { email: email || "", otp },
      {
        onSuccess: (data) => {
          console.log("OTP verified successfully:", data);
          toast.success("OTP verified successfully!");
          router.push("/auth/reset");
        },
        onError: (error: any) => {
          console.error("Error verifying OTP:", error);
          toast.error(
            error?.response?.data?.message || "Failed to verify OTP.",
          );
        },
      },
    );

    console.log("Submitted OTP:", otp);
    // TODO: verify OTP → redirect to reset password page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mgm text-white w-screen px-6">
      <div className="max-w-md text-center flex flex-col gap-5 items-center">
        <h1 className="font-semibold text-3xl text1-gold mb-6">
          Verify Your Email
        </h1>

        <p className="text-white/70 text-sm leading-relaxed">
          We’ve sent a 6-digit verification code to your registered email. Enter
          it below to continue and reset your password.
        </p>

        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup className="flex justify-center gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className=" data-[active=true]:border-gold data-[active=true]:ring-gold data-[active=true]:ring-1  w-12 h-12 text-lg font-bold rounded-md border border-white/30 bg-white/10 focus-visible:ring-gold focus:ring-1 focus:border-gold text-white"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <Button
          onClick={handleSubmit}
          disabled={otp.length !== 6}
          className="w-[90%] bg-gold h-10  font-medium mt-2"
        >
          Verify & Continue
        </Button>

        <p className="text-xs text-white/50 mt-2">
          Didn’t receive the code? Check spam or request a resend.
        </p>
      </div>
    </div>
  );
};

export default VerificationOtpPage;
