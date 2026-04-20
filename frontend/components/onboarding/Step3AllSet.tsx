import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { Button } from "../ui/Button";
import { useRouter } from "expo-router";
import { useState } from "react";
import { continueAsGuest, setOnboardingCompleted } from "../../services/authService";

const { width } = Dimensions.get("window");

interface StepProps {
  onNext: () => void;
  onSkip: () => void;
}

export function Step3AllSet({ onNext, onSkip }: StepProps) {
  const router = useRouter();
  const [guestLoading, setGuestLoading] = useState(false);

  const handleFinishOnboarding = async (path: string) => {
    try {
      await setOnboardingCompleted();
      if (path === '/(tabs)') {
        setGuestLoading(true);
        await continueAsGuest();
        router.replace(path as any);
      } else {
        router.push(path as any);
      }
    } catch (error) {
      console.error("Failed to finish onboarding:", error);
      router.push(path as any);
    } finally {
      setGuestLoading(false);
    }
  };

  const handleGuest = () => handleFinishOnboarding('/(tabs)');

  return (
    <View style={{ width }} className="px-6 flex-1 justify-between pb-4">
      <View>
        <View className="w-full h-[260px] bg-[#FFF] rounded-[32px] items-center justify-center mb-10">
          <View className="items-center justify-center w-24 h-24">
            <Text style={{ fontSize: 64 }}>🚀</Text>
          </View>
        </View>

        <Text className="text-[28px] font-bold text-gray-900 text-center mb-4 tracking-tight">
          You're all set
        </Text>
        
        <Text className="text-[15px] font-medium text-gray-500 text-center leading-[24px] px-2">
          Sign up to sync your history and unlock Pro features, or jump straight in for free.
        </Text>
      </View>

      <View>
        <Button title="Sign up with email" onPress={() => handleFinishOnboarding("/signup")} className="mb-3" />
        <Button title="Already have an account" variant="outline" onPress={() => handleFinishOnboarding("/signin")} />
        
        <TouchableOpacity onPress={handleGuest} disabled={guestLoading} className="mt-5 items-center">
          {guestLoading ? (
            <ActivityIndicator size="small" color="#6B7280" />
          ) : (
            <Text className="text-[#6B7280] text-[13px] font-medium tracking-wide">
              Continue without account
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
