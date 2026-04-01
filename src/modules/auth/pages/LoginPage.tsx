"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "../ui/components/form/InputField";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkle,
  SparkleIcon,
  Sparkles,
} from "lucide-react";
import useLogin from "../hooks/useLogin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../state/useAuthState";
import useSendOtp from "../hooks/useSendOtp";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string("Please enter your password")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  
  const { mutate: login, isPending: isLoggingIn } = useLogin();
  const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    console.log("Login Data:", values);

    login(values, {
      onSuccess: (data) => {
        toast.success("Login successful!");
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("refreshToken", data.refreshToken);
        sessionStorage.setItem("sessionId", data.sessionId);
        setAuth({
          email: data.user.email,
          userId: data.user.userId,
          referralCode: data.user.referralCode,
        });

        if (data.isPasswordChanged === false && data.isNewUser === true) {
          sendOtp(
            { email: values.email },
            {
              onSuccess: () => {
                toast.success("OTP sent to your email for verification.");
                router.push("/auth/verification");
              },
            },
          );
        } else {
          router.push("/dashboard");
        }
      },
      onError: (error: any) => {
        console.error("Login Error:", error);
        toast.error(
          error?.response?.data?.message || "Login failed. Please try again.",
        );
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-screen justify-center bg-mgm text-white  ">
      <div className="bg-gold rounded-full p-3 mb-2">
        <Sparkle size={20} className="text1-gold fill-white" />
      </div>
      <h1 className="font-semibold text-3xl text1-gold mb-6">Partner Login</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg space-y-5 "
        >
          <InputField
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your login email"
            leftIcon={<Mail size={17} className="text-gold/60! mr-2" />}
          />
          <InputField
            control={form.control}
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            leftIcon={<Lock size={17} className="text-gold/60! mr-2" />}
            rightIcon={
              showPassword ? (
                <EyeOff
                  className="  h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="  h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          />
          <Button
            type="submit"
            className="w-full bg-gold h-10  font-medium"
            disabled={isLoggingIn || isSendingOtp}
          >
            {isLoggingIn || isSendingOtp ? "Logging in..." : "Login"}
          </Button>
          <hr className="bg-black/10 h-0.5" />
          <div>
            <h1 className="font-medium text-white">First Time Login?</h1>
            <p className="text-muted-foreground text-sm mt-2">
              {" "}
              Check your email for credentials sent by the admin. After login,
              you'll verify with OTP and reset your password.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
