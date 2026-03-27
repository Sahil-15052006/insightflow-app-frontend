import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>InsightFlow</Text>

      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#6B7280"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#6B7280"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/(tabs)/home')}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text style={styles.registerLink}>Create Account</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.guestButton}
        onPress={() => router.replace("/(tabs)/home")}>
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>

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
    fontWeight:"bold",
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

  button: {
    backgroundColor: '#7C5CFF',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
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