import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface ActionCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bgClass?: string;
  borderClass?: string;
  onPress?: () => void;
}

export function ActionCard({ 
  title, 
  subtitle, 
  icon, 
  bgClass = "bg-[#F3F5FA]", 
  borderClass = "border-[#D6DEEF]", 
  onPress 
}: ActionCardProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onPress}
      className={`w-full p-[18px] rounded-[24px] mb-[14px] flex-row items-center border border-[1.5px] ${bgClass} ${borderClass}`}
    >
      <View className="mr-5 items-center justify-center">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-[18px] font-bold text-gray-900 tracking-tight">{title}</Text>
        <Text className="text-[14px] text-gray-600 font-medium mt-1">{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
}
