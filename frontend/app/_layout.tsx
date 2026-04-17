import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboard" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="signin" />
      <Stack.Screen name="downloader" />
      <Stack.Screen name="bio-generator" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
