import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ActivityItemProps {
  title: string;
  time: string;
  meta: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

export function ActivityItem({ title, time, meta, iconName }: ActivityItemProps) {
  return (
    <View className="flex-row items-center py-4 border-b border-gray-100 last:border-b-0">
      <View className="w-[52px] h-[52px] bg-[#F5F4EE] rounded-[16px] flex-row items-center justify-center mr-4">
        <Ionicons name={iconName} size={28} color="#4B5563" />
      </View>
      <View className="flex-1">
        <Text className="text-[16px] font-bold text-gray-900 tracking-tight">{title}</Text>
        <Text className="text-[13px] text-gray-500 font-medium mt-[2px]">
          {time} · {meta}
        </Text>
      </View>
    </View>
  );
}
