import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { API_BASE_URL } from "../../lib/api";

export default function CategoryPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/products?category=${id}`)
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.categoryTitle}>
          {id ? id.charAt(0).toUpperCase() + id.slice(1) : "Category"}
        </Text>

        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtewrMVxSZoxaTQuDNqE9OzLNZ5fcsvGBUZpJspho4HA&s=10",
          }}
          style={styles.profile}
        />
      </View>

      {/* 2. Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          style={styles.searchBar}
          placeholder="Search in category.."
          placeholderTextColor="gray"
          value={search}
          onChangeText={handleSearch}
        />
        <Ionicons name="mic" size={20} color="gray" />
      </View>

      {/* 3. Item Count (Only shows during search) */}
      {search.length > 0 && (
        <View style={styles.featuredRow}>
          <Text style={styles.featuredText}>
            {filteredProducts.length} Items Found
          </Text>
        </View>
      )}

      {/* 4. Product List */}
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item._id || item.name}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProductCard product={item} />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          ListEmptyComponent={
            <Text style={styles.noMatch}>Matches not found!</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", paddingHorizontal: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#F83758",
  },
  profile: { width: 45, height: 45, borderRadius: 25 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 44,
    marginBottom: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchBar: { flex: 1, paddingHorizontal: 10 },
  featuredRow: {
    marginBottom: 15,
  },
  featuredText: { fontSize: 16, fontWeight: "bold" },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 5, // Small padding on the sides of the row
  },
  cardWrapper: {
    width: "47%", // Slightly less than 50% to leave a tiny gap
    marginBottom: 15,
  },
  noMatch: {
    textAlign: "center",
    marginTop: 50,
    color: "#F83758",
    fontSize: 16,
  },
});