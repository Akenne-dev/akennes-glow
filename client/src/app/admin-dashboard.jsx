import { StyleSheet, Text, View } from "react-native";

export default function AdminDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.description}>
        Admin dashboard screen for managing users, vendors, and overall app
        analytics.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
});
