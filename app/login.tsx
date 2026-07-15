import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/Button';
import LoadingOverlay from '../components/LoadingOverlay';
import { useState } from 'react';
import api from './api';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';

const getErrorMessage = (error: any) => {
  if (!error?.response) {
    return 'Cannot reach the server. Check that the backend is running and the API URL is correct.';
  }

  return error.response.data?.message || 'Something went wrong. Please try again.';
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

      if (!res.data?.token) {
        throw new Error('Login response did not include a token');
      }

      await SecureStore.setItemAsync("token", res.data.token);
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

      if (!res.data?.token) {
        throw new Error('Guest login response did not include a token');
      }

      await SecureStore.setItemAsync('token', res.data.token);
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
    <View style={styles.container}>
      
      {loading && <LoadingOverlay />}

      <Text style={styles.title}>InsightFlow</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email Address"
        placeholderTextColor="#6B7280"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        style={styles.input}
        />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#6B7280"
        secureTextEntry
        style={styles.input}
        />

      <Button title='Sign In' method={login} />

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.registerText}>
          Don&apos;t have an account?{" "}
          <Text style={styles.registerLink}>Create Account</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.guestButton}
        onPress={guest}>
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
          Guest account will be automatically deleted after 24 hours and will be not accessible after user logged out
      </Text>
      <Toast/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: '#E5E7EB',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#111827',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    color: '#E5E7EB',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  registerText: {
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 18,
  },

  registerLink: {
    color: "#7C5CFF",
    fontWeight: "500",
  },

  guestButton: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#7C5CFF",
    alignItems: "center",
  },

  guestText: {
    color: "#7C5CFF",
    fontWeight: "500",
  },
});
