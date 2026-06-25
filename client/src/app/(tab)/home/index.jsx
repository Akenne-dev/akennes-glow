import React, { useState, useEffect, useRef } from "react";
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
} from "react-native";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProductCard from "../../components/productCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "../../../lib/api";

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
      const res = await axios.get(`${API_BASE_URL}/home`);
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
  if (text === "") {
    setFilteredProducts(allProducts);
  } else {
    const filtered = allProducts.filter((item) => {
      const productName = item.name?.toLowerCase() || "";
      const productCategory = item.category?.toLowerCase() || ""; // Assuming your backend provides 'category'
      const searchQuery = text.toLowerCase();

      return (
        productName.includes(searchQuery) ||
        productCategory.includes(searchQuery)
      );
    });
    setFilteredProducts(filtered);
  }
};

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  const DealsOfTheWeek = ({ onPress }) => {
    const [timeLeft, setTimeLeft] = useState(7 * 24 * 60 * 60); // 7 days in seconds

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }, []);


    // TIME Deal
    const formatTime = (seconds) => {
      const d = Math.floor(seconds / (3600 * 24));
      const h = Math.floor((seconds % (3600 * 24)) / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${d}d ${h}h ${m}m ${s}s`;
    };

    return (
      // DEALS
      <TouchableOpacity style={styles.dealContainer} onPress={onPress}>
        <View>
          <Text style={styles.dealTitle}>Deal of the Week</Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
          >
            <Ionicons name="alarm-outline" size={16} color="#fff" />
            <Text style={styles.timerText}>
              {formatTime(timeLeft)} remaining
            </Text>
          </View>
        </View>
        <View style={styles.viewAllBtn}>
          <Text style={{ color: "#007bff", fontWeight: "bold" }}>
            View all →
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // SPECIAL OFFERS
  const SpecialOffers = () => {
    return (
      <TouchableOpacity style={styles.specialContainer}>
        <Image
          source={require("../../../../assets/images/special.png")} // Update this path
          style={styles.specialLogo}
        />
        <View style={styles.specialTextContainer}>
          <Text style={styles.specialTitle}>Special Offers 😱</Text>
          <Text style={styles.specialDesc}>
            We make sure you get the {"\n"}offer you need at best prices
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // SECOND HORIZONTAL SCROLLING SECTION
  const HorizontalProductSection = ({ title, products }) => {
    const flatListRef = useRef(null);

    const scrollRight = () => {
      // Scrolls 200px forward; adjust as needed for your card width
      flatListRef.current?.scrollToOffset({ offset: 200, animated: true });
    };

    return (
      <View style={{ marginVertical: 15 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 15,
            marginBottom: 10,
          }}
        >
          {title}
        </Text>
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={products}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            // Fixed width ensures the card doesn't stretch
            <View style={{ width: 160, marginHorizontal: 5 }}>
              <ProductCard product={item} />
            </View>
          )}
        />

        {/* The Arrow Icon */}
        <TouchableOpacity style={styles.arrowButton} onPress={scrollRight}>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.staticHeaderContainer}>
        <View style={styles.header}>
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

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginRight: 20,
                marginBottom: 15,
              }}
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
      </View>

      {/* --- PRODUCTS SECTION WITH UPDATED SPACING --- */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item._id}
        numColumns={2}
        ListHeaderComponent={
            <View style={{ marginBottom: 10 }}>
              {/* 1. Clickable Banner Image */}
              <TouchableOpacity
                onPress={() => router.push("/percent-off-page")}
              >
                <Image
                  source={require("../../../../assets/images/percent.png")}
                  style={styles.banner}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              {/* 2. Deals of the Week Section */}
              <DealsOfTheWeek
                onPress={() => router.push("/deals-of-the-week")}
              />

              {/* New Dynamic Horizontal Section */}
              <HorizontalProductSection
                title="Suggested"
                // Take the first 5 products
                products={allProducts.slice(0, 5)}
              />
            </View>
        }

        ListFooterComponent={() =>
            <View style={{ marginBottom: 50 }}>
              <TouchableOpacity>
                <SpecialOffers />
              </TouchableOpacity>

              {/* Second section (Your new clickable image) */}
              <TouchableOpacity
                onPress={() => console.log("Second Image Clicked")}
                style={{ marginTop: 15 }}
              >
                <Image
                  source={require("../../../../assets/images/mac.png")}
                  style={{
                    width: "100%",
                    height: 180,
                    borderRadius: 10,
                    shadowColor: "#000000be",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.trend}>
                <View>
                  <Text style={styles.trendText}>Trending Products</Text>
                </View>
                <View style={styles.trendbtn}>
                  <Text style={{ color: "#f83758", fontWeight: "bold" }}>
                    View all →
                  </Text>
                </View>
              </TouchableOpacity>

              <HorizontalProductSection
                title="More to Explore"
                products={[...allProducts]
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 5)}
              />

              {/* New Arrivals Section */}
              <View style={styles.newArrivalsContainer}>
                <Image
                  source={require("../../../../assets/images/summer.png")} // Use your image
                  style={styles.newArrivalsBanner}
                />
                <View style={styles.newArrivalsContent}>
                  <View>
                    <Text style={styles.newArrivalsTitle}>New Arrivals</Text>
                    <Text style={styles.newArrivalsSubtitle}>
                      Summer '{new Date().getFullYear().toString().slice(-2)}{" "}
                      Collections
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.viewAllBtns}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      View all →
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sponsored Section */}
              <View style={styles.sponsoredContainer}>
                <Text style={styles.sponsoredTitle}>Sponserd</Text>
                <TouchableOpacity>
                  <Image
                    source={require("../../../../assets/images/deck-shoe.jpg")}
                    style={styles.sponsoredImage}
                  />
                  <View style={styles.sponsoredOverlay}>
                    <Text style={styles.sponsoredDiscount}> ~ UP TO ~ </Text>
                    <Text style={styles.sponsoredPercent}>50% OFF</Text>
                  </View>
                  <View style={styles.sponsoredFooter}>
                    <Text style={styles.sponsoredFooterText}>
                      {" "}
                      up to 50% Off{" "}
                    </Text>
                    <Ionicons name="chevron-forward" size={20} color="#000" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
        }
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.noMatch}>Matches not found!</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "#F9F9F9" },
  staticHeaderContainer: { paddingHorizontal: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
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
    shadowColor: "#000000c1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    backgroundColor: "#fff",
  },
  noMatch: { textAlign: "center", marginTop: 50, color: "gray" },

  row: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  cardWrapper: {
    width: "47%",
    marginBottom: 15,
  },
  banner: {
    width: "100%",
    height: 170,
    borderRadius: 15,
    marginBottom: 15,
  },
  banners: {
    width: "100%",
    height: 270,
    borderRadius: 15,
    marginBottom: 15,
  },
  dealContainer: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  dealTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  timerText: { color: "#fff", marginLeft: 5, fontSize: 12 },
  viewAllBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  trend: {
    backgroundColor: "#f83758",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 25,
  },
  trendText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  trendbtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  specialContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 15,
    // Add shadow to match your UI
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  specialLogo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  specialTextContainer: {
    flex: 1,
  },
  specialTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  specialDesc: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  arrowButton: {
    position: "absolute",
    right: 10,
    top: "55%", // Adjust based on your text title height
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1, // Ensures it stays on top of the list
  },
  newArrivalsContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  newArrivalsBanner: {
    width: "100%",
    height: 190,
  },
  newArrivalsContent: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  newArrivalsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  newArrivalsSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  viewAllBtns: {
    backgroundColor: "#ff4d6d", // Match your brand color
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sponsoredContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sponsoredTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sponsoredImage: {
    width: "100%",
    height: 300,
    borderRadius: 15,
  },
  sponsoredOverlay: {
    position: "absolute",
    top: 40,
    width: "100%",
    alignItems: "center",
  },
  sponsoredDiscount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  sponsoredPercent: {
    color: "#fff",
    fontSize: 45,
    fontWeight: "bold",
  },
  sponsoredFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  sponsoredFooterText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});