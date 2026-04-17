import { useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { getStoredUser, AuthUser } from "../../services/authService";
import { fetchDownloads, deleteDownloadHistory } from "../../services/historyService";

export default function DownloadHistoryTab() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const storedUser = await getStoredUser();
      setUser(storedUser);
      if (storedUser && !storedUser.isGuest) {
        const data = await fetchDownloads();
        setDownloads(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Video",
      "Are you sure you want to remove this video from your history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDownloadHistory(id);
              setDownloads(prev => prev.filter(item => item._id !== id));
            } catch (e) {
              Alert.alert("Error", "Could not delete item.");
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#5267DA" />
      </SafeAreaView>
    );
  }

  // --- GUEST STATE ---
  if (!user || user.isGuest) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <View className="w-24 h-24 bg-gray-50 rounded-full items-center justify-center mb-6 border border-gray-100">
          <Ionicons name="lock-closed" size={40} color="#9CA3AF" />
        </View>
        <Text className="text-[24px] font-bold text-gray-900 mb-2">History is locked</Text>
        <Text className="text-[15px] font-medium text-gray-500 text-center leading-[24px] mb-8">
          You are currently in Guest Mode. Sign up to securely save and access your past downloads.
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/signup" as any)}
          className="w-full h-14 bg-[#5267DA] rounded-[16px] items-center justify-center mb-3 shadow-sm shadow-[#5267DA]/30"
        >
          <Text className="text-white font-bold text-[16px]">Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/signin" as any)}>
          <Text className="text-[#5267DA] font-semibold text-[15px]">Sign in</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // --- LOGGED IN USER, BUT EMPTY HISTORY ---
  if (downloads.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <View className="mb-6">
          <Ionicons name="cloud-offline-outline" size={64} color="#D1D5DB" />
        </View>
        <Text className="text-xl font-bold text-gray-900 text-center">No downloads yet</Text>
        <Text className="text-[15px] text-gray-500 mt-2 text-center">
          Go to the Quick Actions to download your first video.
        </Text>
      </SafeAreaView>
    );
  }

  // --- LOGGED IN USER, HAS HISTORY ---
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-6 pb-4 border-b border-gray-100 mb-2 flex-row justify-between items-center">
        <Text className="text-[28px] font-bold text-gray-900 tracking-tight">Downloads</Text>
        <Text className="text-[15px] font-medium text-gray-500">{downloads.length} videos</Text>
      </View>
      
      <FlatList
        data={downloads}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View className="w-full bg-[#f9fafc] rounded-[16px] p-4 flex-row items-center border border-gray-100 mb-4">
            <View className="w-12 h-12 bg-[#E0E7FF] rounded-full items-center justify-center mr-4">
               <Ionicons 
                 name={item.platform.toLowerCase() === 'instagram' ? 'logo-instagram' : 
                       item.platform.toLowerCase() === 'youtube' ? 'logo-youtube' : 
                       'videocam'} 
                 size={24} color="#5267DA" 
               />
            </View>
            <View className="flex-1">
              <Text className="text-[16px] font-bold text-gray-900 mb-1 leading-tight" numberOfLines={1}>
                {item.platform} Video
              </Text>
              <Text className="text-[13px] text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()} • {item.videoQuality}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item._id)} className="w-8 h-8 rounded-full bg-red-50 border border-red-100 items-center justify-center shadow-sm">
              <Ionicons name="trash-outline" size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
