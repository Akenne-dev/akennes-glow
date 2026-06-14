import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ProductCard({ product }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₦{product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  },
  image: { width: "100%", height: 150 },
  name: { fontWeight: "bold", padding: 5 },
  price: { color: "#F83758", paddingHorizontal: 5, paddingBottom: 5 },
});
