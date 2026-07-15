import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/Button';
import LoadingOverlay from '../components/LoadingOverlay';
import { useState } from 'react';
import api from './api';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';

const getErrorMessage = (error: any) => {
  if (error instanceof Error && error.name !== 'TypeError') {
    return error.message;
  }

  if (error?.name === 'TypeError') {
    return 'Cannot reach the server. Check that the backend is running and the API URL is correct.';
  }

  return 'Something went wrong. Please try again.';
};

export default function Login() {

  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      Toast.show({
        type: "info",
        text1: "Alert",
        text2: "Email and password are required",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/login', {
        email: normalizedEmail,
        password,
      });

      if (!res?.token) {
        throw new Error('Login response did not include a token');
      }

      await SecureStore.setItemAsync("token", res.token);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Logged in successfully",
      });
      router.replace('/(tabs)/home');
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: getErrorMessage(err),
      });
    } finally {
      setLoading(false);
    }
  };

  const guest=async()=>{
    try{
      setLoading(true)
      const res = await api.post('/auth/guest');

      if (!res?.token) {
        throw new Error('Guest login response did not include a token');
      }

      await SecureStore.setItemAsync('token', res.token);
            Toast.show({
        type: "success",
        text1: "Success",
        text2: "Guest logged in successfully",
      });
      router.replace('/(tabs)/home');
    } catch(err:any){
      Toast.show({
        type: "error",
        text1: "Error",
        text2: getErrorMessage(err),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center bg-[#0A0F1E] p-6">
      
      {loading && <LoadingOverlay />}

      <Text className="mb-[30px] text-center text-[28px] font-bold text-[#E5E7EB]">InsightFlow</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email Address"
        placeholderTextColor="#6B7280"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        className="mb-4 rounded-xl bg-[#111827] p-[14px] text-[#E5E7EB]"
        />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#6B7280"
        secureTextEntry
        className="mb-4 rounded-xl bg-[#111827] p-[14px] text-[#E5E7EB]"
        />

      <Button title='Sign In' method={login} />

      <TouchableOpacity onPress={() => router.replace("/register")}>
        <Text className="mt-[18px] text-center text-[#9CA3AF]">
          Don&apos;t have an account?{" "}
          <Text className="font-medium text-[#7C5CFF]">Create Account</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-[14px] items-center rounded-[14px] border border-[#7C5CFF] p-[14px]"
        onPress={guest}>
        <Text className="font-medium text-[#7C5CFF]">Continue as Guest</Text>
      </TouchableOpacity>

      <Text className="mt-[18px] text-center text-[#9CA3AF]">
          Guest account will be automatically deleted after 24 hours and will be not accessible after user logged out
      </Text>
      <Toast/>
    </View>
  );
}
