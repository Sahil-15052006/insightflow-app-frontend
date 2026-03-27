import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome back</Text>
        <Text style={styles.name}>User 👋</Text>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>
      </View>

      <TouchableOpacity 
      onPress={()=>router.push("/dataset-preview")}>
        <LinearGradient
          colors={["#7C5CFF", "#9B8AFB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.uploadButton}
        >
          <Text style={styles.uploadText}>Upload CSV Dataset</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.section}>Recent Datasets</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sales_Q4_2024.csv</Text>
        <Text style={styles.cardDate}>Dec 15, 2024</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1F",
    padding: 20,
  },

  header: {
    marginTop: 40,
    marginBottom: 30,
  },

  welcome: {
    color: "#9CA3AF",
    fontSize: 14,
  },

  name: {
    color: "#E5E7EB",
    fontSize: 22,
    fontWeight: "600",
  },

  avatar: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#7C5CFF",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "white",
    fontWeight: "600",
  },

  uploadButton: {
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  uploadText: {
    color: "#fff",
    fontWeight: "600",
  },

  section: {
    marginTop: 30,
    marginBottom: 12,
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "500",
  },

  card: {
    backgroundColor: "#0F1A33",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  cardTitle: {
    color: "#E5E7EB",
    fontWeight: "500",
  },

  cardDate: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 4,
  },
});