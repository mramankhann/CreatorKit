import "../global.css";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { BrandLogo } from "../components/ui/BrandLogo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboard");
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center pb-20">
        <BrandLogo size={104} />
        
        <Text className="mt-6 text-[32px] font-bold text-gray-900 tracking-tight">
          CreatorKit
        </Text>
        
        <Text className="mt-2 text-[13px] text-gray-500 font-medium">
          Download · Create · Publish
        </Text>
      </View>
    </SafeAreaView>
  );
}