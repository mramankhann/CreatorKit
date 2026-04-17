import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BrandLogoProps {
  size?: number;
}

export function BrandLogo({ size = 100 }: BrandLogoProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        backgroundColor: "#5267DA", // Beautiful vibrant indigo/blue
      }}
      className="items-center justify-center shadow-lg shadow-indigo-200"
    >
      <Ionicons name="flash" size={size * 0.55} color="#FF8C42" />
    </View>
  );
}
