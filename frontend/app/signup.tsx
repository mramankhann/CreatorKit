import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signupWithEmail } from "../services/authService";

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      setLoading(true);
      await signupWithEmail(name, email, password);
      router.replace("/(tabs)");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>

          {/* Back */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-[#F3F4F6] rounded-full items-center justify-center mt-4 mb-8"
          >
            <Ionicons name="arrow-back" size={20} color="#4B5563" />
          </TouchableOpacity>

          {/* Header */}
          <Text className="text-[32px] font-bold text-gray-900 tracking-tight mb-2">Create account</Text>
          <Text className="text-[15px] text-gray-500 mb-10">Sign up to save your history and unlock Pro features.</Text>

          {/* Error Banner */}
          {error ? (
            <View className="w-full bg-red-50 rounded-[14px] p-4 mb-6 border border-red-200">
              <Text className="text-red-600 font-medium text-[14px]">{error}</Text>
            </View>
          ) : null}

          {/* Name Field */}
          <Text className="text-[14px] font-semibold text-gray-700 mb-2">Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Priya Sharma"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            className="w-full h-14 px-4 bg-[#F9FAFB] border border-gray-300 rounded-[14px] text-[16px] text-gray-900 mb-5"
          />

          {/* Email Field */}
          <Text className="text-[14px] font-semibold text-gray-700 mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@email.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full h-14 px-4 bg-[#F9FAFB] border border-gray-300 rounded-[14px] text-[16px] text-gray-900 mb-5"
          />

          {/* Password Field */}
          <Text className="text-[14px] font-semibold text-gray-700 mb-2">Password</Text>
          <View className="w-full h-14 bg-[#F9FAFB] border border-gray-300 rounded-[14px] flex-row items-center px-4 mb-10">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Min. 6 characters"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              className="flex-1 text-[16px] text-gray-900"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSignUp}
            disabled={loading}
            className="w-full h-14 bg-[#5267DA] rounded-[20px] items-center justify-center mb-5"
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white font-bold text-[17px]">Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Sign In Link */}
          <TouchableOpacity onPress={() => router.replace("/signin")} className="items-center mb-10">
            <Text className="text-gray-500 text-[14px]">
              Already have an account?{" "}
              <Text className="text-[#5267DA] font-semibold">Sign in</Text>
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
