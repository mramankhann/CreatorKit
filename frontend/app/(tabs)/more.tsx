import { useState, useCallback } from "react";
import { View, Text, Switch, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { getStoredUser, logout, AuthUser } from "../../services/authService";

export default function MoreTab() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  // Reload user every time this tab is focused
  useFocusEffect(
    useCallback(() => {
      getStoredUser().then(setUser);
    }, [])
  );

  const handleLogout = () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log out",
          style: "destructive",
          onPress: async () => {
            await logout();
            setUser(null);
            router.replace("/signin" as any);
          },
        },
      ]
    );
  };

  const displayName = user?.isGuest ? "Guest User" : (user?.name ?? "—");
  const displayEmail = user?.isGuest ? "No account" : (user?.email ?? "—");
  const initial = displayName[0]?.toUpperCase() ?? "G";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-[32px] font-bold text-gray-900 tracking-tight">More</Text>
          {!user || user.isGuest ? (
            <TouchableOpacity
              onPress={() => router.push('/signup' as any)}
              className="flex-row items-center gap-1 px-4 py-2 rounded-full bg-[#EEF2FE] border border-[#DCE4FC]"
            >
              <Ionicons name="person-add-outline" size={18} color="#5267DA" />
              <Text className="text-[#5267DA] font-semibold text-[13px] ml-1">Sign Up</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleLogout}
              className="flex-row items-center gap-1 px-4 py-2 rounded-full bg-red-50 border border-red-200"
            >
              <Ionicons name="log-out-outline" size={18} color="#EF4444" />
              <Text className="text-red-500 font-semibold text-[13px] ml-1">Log out</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Card */}
        <View className="w-full bg-[#F9FAF4] rounded-[24px] p-5 flex-row items-center mb-8">
          <View className="w-[60px] h-[60px] rounded-full bg-[#EBEBFF] items-center justify-center mr-4">
            <Text className="text-[26px] font-bold text-[#5267DA]">{initial}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[17px] font-bold text-gray-900 leading-tight mb-1">{displayName}</Text>
            <Text className="text-[13px] text-gray-500">{displayEmail}</Text>
          </View>
          <View className="px-3 py-1 bg-[#E1F7EF] rounded-md">
            <Text className="text-[#059669] font-bold text-[12px]">{user?.isGuest ? "Guest" : "Free"}</Text>
          </View>
        </View>

        {/* Settings Items */}
        <View className="w-full">
          
          {/* Notifications */}
          <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
             <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-[12px] bg-[#F7F7F9] items-center justify-center mr-4">
                  <Ionicons name="notifications" size={20} color="#FBBF24" />
                </View>
                <Text className="text-[16px] font-medium text-gray-900">Notifications</Text>
             </View>
             <Switch 
               value={notifications}
               onValueChange={setNotifications}
               trackColor={{ false: '#E5E7EB', true: '#5267DA' }} 
               thumbColor="#FFFFFF"
             />
          </View>

          {/* Save Location */}
          <TouchableOpacity activeOpacity={0.7} className="flex-row items-center justify-between py-4 border-b border-gray-100">
             <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-[12px] bg-[#F0FDF4] items-center justify-center mr-4">
                  <Ionicons name="folder" size={20} color="#FBBF24" />
                </View>
                <View>
                  <Text className="text-[16px] font-medium text-gray-900">Save location</Text>
                  <Text className="text-[12px] text-gray-400 mt-0.5">Camera Roll</Text>
                </View>
             </View>
             <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          
          {/* Dark Mode */}
          <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
             <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-[12px] bg-[#FFF7ED] items-center justify-center mr-4">
                  <Ionicons name="moon" size={20} color="#FBBF24" />
                </View>
                <Text className="text-[16px] font-medium text-gray-900">Dark mode</Text>
             </View>
             <Switch 
               value={darkMode}
               onValueChange={setDarkMode}
               trackColor={{ false: '#E5E7EB', true: '#5267DA' }}
               thumbColor="#FFFFFF"
             />
          </View>

          {/* Clear History */}
          <TouchableOpacity activeOpacity={0.7} className="flex-row items-center justify-between py-4 border-b border-gray-100">
             <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-[12px] bg-[#FEF2F2] items-center justify-center mr-4">
                  <Ionicons name="trash" size={20} color="#D1D5DB" />
                </View>
                <Text className="text-[16px] font-medium text-gray-900">Clear history</Text>
             </View>
             <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          
          {/* Rate CreatorKit */}
          <TouchableOpacity activeOpacity={0.7} className="flex-row items-center justify-between py-4 border-b border-gray-100 mb-10">
             <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-[12px] bg-[#F5F3FF] items-center justify-center mr-4">
                  <Ionicons name="star" size={20} color="#FBBF24" />
                </View>
                <Text className="text-[16px] font-medium text-gray-900">Rate CreatorKit</Text>
             </View>
             <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
