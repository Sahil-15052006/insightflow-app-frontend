import { View, ActivityIndicator } from "react-native";

export default function LoadingOverlay() {
  return (
    <View className="absolute inset-0 z-10 items-center justify-center bg-black/50">
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
