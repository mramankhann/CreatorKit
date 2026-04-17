import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Button } from "../ui/Button";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface StepProps {
  onNext: () => void;
  onSkip: () => void;
}

export function Step2AIBios({ onNext, onSkip }: StepProps) {
  return (
    <View style={{ width }} className="px-6 flex-1 justify-between pb-4">
      <View>
        <View className="w-full h-[260px] bg-[#F5F4EE] rounded-[32px] items-center justify-center mb-10">
          
          <View className="items-center justify-center relative w-24 h-24">
            <Ionicons name="sparkles" size={72} color="#F59E0B" />
          </View>

        </View>

        <Text className="text-[28px] font-bold text-gray-900 text-center mb-4 tracking-tight">
          AI bios in seconds
        </Text>
        
        <Text className="text-[15px] font-medium text-gray-500 text-center leading-[24px] px-2">
          Type your niche or upload a photo. We'll write platform-perfect bios for every channel you manage.
        </Text>
      </View>

      <View>
        <Button title="Next" onPress={onNext} />
        <TouchableOpacity onPress={onSkip} className="mt-[22px] items-center">
          <Text className="text-[#6B7280] text-[15px] font-semibold tracking-wide">
            Skip intro
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
