import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import api from './api'
import Toast from 'react-native-toast-message'
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import LoadingOverlay from "../components/LoadingOverlay";

const getErrorMessage = (error: any) => {
  if (!error?.response) {
    return "Cannot reach the server. Check that the backend is running and the API URL is correct.";
  }

  return error.response.data?.message || "Something went wrong. Please try again.";
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
    <View style={styles.container}>

      {loading && <LoadingOverlay/>}

      <BackButton/>      

      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.label}>Name</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="John Doe"
        placeholderTextColor="#6B7280"
        style={styles.input}
      />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@company.com"
        placeholderTextColor="#6B7280"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="••••••••••"
        placeholderTextColor="#6B7280"
        style={styles.input}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholder="••••••••••"
        placeholderTextColor="#6B7280"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setChecked(!checked)}
      >
        <View style={[styles.checkbox, checked && styles.checkboxActive]} />
        <Text style={styles.checkboxText}>
          I agree to the Terms of Service and Privacy Policy
        </Text>
      </TouchableOpacity>

      <Button title="Create Account" method={register}/>

      <TouchableOpacity onPress={()=>router.push("/login")}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Sign In</Text>
        </Text>
      </TouchableOpacity>
      
      <Toast/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1F",
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    color: "#E5E7EB",
    marginBottom: 20,
    fontWeight: "bold",
  },

  label: {
    color: "#9CA3AF",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#0F1A33",
    borderRadius: 12,
    padding: 14,
    color: "#E5E7EB",
    borderWidth: 1,
    borderColor: "#1F2A44",
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#6B7280",
    marginRight: 10,
  },

  checkboxActive: {
    backgroundColor: "#7C5CFF",
  },

  checkboxText: {
    color: "#9CA3AF",
    fontSize: 12,
    flex: 1,
  },

  loginText: {
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 18,
  },

  loginLink: {
    color: "#7C5CFF",
  },

  toast:{
    backgroundColor: "#050E1F",
    color:"#ffffff"
  },
});
