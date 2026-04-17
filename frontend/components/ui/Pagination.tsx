import { View } from "react-native";

interface PaginationProps {
  total: number;
  activeIndex: number;
}

export function Pagination({ total, activeIndex }: PaginationProps) {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <View
            key={index}
            className={`h-2 rounded-full ${
              isActive ? "w-6 bg-[#5267DA]" : "w-2 bg-[#D1D5DB]"
            }`}
          />
        );
      })}
    </View>
  );
}
