"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { ReactNode } from "react";

type RHFInputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
};

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  leftIcon,
  rightIcon,
  onRightIconClick,
}: RHFInputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <div className="relative flex items-center">
              {/* Left Icon */}
              {leftIcon && (
                <span className="absolute left-3 ">
                  {leftIcon}
                </span>
              )}

              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={` focus-visible:ring-gold focus-visible:ring-1 focus-visible:border-gold bg-white/10 h-12 border shadow-none border-black/20
                ${leftIcon ? "pl-10" : ""}
                ${rightIcon ? "pr-10" : ""}`}
              />

              {/* Right Icon */}
              {rightIcon && (
                <button
                  type="button"
                  onClick={onRightIconClick}
                  className="absolute right-3 text-muted-foreground hover:text-black"
                >
                  {rightIcon}
                </button>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
