

import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useWishlist } from "../../lib/wishlistStore";
import { useCart } from "../../lib/cartStore";
import Toast from "./Toast";

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const wishlisted = isWishlisted(product._id);
  const [toast, setToast] = useState({ visible: false, message: "", variant: "added" });

  const rating = product.rating || 0;
  const discountPercent = product.discountPercent || 0;
  const discountedPrice =
    discountPercent > 0
      ? Math.round(product.price * (1 - discountPercent / 100))
      : null;

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

  const handleAddToCart = () => {
    addToCart(product);
    setToast({ visible: true, message: "Added to Cart", variant: "cart" });
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

      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={12}
            color="#F5A623"
          />
        ))}
      </View>

      <View style={styles.priceRow}>
        {discountedPrice !== null ? (
          <>
            <Text style={styles.originalPrice}>₦{product.price}</Text>
            <Text style={styles.price}>₦{discountedPrice}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>-{discountPercent}%</Text>
            </View>
          </>
        ) : (
          <Text style={styles.price}>₦{product.price}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
        <Ionicons name="cart-outline" size={14} color="#fff" />
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>

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
  ratingRow: {
    flexDirection: "row",
    gap: 2,
    paddingHorizontal: 10,
    paddingTop: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingTop: 4,
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  price: {
    fontWeight: "700",
    fontSize: 14,
    color: "#000",
  },
  discountBadge: {
    backgroundColor: "#F83758",
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  discountBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#F4811F",
    marginHorizontal: 10,
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 7,
  },
  cartButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
});