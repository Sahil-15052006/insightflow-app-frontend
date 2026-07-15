import { View, Text } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store'
import api from "./api";

export default function SplashScreen() {


  useEffect(() => {
    checkToken()
  }, []);

  const checkToken = async()=>{
    const token = await SecureStore.getItemAsync("token")

    if (!token) return setTimeout(() => {
        router.replace('/login')
      }, 3000);

    try{
      await api.get('/auth/verify');
      setTimeout(() => {
        router.replace('/(tabs)/home')
      }, 3000);
    } catch {
      await SecureStore.deleteItemAsync("token")
      setTimeout(() => {
        router.replace('/login')
      }, 3000);
    }
  }

  return (
    <LinearGradient
      colors={["#020617", "#0B1120"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#020617" }}
    >
      <View className="mb-[25px] h-[90px] w-[90px] items-center justify-center rounded-3xl bg-[#7C5CFF]">
        <Ionicons name="flash" size={42} color="#fff" />
      </View>

      <Text className="mb-1.5 text-[34px] font-bold text-[#E5E7EB]">InsightFlow</Text>

      <Text className="text-[15px] text-[#9CA3AF]">
        Data Analytics Platform
      </Text>

      <Text className="mb-10 text-[13px] text-[#6B7280]">
        Powered by AI Intelligence
      </Text>

    </LinearGradient>
  );
}
