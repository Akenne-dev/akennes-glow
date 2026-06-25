import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function WishlistCard({ product, onRemove, onShop }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <Text style={styles.price}>₦{product.price}</Text>

        <TouchableOpacity style={styles.shopButton} onPress={onShop}>
          <Ionicons name="cart" size={16} color="#fff" />
          <Text style={styles.shopButtonText}>Shop</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.heartButton} onPress={onRemove}>
        <Ionicons name="heart" size={20} color="#F83758" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 130,
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: "#F3F1EE",
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },
  description: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
    lineHeight: 16,
  },
  price: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222",
    marginTop: 6,
  },
  shopButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#F83758",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
    gap: 6,
  },
  shopButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  heartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
});
