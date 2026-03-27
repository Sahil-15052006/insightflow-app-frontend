import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

export default function Register() {
  const router = useRouter();

  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        placeholder="John Doe"
        placeholderTextColor="#6B7280"
        style={styles.input}
      />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        placeholder="you@company.com"
        placeholderTextColor="#6B7280"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        secureTextEntry
        placeholder="••••••••••"
        placeholderTextColor="#6B7280"
        style={styles.input}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
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

      <TouchableOpacity onPress={() => router.replace("/(tabs)/home")}>
        <LinearGradient
          colors={["#7C5CFF", "#9B8AFB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Sign In</Text>
        </Text>
      </TouchableOpacity>

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

  back: {
    fontSize: 22,
    color: "#E5E7EB",
    marginBottom: 10,
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

  button: {
    marginTop: 20,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  loginText: {
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 18,
  },

  loginLink: {
    color: "#7C5CFF",
  },
});