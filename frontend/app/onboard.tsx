import { useRef, useState } from "react";
import { View, TouchableOpacity, FlatList, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pagination } from "../components/ui/Pagination";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Step1SaveVideo } from "../components/onboarding/Step1SaveVideo";
import { Step2AIBios } from "../components/onboarding/Step2AIBios";
import { Step3AllSet } from "../components/onboarding/Step3AllSet";

const { width } = Dimensions.get("window");

const ONBOARDING_SLIDES = [
  { id: "1", Component: Step1SaveVideo },
  { id: "2", Component: Step2AIBios },
  { id: "3", Component: Step3AllSet }
];

export default function Onboard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      router.replace("/(tabs)" as any);
    }
  };

  const handleSkip = () => {
    const lastIndex = ONBOARDING_SLIDES.length - 1;
    flatListRef.current?.scrollToIndex({ index: lastIndex, animated: true });
    setCurrentIndex(lastIndex);
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    if (index !== currentIndex && index < ONBOARDING_SLIDES.length) {
      setCurrentIndex(index);
    }
  };

  const getItemLayout = (data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 pt-2 pb-6">
        
        {/* Top Header Row with dots */}
        <View className="flex-row items-center justify-center pt-2 pb-6 relative px-6">
          <Pagination total={3} activeIndex={currentIndex} />
          
          <TouchableOpacity className="absolute right-6 opacity-0">
             <Ionicons name="ellipsis-horizontal" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Swipeable Content Area */}
        <View className="flex-1">
          <FlatList 
            ref={flatListRef}
            data={ONBOARDING_SLIDES}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            getItemLayout={getItemLayout}
            renderItem={({ item: { Component } }) => (
              <Component onNext={handleNext} onSkip={handleSkip} />
            )}
          />
        </View>
        
      </View>
    </SafeAreaView>
  );
}
