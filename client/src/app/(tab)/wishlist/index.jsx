import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from "react-native";
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
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    refreshWishlist();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshWishlist();
    setRefreshing(false);
  };

  const filteredProducts =
    search.trim() === ""
      ? products
      : products.filter((item) =>
          item.name?.toLowerCase().includes(search.toLowerCase())
        );

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
        <StatusBar barStyle="dark-content" />
        <Text style={styles.header}>My Wishlist</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            style={styles.searchBar}
            placeholder="Search your wishlist.."
            placeholderTextColor="gray"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {status === "loading" && products.length === 0 ? (
          <ActivityIndicator size="large" color="#F83758" style={styles.loader} />
        ) : (
          <FlatList
            style={styles.list}
            data={filteredProducts}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
                <Text style={styles.emptyTitle}>
                  {search.trim() === "" ? "Your wishlist is empty" : "No matches found"}
                </Text>
                <Text style={styles.emptySubtitle}>
                  {search.trim() === ""
                    ? "Tap the heart on any product to save it here."
                    : "Try a different search term."}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 44,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  searchBar: { flex: 1, paddingHorizontal: 10 },
  loader: { marginTop: 60 },
  list: { flex: 1 },
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
