import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import api from './api'
import Toast from 'react-native-toast-message'
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import LoadingOverlay from "../components/LoadingOverlay";

const getErrorMessage = (error: any) => {
  if (error instanceof Error && error.name !== 'TypeError') {
    return error.message;
  }

  if (error?.name === 'TypeError') {
    return "Cannot reach the server. Check that the backend is running and the API URL is correct.";
  }

  return "Something went wrong. Please try again.";
};

export default function Register() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [loading,setLoading]=useState(false)

  const register = async()=>{
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!(normalizedName && normalizedEmail && password && confirmPassword)) {
      return Toast.show({
        type:"error",
        text1:"Error",
        text2:"All fields are required",
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return Toast.show({
        type:"error",
        text1:"Error",
        text2:"Enter a valid email address",
      });
    }

    if (password !== confirmPassword) {
      return Toast.show({
        type:"error",
        text1:"Error",
        text2:"Passwords do not match",
      });
    }

    if (!checked) {
      return Toast.show({
        type:"error",
        text1:"Error",
        text2:"Please accept the Terms of Service and Privacy Policy",
      });
    }

    try{
      setLoading(true);   
      await api.post('/auth/register',{
        name: normalizedName,
        email: normalizedEmail,
        password,
      });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Registered successfully. Please sign in.",
      });
      router.replace("/login");

    }catch(err:any){
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
    <View className="flex-1 justify-center bg-[#050E1F] p-6">

      {loading && <LoadingOverlay/>}

      <BackButton/>      

      <Text className="mb-5 text-2xl font-bold text-[#E5E7EB]">Create Account</Text>

      <Text className="mb-1.5 mt-2.5 text-[#9CA3AF]">Name</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="John Doe"
        placeholderTextColor="#6B7280"
        className="rounded-xl border border-[#1F2A44] bg-[#0F1A33] p-[14px] text-[#E5E7EB]"
      />

      <Text className="mb-1.5 mt-2.5 text-[#9CA3AF]">Email Address</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@company.com"
        placeholderTextColor="#6B7280"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        className="rounded-xl border border-[#1F2A44] bg-[#0F1A33] p-[14px] text-[#E5E7EB]"
      />

      <Text className="mb-1.5 mt-2.5 text-[#9CA3AF]">Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="••••••••••"
        placeholderTextColor="#6B7280"
        className="rounded-xl border border-[#1F2A44] bg-[#0F1A33] p-[14px] text-[#E5E7EB]"
      />

      <Text className="mb-1.5 mt-2.5 text-[#9CA3AF]">Confirm Password</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholder="••••••••••"
        placeholderTextColor="#6B7280"
        className="rounded-xl border border-[#1F2A44] bg-[#0F1A33] p-[14px] text-[#E5E7EB]"
      />

      <TouchableOpacity
        className="mt-4 flex-row items-center"
        onPress={() => setChecked(!checked)}
      >
        <View className={`mr-2.5 h-[18px] w-[18px] border border-[#6B7280] ${checked ? 'bg-[#7C5CFF]' : ''}`} />
        <Text className="flex-1 text-xs text-[#9CA3AF]">
          I agree to the Terms of Service and Privacy Policy
        </Text>
      </TouchableOpacity>

      <Button title="Create Account" method={register}/>

      <TouchableOpacity onPress={()=>router.replace("/login")}>
        <Text className="mt-[18px] text-center text-[#9CA3AF]">
          Already have an account? <Text className="text-[#7C5CFF]">Sign In</Text>
        </Text>
      </TouchableOpacity>
      
      <Toast/>

    </View>
  );
}
