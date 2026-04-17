import { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionCard } from "../../components/ui/ActionCard";
import { ActivityItem } from "../../components/ui/ActivityItem";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { getStoredUser, logout, AuthUser } from "../../services/authService";
import { fetchDownloads, fetchBios } from "../../services/historyService";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadUserAndActivity = async () => {
        const storedUser = await getStoredUser();
        setUser(storedUser);
        
        if (storedUser && !storedUser.isGuest) {
          try {
            const [downloads, bios] = await Promise.all([fetchDownloads(), fetchBios()]);
            
            // Unify and sort
            const unified = [
              ...downloads.map((d: any) => ({ ...d, type: 'download' })),
              ...bios.map((b: any) => ({ ...b, type: 'bio' }))
            ].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            
            setRecentActivity(unified.slice(0, 3)); // Keep top 3
          } catch (e) {
            console.error("Failed to load activity", e);
          }
        } else {
          setRecentActivity([]);
        }
      };
      
      loadUserAndActivity();
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

  const firstName = user?.name?.split(" ")[0] || "Guest";
  const initial = firstName[0].toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <View>
            <Text className="text-[15px] font-medium text-gray-500">Welcome,</Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-[28px] font-bold text-gray-900 tracking-tight mr-2">{firstName}</Text>
              <Text className="text-[22px]">👋</Text>
            </View>
          </View>
          {user && !user.isGuest && (
            <TouchableOpacity onPress={handleLogout} className="w-[50px] h-[50px] bg-[#F1F4FF] rounded-full items-center justify-center border border-[#E0E7FF]">
              <Text className="text-[#5267DA] text-lg font-bold">{initial}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Actions */}
        <Text className="text-[17px] font-bold text-gray-900 mb-4">Quick actions</Text>
        
        <ActionCard 
          title="Video Downloader"
          subtitle="Paste a link · Save to device"
          bgClass="bg-[#F8FAFF]"
          borderClass="border-[#DCE4FC]"
          onPress={() => router.push("/downloader")}
          icon={
            <View className="w-14 h-14 bg-[#5B71E1] rounded-[14px] items-center justify-center">
              <Ionicons name="download-outline" size={26} color="#FFFFFF" />
            </View>
          }
        />

        <ActionCard 
          title="AI Bio Generator"
          subtitle="Text or image · 6 platforms"
          bgClass="bg-[#FAF8FF]"
          borderClass="border-[#E9E0FC]"
          onPress={() => router.push("/bio-generator")}
          icon={
            <View className="w-14 h-14 bg-[#8B5CF6] rounded-[14px] items-center justify-center">
              <Ionicons name="sparkles" size={26} color="#FBBF24" />
            </View>
          }
        />

        {/* Recent Activity */}
        <View className="mt-8 mb-4">
          <Text className="text-[17px] font-bold text-gray-900">Recent activity</Text>
        </View>

        {recentActivity.length === 0 ? (
          <View className="items-center justify-center py-10">
            <View className="w-16 h-16 rounded-full bg-[#F3F4F6] items-center justify-center mb-4">
              <Ionicons name="time-outline" size={28} color="#9CA3AF" />
            </View>
            <Text className="text-[15px] font-semibold text-gray-500">No activity yet</Text>
            <Text className="text-[13px] text-gray-400 mt-1 text-center">
              Your downloads and bios will appear here.
            </Text>
          </View>
        ) : (
          recentActivity.map((item, index) => (
            <ActivityItem 
              key={item._id}
              title={item.type === 'download' ? `${item.platform} download` : `${item.niche} bio generated`}
              time={new Date(item.createdAt).toLocaleDateString()}
              meta={item.type === 'download' ? item.videoQuality : `${item.platforms.length} platforms`}
              iconName={item.type === 'download' ? "videocam" : "sparkles"}
            />
          ))
        )}

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
