// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   Image,
//   StyleSheet,
//   FlatList,
//   Text,
//   ActivityIndicator,
//   RefreshControl,
//   TouchableOpacity,
//   Platform,
// } from "react-native";
// import axios from "axios";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import ProductCard from "../../components/productCard";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRouter } from "expo-router";

// // 1. Define the data
// const categories = [
//   {
//     id: "beauty",
//     name: "Beauty",
//     image: require("../../../../assets/images/beauty1.jpg"),
//   },
//   {
//     id: "fashion",
//     name: "Fashion",
//     image: require("../../../../assets/images/fashion.jpg"),
//   },
//   {
//     id: "kids",
//     name: "Kids",
//     image: require("../../../../assets/images/kids.jpg"),
//   },
//   {
//     id: "mens",
//     name: "Mens",
//     image: require("../../../../assets/images/mens.jpg"),
//   },
//   {
//     id: "womens",
//     name: "Womens",
//     image: require("../../../../assets/images/womens.jpg"),
//   },

//   // ... add others
// ];

// export default function Home() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const router = useRouter();

//   const fetchData = async () => {
//     try {
//       const res = await axios.get("http://192.168.0.124:4000/api/home");
//       setAllProducts(res.data);
//       setFilteredProducts(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchData();
//   };

//   const handleSearch = (text) => {
//     setSearch(text);
//     const filtered = allProducts.filter((item) =>
//       item.name.toLowerCase().includes(text.toLowerCase()),
//     );
//     setFilteredProducts(filtered);
//   };

//   if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         {/* Top Header */}
//         <View style={styles.header}>
//           {/* <Ionicons name="menu" size={28} color="#000" /> */}
//           <Ionicons name="menu" size={28} color="#F9F9F9" />
//           <Image
//             source={require("../../../../assets/images/brand-logo.png")}
//             style={styles.brandLogo}
//             resizeMode="cover"
//           />
//           <Image
//             source={{
//               uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtewrMVxSZoxaTQuDNqE9OzLNZ5fcsvGBUZpJspho4HA&s=10",
//             }}
//             style={styles.profile}
//           />
//         </View>

//         {/* Search Bar with Shadow */}
//         <View style={styles.searchContainer}>
//           <Ionicons name="search" size={20} color="gray" />
//           <TextInput
//             style={styles.searchBar}
//             placeholder="Search any Product.."
//             value={search}
//             onChangeText={handleSearch}
//             placeholderTextColor="gray"
//           />
//           <Ionicons name="mic" size={20} color="gray" />
//         </View>

//         {/* Featured Row */}
//         <View style={styles.featuredRow}>
//           <Text style={styles.featuredText}>All Featured</Text>
//           <View style={styles.actionButtons}>
//             <TouchableOpacity style={styles.btn}>
//               <Text>
//                 Sort <Ionicons name="swap-vertical" />
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.btn}>
//               <Text>
//                 Filter <Ionicons name="filter" />
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <FlatList
//           data={filteredProducts}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => <ProductCard product={item} />}
//           numColumns={2}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//           ListEmptyComponent={
//             <Text style={styles.noMatch}>Matches not found!</Text>
//           }
//         />

//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeContainer: {
//     flex: 1,
//     backgroundColor: "#F9F9F9",
//   },
//   container: {
//     backgroundColor: "#F9F9F9",
//     flex: 1,
//     paddingHorizontal: 10,
//       paddingTop: 11,
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   brandLogo: { width: 190, height: 40 },
//   profile: { width: 50, height: 50, borderRadius: 25 },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     height: 44,
//     marginBottom: 15,
//     // Shadow for iOS
//     shadowColor: "#000000c1",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     // Elevation for Android
//     elevation: 5,
//   },
//   searchBar: { flex: 1, paddingHorizontal: 10 },
//   featuredRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//     marginTop: 5,
//   },
//   featuredText: { fontSize: 18, fontWeight: "bold" },
//   actionButtons: { flexDirection: "row", gap: 10 },
//   btn: {
//     flexDirection: "row",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 8,
//     borderRadius: 5,
//   },
//   noMatch: { textAlign: "center", marginTop: 50, color: "gray" },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Platform,
} from "react-native";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProductCard from "../../components/productCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// 1. Define the data
const categories = [
  {
    id: "beauty",
    name: "Beauty",
    image: require("../../../../assets/images/beauty1.jpg"),
  },
  {
    id: "fashion",
    name: "Fashion",
    image: require("../../../../assets/images/fashion.jpg"),
  },
  {
    id: "kids",
    name: "Kids",
    image: require("../../../../assets/images/kids.jpg"),
  },
  {
    id: "mens",
    name: "Mens",
    image: require("../../../../assets/images/mens.jpg"),
  },
  {
    id: "womens",
    name: "Womens",
    image: require("../../../../assets/images/womens.jpg"),
  },
];

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await axios.get("http://192.168.0.124:4000/api/home");
      setAllProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = allProducts.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          {/* <Ionicons name="menu" size={28} color="#000" /> */}
          <Ionicons name="menu" size={28} color="#F9F9F9" />
          <Image
            source={require("../../../../assets/images/brand-logo.png")}
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

        {/* Search Bar with Shadow */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            style={styles.searchBar}
            placeholder="Search any Product.."
            value={search}
            onChangeText={handleSearch}
            placeholderTextColor="gray"
          />
          <Ionicons name="mic" size={20} color="gray" />
        </View>

        {/* Featured Row */}
        <View style={styles.featuredRow}>
          <Text style={styles.featuredText}>All Featured</Text>
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

        {/* Categories Row */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ alignItems: "center", marginRight: 20 }}
              onPress={() => router.push(`/category/${item.id}`)}
            >
              <Image
                source={item.image}
                style={{ width: 62, height: 62, borderRadius: 30 }}
              />
              <Text style={{ marginTop: 5 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <FlatList
        key={2}
          data={filteredProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCard product={item} />}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.noMatch}>Matches not found!</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  container: {
    backgroundColor: "#F9F9F9",
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 11,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  brandLogo: { width: 190, height: 40 },
  profile: { width: 50, height: 50, borderRadius: 25 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 44,
    marginBottom: 15,
    // Shadow for iOS
    shadowColor: "#000000c1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  searchBar: { flex: 1, paddingHorizontal: 10 },
  featuredRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 5,
  },
  featuredText: { fontSize: 18, fontWeight: "bold" },
  actionButtons: { flexDirection: "row", gap: 10 },
  btn: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 5,
  },
  noMatch: { textAlign: "center", marginTop: 50, color: "gray" },
});