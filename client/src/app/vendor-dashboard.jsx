import { StyleSheet, Text, View } from "react-native";

export default function VendorDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendor Dashboard</Text>
      <Text style={styles.description}>
        Vendor dashboard screen for managing products, inventory, and orders.
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
