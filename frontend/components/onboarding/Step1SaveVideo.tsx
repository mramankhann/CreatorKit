import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Button } from "../ui/Button";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface StepProps {
  onNext: () => void;
  onSkip: () => void;
}

export function Step1SaveVideo({ onNext, onSkip }: StepProps) {
  return (
    <View style={{ width }} className="px-6 flex-1 justify-between pb-4">
      <View>
        <View className="w-full h-[260px] bg-[#F5F4EE] rounded-[32px] items-center justify-center mb-10">
          
          <View className="items-center justify-center relative w-24 h-24">
            {/* Graphic container / box tray */}
            <View className="w-[72px] h-[52px] bg-[#7D9AF4] rounded-[16px] absolute bottom-2 flex-row justify-center overflow-hidden border border-[#A4B8F9]">
               <View className="w-10 h-4 bg-[#F5F4EE] rounded-b-[10px] absolute -top-[1px]" />
            </View>
            <View className="absolute top-0">
              <Ionicons name="arrow-down-outline" size={48} color="#E11D48" style={{ fontWeight: 'bold' }} />
            </View>
          </View>

        </View>

        <Text className="text-[28px] font-bold text-gray-900 text-center mb-4 tracking-tight">
          Save any video
        </Text>
        
        <Text className="text-[15px] font-medium text-gray-500 text-center leading-[24px] px-2">
          Paste a link from Instagram, YouTube, or Facebook and save it to your device in seconds.
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
