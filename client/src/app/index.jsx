import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const slides = [
  { id: "0", type: "logo" }, // Slide 1: Logo
  {
    id: "1",
    title: "Choose Products",
    subtitle:
      "Browse our curated, professional-grade range. Select the essentials that fit your lifestyle.",
    img: require("../../assets/images/render1.png"),
  },
  {
    id: "2",
    title: "Make Payment",
    subtitle:
      "Complete your purchase with confidence. Fast, encrypted, and stress-free checkout",
    img: require("../../assets/images/render3.jpg"),
  },
  {
    id: "3",
    title: "Get Your Order",
    subtitle:
      "Your beauty favorites are on their way. Track your package straight to your door",
    img: require("../../assets/images/render4.png"),
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const router = useRouter();

  // Auto-transition logo after 6 seconds
  useEffect(() => {
    if (currentIndex === 0) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: 1, animated: true });
        setCurrentIndex(1);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);


  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex === 3) {
      // ONLY push when they reach the last slide
      router.push("/auth/register");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
      setCurrentIndex(currentIndex - 1);
    }
  };


    // DO NOT show the "Skip" button on the first slide, and instead of skipping to the last slide, it should navigate to the registration screen immediately. This encourages users to engage with the onboarding content while still providing a clear path to registration if they choose to skip.
  // const handleSkip = () => {
  //   const finalIndex = slides.length - 1;
  //   flatListRef.current?.scrollToIndex({ index: finalIndex, animated: true });
  //   setCurrentIndex(finalIndex);
  // };

    const handleSkip = () => {
router.push("/auth/register");
    };

  const renderItem = ({ item, index }) => (
    <View style={styles.slide}>
      {index === 0 ? (
        <Image
          source={require("../../assets/images/brand-logo.png")}
          style={styles.logo}
        />
      ) : (
        <>
          <Image source={item.img} style={styles.illustration} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}
      {currentIndex !== 0 && (
        <View style={styles.headerContainer}>
          <Text style={styles.pageCounter}>
            <Text style={styles.counterActive}>{currentIndex}</Text>
            <Text style={styles.counterTotal}>{`/${slides.length - 1}`}</Text>
          </Text>
          {currentIndex !== slides.length - 1 ? (
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.skipPlaceholder} />
          )}
        </View>
      )}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) =>
          setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Footer Logic: Only show on slides 1, 2, 3 */}
      {currentIndex !== 0 && (
        <View style={styles.footer}>
          {/* Only show 'Prev' if we are not on the first active slide (slide 1) */}
          {currentIndex > 1 ? (
            <TouchableOpacity onPress={handlePrev}>
              <Text style={styles.prevText}>Prev</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 40 }} /> // Spacer to keep the layout balanced
          )}

          <View style={styles.progressBarContainer}>
            {[1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  currentIndex === i ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.nextText}>
              {currentIndex === 3 ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  slide: { width, alignItems: "center", justifyContent: "center", padding: 20 },
  logo: { width: 470, height: 470, resizeMode: "contain" }, // Big and Bold
  illustration: { width: 300, height: 300, resizeMode: "contain" },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 40 },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginTop: 10,
    lineHeight: 25,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  pageCounter: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  counterActive: {
    color: "#111",
    fontWeight: "800",
  },
  counterTotal: {
    color: "#888",
    fontWeight: "600",
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 17,
    fontWeight: "600",
    color: "black",
  },
  skipPlaceholder: { width: 56 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
  },
  nextText: { color: "red", fontSize: 16, fontWeight: "bold" },
  prevText: { color: "black", fontSize: 16 },
  disabled: { color: "grey", fontSize: 16 },
  progressBarContainer: { flexDirection: "row" },
  dot: { width: 20, height: 8, marginHorizontal: 4, borderRadius: 4 },
  activeDot: { backgroundColor: "black" },
  inactiveDot: { backgroundColor: "grey" },
});
