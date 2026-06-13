import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

export default function ProductDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Details</Text>
      <Text style={styles.description}>
        This screen is the product details page. Add real product details,
        images, and purchase flows here.
      </Text>
      <Link href="/cart" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Go to Cart</Text>
        </Pressable>
      </Link>
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
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#6f42c1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
