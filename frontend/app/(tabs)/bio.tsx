import { useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { getStoredUser, AuthUser } from "../../services/authService";
import { fetchBios, deleteBioHistory } from "../../services/historyService";

export default function BioHistoryTab() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [bios, setBios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const storedUser = await getStoredUser();
      setUser(storedUser);
      if (storedUser && !storedUser.isGuest) {
        const data = await fetchBios();
        setBios(data);
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
      "Delete Bio",
      "Are you sure you want to remove this bio from your history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteBioHistory(id);
              setBios(prev => prev.filter(item => item._id !== id));
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
        <View className="w-24 h-24 bg-[#FFFBEB] rounded-full items-center justify-center mb-6 border border-[#FEF3C7]">
          <Ionicons name="lock-closed" size={40} color="#F59E0B" />
        </View>
        <Text className="text-[24px] font-bold text-gray-900 mb-2">History is locked</Text>
        <Text className="text-[15px] font-medium text-gray-500 text-center leading-[24px] mb-8">
          You are currently in Guest Mode. Sign up to securely save and access your past AI bios.
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
  if (bios.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <View className="mb-6">
          <Ionicons name="document-text-outline" size={64} color="#D1D5DB" />
        </View>
        <Text className="text-xl font-bold text-gray-900 text-center">No bios yet</Text>
        <Text className="text-[15px] text-gray-500 mt-2 text-center">
          Go to the Quick Actions to generate your first AI bio.
        </Text>
      </SafeAreaView>
    );
  }

  // --- LOGGED IN USER, HAS HISTORY ---
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-6 pb-4 border-b border-gray-100 mb-2 flex-row justify-between items-center">
        <Text className="text-[28px] font-bold text-gray-900 tracking-tight">AI Bios</Text>
        <Text className="text-[15px] font-medium text-gray-500">{bios.length} runs</Text>
      </View>
      
      <FlatList
        data={bios}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View className="w-full bg-[#FAFAFA] rounded-[16px] p-4 border border-gray-100 mb-4">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-[#FEF3C7] rounded-full items-center justify-center mr-3">
                  <Ionicons name="sparkles" size={16} color="#D97706" />
                </View>
                <Text className="text-[15px] font-bold text-gray-900 capitalize">{item.niche}</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Text className="text-[13px] text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</Text>
                <TouchableOpacity onPress={() => handleDelete(item._id)} className="p-1">
                  <Ionicons name="trash-outline" size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row flex-wrap">
              {item.platforms.map((plat: string, idx: number) => (
                <View key={idx} className="bg-white px-2 py-1 rounded border border-gray-200 mr-2 mb-2">
                  <Text className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">{plat}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
