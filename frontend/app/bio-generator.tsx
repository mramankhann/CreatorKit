import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert, Clipboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../components/ui/Button";
import { useRouter } from "expo-router";
import { getStoredUser } from "../services/authService";
import { saveBio } from "../services/historyService";
import { generateAIBio } from "../services/bioService";

export default function BioGeneratorScreen() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [activeTone, setActiveTone] = useState("Professional");
  const [activeLength, setActiveLength] = useState("Medium");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Instagram"]);
  const [bioState, setBioState] = useState<'idle' | 'crafting' | 'success'>("idle");
  const [generatedResult, setGeneratedResult] = useState<{bioText: string, hashtags: string[]} | null>(null);

  const tones = ["Professional", "Casual", "Bold", "Witty", "Minimal"];
  const lengths = ["Short", "Medium", "Long"];
  const platformsList = ["LinkedIn", "Instagram", "TikTok", "YouTube", "Twitter/X"];

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      setSelectedPlatforms(selectedPlatforms.filter(x => x !== p));
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      return Alert.alert("Missing Details", "Please enter a topic or niche first.");
    }
    if (selectedPlatforms.length === 0) {
      return Alert.alert("Missing Platforms", "Please select at least one platform.");
    }

    try {
      setBioState("crafting");
      const data = await generateAIBio(topic, activeTone, activeLength, selectedPlatforms);
      setGeneratedResult(data);
      setBioState("success");
    } catch (e: any) {
      Alert.alert("Generation Failed", e.message || "Could not reach AI.");
      setBioState("idle");
    }
  };

  // Save to backend automatically on success if user is logged in
  useEffect(() => {
    if (bioState === 'success' && generatedResult) {
      const persist = async () => {
        try {
          const user = await getStoredUser();
          if (user && !user.isGuest) {
            await saveBio({
              niche: topic.substring(0, 50),
              platforms: selectedPlatforms,
              tone: activeTone,
              generatedBios: [
                { platform: selectedPlatforms.join(', '), text: generatedResult.bioText }
              ]
            });
          }
        } catch (e) {
          console.error("Failed to save bio history", e);
        }
      };
      persist();
    }
  }, [bioState, generatedResult]);

  const copyToClipboard = () => {
    if (generatedResult) {
      Clipboard.setString(`${generatedResult.bioText}\n\n${generatedResult.hashtags.join(' ')}`);
      Alert.alert("Copied!", "Your optimized bio is in your clipboard.");
    }
  };

  if (bioState === 'crafting') {
    return (
      <SafeAreaView className="flex-1 bg-[#FAFAFA] items-center justify-center">
        <ActivityIndicator size="large" color="#5267DA" />
        <Text className="text-[24px] font-bold text-gray-900 mt-6 tracking-tight">Crafting your copy...</Text>
        <Text className="text-[15px] text-gray-500 mt-2">
          Generating an AI intelligent bio for {selectedPlatforms.length} platform(s)...
        </Text>
      </SafeAreaView>
    );
  }

  if (bioState === 'success' && generatedResult) {
    return (
      <SafeAreaView className="flex-1 bg-[#FAFAFA]">
        <ScrollView className="flex-1 px-5 pt-2" showsVerticalScrollIndicator={false}>
          
          <TouchableOpacity onPress={() => setBioState("idle")} className="w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center mb-6">
             <Ionicons name="arrow-back" size={20} color="#4B5563" />
          </TouchableOpacity>

          <View className="flex-row items-end justify-between mb-8">
            <Text className="text-[32px] font-bold text-gray-900 tracking-tight">Your Bio</Text>
            <TouchableOpacity onPress={handleGenerate} className="flex-row items-center pb-2">
              <Text className="text-[#5267DA] font-medium text-[14px] mr-1">Regenerate</Text>
              <Ionicons name="refresh" size={14} color="#5267DA" />
            </TouchableOpacity>
          </View>

          <View className="w-full bg-white rounded-[24px] border border-gray-200 p-6 mb-8 shadow-sm">
            <Text className="text-[17px] text-gray-800 leading-relaxed mb-6 font-medium">
              {generatedResult.bioText}
            </Text>
            <View className="flex-row flex-wrap gap-2">
               {generatedResult.hashtags.map((tag, i) => (
                 <Text key={i} className="text-[#5267DA] font-bold text-[14px]">{tag}</Text>
               ))}
            </View>
          </View>

          <Button title="Copy to Clipboard" onPress={copyToClipboard} className="mb-4" />
          <Button title="Go Dashboard" variant="outline" onPress={() => router.push('/(tabs)')} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-2" showsVerticalScrollIndicator={false}>
        
        {/* Back Header */}
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-[#F3F4F6] rounded-full items-center justify-center mb-6">
          <Ionicons name="arrow-back" size={20} color="#4B5563" />
        </TouchableOpacity>

        {/* Header */}
        <Text className="text-[32px] font-bold text-gray-900 tracking-tight">AI Bio Tools</Text>
        <Text className="text-[15px] font-medium text-gray-500 mt-2 mb-8 pr-10 leading-[22px]">
          Turn your ideas into optimized social copy using Gemini.
        </Text>

        <View className="w-full min-h-[140px] bg-[#FAFAFA] border border-gray-200 rounded-[20px] p-4 mb-8">
          <TextInput 
            multiline 
            placeholder="E.g., I'm a fitness coach helping new mums rebuild strength..."
            placeholderTextColor="#9ca3af"
            className="text-[16px] text-gray-900 leading-[24px]"
            textAlignVertical="top"
            value={topic}
            onChangeText={setTopic}
          />
        </View>

        {/* Tone Selector */}
        <Text className="text-[17px] font-bold text-gray-900 mb-4">Tone of voice</Text>
        <View className="flex-row flex-wrap gap-2.5 mb-8">
          {tones.map(t => {
            const isActive = activeTone === t;
            return (
              <TouchableOpacity 
                key={t}
                onPress={() => setActiveTone(t)}
                className={`px-5 py-2.5 rounded-full border ${
                  isActive ? "bg-[#EEF2FE] border-[#5267DA]" : "bg-white border-gray-300"
                }`}
              >
                <Text className={`font-semibold text-[14px] ${
                  isActive ? "text-[#5267DA]" : "text-gray-700"
                }`}>{t}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Length Selector */}
        <Text className="text-[17px] font-bold text-gray-900 mb-4">Length</Text>
        <View className="flex-row gap-2 mb-8">
          {lengths.map(l => {
            const isActive = activeLength === l;
            return (
              <TouchableOpacity 
                key={l}
                onPress={() => setActiveLength(l)}
                className={`flex-1 py-3 rounded-[16px] items-center border ${
                  isActive ? "bg-black border-black" : "bg-white border-gray-300"
                }`}
              >
                <Text className={`font-semibold text-[14px] ${
                  isActive ? "text-white" : "text-gray-700"
                }`}>{l}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Platforms */}
        <Text className="text-[17px] font-bold text-gray-900 mb-4">Where will you post?</Text>
        <View className="flex-row flex-wrap gap-3 mb-10">
          {platformsList.map(p => {
             const isActive = selectedPlatforms.includes(p);
             return (
              <TouchableOpacity 
                key={p}
                onPress={() => togglePlatform(p)}
                className={`flex-row items-center px-4 py-2.5 rounded-full border ${
                  isActive ? "bg-[#F3F4F6] border-gray-900" : "bg-white border-gray-300"
                }`}
              >
                {isActive && <Ionicons name="checkmark" size={16} color="#111827" style={{ marginRight: 6 }} />}
                <Text className={`font-semibold text-[14px] ${
                  isActive ? "text-gray-900" : "text-gray-500"
                }`}>{p}</Text>
              </TouchableOpacity>
             )
          })}
        </View>

        <Button title="Generate bios" onPress={handleGenerate} disabled={!topic.trim()} className="mb-2" />
        <View className="h-10" />

      </ScrollView>
    </SafeAreaView>
  );
}
