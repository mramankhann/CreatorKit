import { TouchableOpacity, Text, TouchableOpacityProps, View } from "react-native";
import { forwardRef } from "react";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export const Button = forwardRef<View, ButtonProps>(
  ({ title, variant = "primary", className = "", ...props }, ref) => {
    const baseClasses = "w-full py-4 rounded-[20px] items-center justify-center";
    const variantClasses = {
      primary: "bg-[#5267DA]",
      secondary: "bg-gray-200",
      outline: "bg-transparent border border-[#E5E7EB]",
      ghost: "bg-transparent",
    };
    
    const textBaseClasses = "font-semibold text-[17px]";
    const textVariantClasses = {
      primary: "text-white",
      secondary: "text-gray-900",
      outline: "text-gray-900",
      ghost: "text-gray-500",
    };

    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={0.8}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        <Text className={`${textBaseClasses} ${textVariantClasses[variant]}`}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);
