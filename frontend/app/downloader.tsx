import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../components/ui/Button";
import { useRouter } from "expo-router";
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { getStoredUser } from "../services/authService";
import { saveDownload } from "../services/historyService";
import { extractMediaLine } from "../services/downloadService";

export default function DownloaderScreen() {
  const [activePlatform, setActivePlatform] = useState("All");
  const [activeQuality, setActiveQuality] = useState("720p");
  const [url, setUrl] = useState("");
  const [downloadState, setDownloadState] = useState<'idle' | 'extracting' | 'downloading' | 'success'>("idle");
  const [progress, setProgress] = useState(0);
  const [videoMeta, setVideoMeta] = useState<any>(null); // holds directUrl and title
  const router = useRouter();

  const platforms = ["All", "Instagram", "YouTube", "Facebook", "TikTok"];
  const qualities = ["Auto", "720p", "1080p", "Audio"];

  // Save to backend automatically on success if user is logged in
  useEffect(() => {
    if (downloadState === 'success' && videoMeta) {
      const persist = async () => {
        try {
          const user = await getStoredUser();
          if (user && !user.isGuest) {
            await saveDownload({
              url: url,
              platform: videoMeta.platform || 'Unknown',
              videoQuality: activeQuality,
              thumbnailUrl: videoMeta.thumbnail || ''
            });
          }
        } catch (e) {
          console.error("Failed to save download history", e);
        }
      };
      persist();
    }
  }, [downloadState]);

  const handleDownload = async () => {
    if (!url) {
      return Alert.alert("Hold on!", "Please paste a link to download.");
    }

    try {
      setDownloadState("extracting");
      
      // Phase 1: Call Backend to Extract Raw URL
      const metadata = await extractMediaLine(url, activeQuality);
      setVideoMeta(metadata);
      setDownloadState("downloading");

      // Phase 2: Download raw file physically to the phone's cache
      // Download directly without resumable to avoid SDK 54 Legacy crashes
      const isAudio = activeQuality === "Audio";
      const extension = isAudio ? ".mp3" : ".mp4";
      const fileUri = FileSystem.documentDirectory + (metadata.title ? metadata.title.replace(/[^a-zA-Z0-9]/g, "_") : 'media') + extension;
      
      const result = await FileSystem.downloadAsync(metadata.directUrl, fileUri);
      
      if (!result || !result.uri) throw new Error("Download failed");

      // Phase 3: Push to device native Share Sheet (bypasses Android 14 restricted MediaLibrary permissions)
      await Sharing.shareAsync(result.uri, {
        UTI: isAudio ? 'public.mp3' : 'public.movie',
        mimeType: isAudio ? 'audio/mpeg' : 'video/mp4',
        dialogTitle: isAudio ? 'Save or Share your MP3' : 'Save or Share your video'
      });
      
      // Clean up cache to prevent bloating the app
      await FileSystem.deleteAsync(result.uri, { idempotent: true });

      setDownloadState("success");
    } catch (e: any) {
      console.error(e);
      Alert.alert("Download Error", e.message || "Failed to download video. The link might be invalid or protected.");
      setDownloadState("idle");
      setProgress(0);
    }
  };

  const handleCancel = () => {
    setDownloadState("idle");
    setProgress(0);
    setVideoMeta(null);
  };

  const reset = () => {
    setDownloadState("idle");
    setProgress(0);
    setUrl("");
    setVideoMeta(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-2" showsVerticalScrollIndicator={false}>
        
        {/* Back Header */}
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-[#F3F4F6] rounded-full items-center justify-center mb-6">
          <Ionicons name="arrow-back" size={20} color="#4B5563" />
        </TouchableOpacity>

        {/* Header */}
        <Text className="text-[32px] font-bold text-gray-900 tracking-tight">Download</Text>
        
        {downloadState === 'idle' && (
          <Text className="text-[15px] font-medium text-gray-500 mt-1 mb-8">
            Instagram · YouTube · Facebook · TikTok
          </Text>
        )}
        {downloadState === 'extracting' && (
          <Text className="text-[15px] font-semibold text-[#5267DA] mt-1 mb-8">
            Analyzing link and bypassing protection...
          </Text>
        )}
        {downloadState === 'downloading' && (
          <Text className="text-[15px] font-medium text-gray-500 mt-1 mb-8">
            Saving directly to your device...
          </Text>
        )}
        {downloadState === 'success' && (
          <Text className="text-[15px] font-bold text-[#059669] mt-1 mb-8">
            Download Complete & Saved!
          </Text>
        )}

        {downloadState === 'idle' ? (
          <>
            {/* Real Input URL */}
            <View className="mb-8">
              <Text className="text-[17px] font-bold text-gray-900 mb-2">Video URL</Text>
              <TextInput 
                placeholder="https://instagram.com/reel/..."
                placeholderTextColor="#9ca3af"
                className="w-full h-[60px] bg-[#F9FAFB] border border-gray-300 rounded-[16px] px-4 text-[16px] text-gray-900"
                value={url}
                onChangeText={setUrl}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Platform Pills */}
            <View className="flex-row flex-wrap gap-3 mb-8">
              {platforms.map(p => (
                <TouchableOpacity 
                  key={p}
                  onPress={() => setActivePlatform(p)}
                  className={`px-5 py-2 rounded-full border ${
                    activePlatform === p ? "bg-[#5267DA] border-[#5267DA]" : "bg-white border-gray-300"
                  }`}
                >
                  <Text className={`font-semibold text-[14px] ${
                    activePlatform === p ? "text-white" : "text-gray-700"
                  }`}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Quality Pills */}
            <Text className="text-[17px] font-bold text-gray-900 mb-4">Quality</Text>
            <View className="flex-row flex-wrap gap-3 mb-10">
              {qualities.map(q => {
                const isActive = activeQuality === q;
                return (
                  <TouchableOpacity 
                    key={q}
                    onPress={() => setActiveQuality(q)}
                    className={`px-6 py-2.5 rounded-[16px] border ${
                      isActive ? "bg-[#EEF2FE] border-[#5267DA]" : "bg-white border-gray-300"
                    }`}
                  >
                    <Text className={`font-semibold text-[14px] ${
                      isActive ? "text-[#5267DA]" : "text-gray-700"
                    }`}>{q}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            <Button title="Analyze & Download" onPress={handleDownload} disabled={!url} />
          </>
        ) : (
          <>
            {/* Success Notification Banner */}
            {downloadState === 'success' && (
              <View className="w-full bg-[#ECFDF5] rounded-[20px] p-4 flex-row items-center mb-5">
                <View className="w-8 h-8 rounded-full bg-[#10B981] items-center justify-center mr-3">
                  <Ionicons name="checkmark" size={20} color="#FFFFFF" style={{ fontWeight: 'bold' }} />
                </View>
                <View>
                  <Text className="text-[#065F46] font-bold text-[15px]">Successfully Extracted</Text>
                  <Text className="text-[#059669] font-medium text-[13px] mt-0.5 tracking-wide">Choose "Save Video" from the menu that popped up.</Text>
                </View>
              </View>
            )}

            {/* Video Preview Card */}
            <View className="w-full h-[180px] rounded-[24px] bg-[#F5F4EE] overflow-hidden mb-8">
              <View className="flex-1 items-center justify-center">
                {downloadState === 'extracting' ? (
                   <ActivityIndicator size="large" color="#5267DA" />
                ) : (
                   <Ionicons name="film" size={48} color="#7D9AF4" />
                )}
              </View>
              {/* Footer strip */}
              {(downloadState === 'downloading' || downloadState === 'success') && videoMeta && (
                <View className="h-[36px] bg-black/50 px-4 flex-row items-center justify-between absolute bottom-0 w-full">
                  <Text className="text-white font-bold text-[12px] tracking-wider truncate" numberOfLines={1}>
                    {videoMeta.title || 'Video Media'}
                  </Text>
                  <Text className="text-[#A7F3D0] font-bold text-[12px] tracking-wider">{videoMeta.platform}</Text>
                </View>
              )}
            </View>

            {/* State Actions */}
            {downloadState === 'extracting' && (
               <View className="w-full items-center py-6 border border-gray-100 rounded-xl bg-gray-50">
                  <Text className="text-[#5267DA] font-bold text-lg mb-2">Extracting Media URL</Text>
                  <Text className="text-gray-500 text-center px-4">This usually takes about 3 to 10 seconds. We are securely grabbing the direct raw file from the social network.</Text>
               </View>
            )}

            {downloadState === 'downloading' && (
              <>
                <View className="flex-row justify-between mb-3 px-1">
                  <Text className="text-gray-500 font-medium text-[15px]">Downloading from {videoMeta?.platform}...</Text>
                  <Text className="text-gray-900 font-medium text-[15px]">{progress}%</Text>
                </View>

                <View className="w-full h-[6px] rounded-full bg-[#F5F4EE] mb-2 overflow-hidden relative">
                   <View className="h-full bg-[#5267DA] rounded-full absolute left-0 top-0 bottom-0" style={{ width: `${progress}%` }} />
                </View>
                
                <Text className="text-gray-400 font-medium text-[13px] mb-12 px-1 text-center">
                   Please keep the app open while saving.
                </Text>

                <Button title="Cancel" variant="outline" onPress={handleCancel} />
              </>
            )}

            {downloadState === 'success' && (
              <View className="w-full mt-4">
                <Button title="Download another" onPress={reset} className="mb-3" />
                <Button title="Go to Dashboard" variant="outline" onPress={() => router.push('/(tabs)')} />
              </View>
            )}

          </>
        )}

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
