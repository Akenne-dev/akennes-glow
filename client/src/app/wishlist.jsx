import { StyleSheet, Text, View } from "react-native";

export default function Wishlist() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      <Text style={styles.description}>
        Save your favorite cosmetics and beauty products here.
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
