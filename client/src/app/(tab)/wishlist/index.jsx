import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useWishlist } from "../../../lib/wishlistStore";
import WishlistCard from "../../components/wishlistCard";
import Toast from "../../components/Toast";

export default function Wishlist() {
  const router = useRouter();
  const { products, status, toggleWishlist, refreshWishlist } = useWishlist();
  const [toast, setToast] = useState({ visible: false, message: "", variant: "removed" });

  useEffect(() => {
    refreshWishlist();
  }, []);

  const handleRemove = async (product) => {
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
    <LinearGradient colors={["#FFD9E3", "#FFF1F4", "#FDFBF9"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.header}>My Wishlist</Text>

        {status === "loading" && products.length === 0 ? (
          <ActivityIndicator size="large" color="#F83758" style={styles.loader} />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <WishlistCard
                product={item}
                onRemove={() => handleRemove(item)}
                onShop={() =>
                  router.push({ pathname: "/product-details", params: { id: item._id } })
                }
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="heart-outline" size={48} color="#D8CFC6" />
                <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
                <Text style={styles.emptySubtitle}>
                  Tap the heart on any product to save it here.
                </Text>
              </View>
            }
          />
        )}

        <Toast
          visible={toast.visible}
          message={toast.message}
          variant={toast.variant}
          onHide={() => setToast((t) => ({ ...t, visible: false }))}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    fontSize: 24,
    fontWeight: "800",
    color: "#222",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 32,
  },
  loader: { marginTop: 60 },
  listContent: { paddingHorizontal: 16, paddingBottom: 30 },
  emptyState: {
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#444",
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#999",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
  },
});
