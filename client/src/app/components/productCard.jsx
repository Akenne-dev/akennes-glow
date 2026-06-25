

import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useWishlist } from "../../lib/wishlistStore";
import Toast from "./Toast";

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product._id);
  const [toast, setToast] = useState({ visible: false, message: "", variant: "added" });

  const handleToggleWishlist = async () => {
    try {
      const nowWishlisted = await toggleWishlist(product);
      setToast({
        visible: true,
        message: nowWishlisted ? "Added to Wishlist" : "Removed from Wishlist",
        variant: nowWishlisted ? "added" : "removed",
      });
    } catch (error) {
      console.error("Failed to update wishlist", error);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <TouchableOpacity style={styles.heartButton} onPress={handleToggleWishlist}>
        <Ionicons
          name={wishlisted ? "heart" : "heart-outline"}
          size={18}
          color="#F83758"
        />
      </TouchableOpacity>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.desc} numberOfLines={2}>
        {product.description}
      </Text>
      <Text style={styles.price}>₦{product.price}</Text>

      <Toast
        visible={toast.visible}
        message={toast.message}
        variant={toast.variant}
        onHide={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    // Remove width and marginBottom here!
    flex: 1, // Let it fill the wrapper provided by FlatList
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3, // Increased elevation for a better "pop"
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: "100%", height: 120, backgroundColor: "#eee" },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingTop: 10,
    color: "#000",
  },
  desc: {
    fontSize: 11,
    color: "#000000",
    paddingHorizontal: 10,
    paddingTop: 2,
    lineHeight: 14,
  },
  price: {
    fontWeight: "700",
    fontSize: 14,
    color: "#000",
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 4,
  },
});