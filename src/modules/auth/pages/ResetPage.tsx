"use client";
import React, { useMemo, useState } from "react";
import { InputField } from "../ui/components/form/InputField";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import useResetPassword from "../hooks/useResetPassword";
import { useAuthStore } from "../state/useAuthState";
import { toast } from "sonner";

const resetPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(9, "Current password must be at least 9 characters"),
    password: z.string().min(9, "Password must be at least 9 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const router = useRouter();
  const { userId } = useAuthStore();
  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: resetPassWord, isPending: isResetting } = useResetPassword();

  const password = useWatch({
    control: form.control,
    name: "password",
  });

  const passwordChecklist = useMemo(() => {
    return [
      { label: "At least 9 characters", passed: password?.length >= 9 },
      { label: "Contains a number", passed: /\d/.test(password || "") },
      {
        label: "Contains a special character",
        passed: /[^A-Za-z0-9]/.test(password || ""),
      },
      {
        label: "One special character (!@#$%^&*)",
        passed: /[^A-Za-z0-9]/.test(password || ""),
      },
    ];
  }, [password]);

  const onSubmit = async (values: ResetFormValues) => {
    console.log("Reset Password Data:", values);
    // TODO: Call API → Reset password → Redirect to dashboard/login
    resetPassWord(
      {
        currentPassword: values.currentPassword,
        newPassword: values.password,
        userId: userId!,
      },
      {
        onSuccess: () => {
          toast.success("Password reset successfully.");
          router.push("/auth/login");
        },
        onError: (error: any) => {
          console.error("Failed to reset password:", error);
          toast.error(
            error?.response?.data?.message ||
              "Failed to reset password. Please try again.",
          );
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mgm text-white px-6">
      <div className="w-full max-w-lg space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text1-gold">Create New Password</h1>
          <p className="text-white/60 text-sm mt-2">
            Since this is your first login, please set a secure password.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <InputField
              control={form.control}
              name="currentPassword"
              label="Current Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your current password"
              //   onFocus={() => setShowPasswordBox(true)}
              leftIcon={<Lock size={17} className="text-gold/60 mr-2" />}
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
            <InputField
              control={form.control}
              name="password"
              label="New Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter a strong password"
              //   onFocus={() => setShowPasswordBox(true)}
              leftIcon={<Lock size={17} className="text-gold/60 mr-2" />}
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

            <InputField
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              leftIcon={<Lock size={17} className="text-gold/60 mr-2" />}
              rightIcon={
                showConfirmPassword ? (
                  <EyeOff
                    className="  h-5 w-5 text-gray-400 cursor-pointer"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <Eye
                    className="  h-5 w-5 text-gray-400 cursor-pointer"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )
              }
            />

            {/* Password Rules Box */}

            <div className="border border-white/10 rounded-md p-4 bg-white/5 space-y-2 text-sm">
              <span className="font-semibold text-white block mb-1">
                Password Requirements:
              </span>

              {passwordChecklist.map(({ label, passed }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 ${
                    passed ? "text-green-400" : "text-white/40"
                  }`}
                >
                  <span>{passed ? "✔️" : "❌"}</span>
                  {label}
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="w-full bg-gold h-10 "
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
