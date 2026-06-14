// import { useLocalSearchParams } from "expo-router";
// import { View, FlatList, Text } from "react-native";
// import axios from "axios";
// import ProductCard from "../components/productCard";
// import { useEffect, useState } from "react";
// export default function CategoryPage() {
//   const { id } = useLocalSearchParams(); // This gets 'beauty', 'kids', etc.
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Backend will filter by this ID
//     axios
//       .get(`http://192.168.0.124:4000/api/products?category=${id}`)
//       .then((res) => setProducts(res.data));
//   }, [id]);

//   return (
//     <View style={{ flex: 1, paddingTop: 50 }}>
//       <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 20 }}>
//         {id}
//       </Text>
//       <FlatList
//         data={products}
//         renderItem={({ item }) => <ProductCard product={item} />}
//         numColumns={2}
//       />
//     </View>
//   );
// }

import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import axios from "axios";
import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CategoryPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://192.168.0.124:4000/api/products?category=${id}`)
      .then((res) => setProducts(res.data));
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header: Back Button, Logo, Profile */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>

        <Image
          source={require("../../../assets/images/brand-logo.png")}
          style={styles.brandLogo}
          resizeMode="cover"
        />

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
        />
        <Ionicons name="mic" size={20} color="gray" />
      </View>

      {/* 3. Sort & Filter */}
      <View style={styles.featuredRow}>
        <Text style={styles.featuredText}>{products.length} Items</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.btn}>
            <Text>
              Sort <Ionicons name="swap-vertical" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text>
              Filter <Ionicons name="filter" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. Product List */}
      <FlatList
        key={2}
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        ListEmptyComponent={
          <Text style={styles.noMatch}>No products found.</Text>
        }
      />
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
  brandLogo: { width: 140, height: 35 }, // Adjusted size to fit
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
  },
  searchBar: { flex: 1, paddingHorizontal: 10 },
  featuredRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  featuredText: { fontSize: 16, fontWeight: "bold" },
  actionButtons: { flexDirection: "row", gap: 10 },
  btn: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  noMatch: { textAlign: "center", marginTop: 50, color: "gray" },
});