import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Welcome to Akennes Glow Settings</Text>
      {/* We will build your sections here next! */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", padding: 20 },
});
