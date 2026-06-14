import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// Ensure the path to your image is correct
const GetStartedImage = require("../../assets/images/started1.jpg");

export default function GetStarted() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Image positioned absolutely to fill the screen */}
      <Image
        source={GetStartedImage}
        style={styles.absoluteImage}
        resizeMode="cover"
      />

      {/* Dark Overlay to make text pop */}
      <View style={styles.darkOverlay} />

      {/* Content */}
      <SafeAreaView style={styles.contentContainer}>
        <Text style={styles.title}>
          You want{"\n"}Authentic, here{"\n"}you go!
        </Text>

        <Text style={styles.subtitle}>Find it here, buy it now!</Text>

        <Pressable
          style={styles.button}
          onPress={() => router.replace("/(tab)/home")}
        >
          <Text style={styles.buttonText}>Let's Go</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  absoluteImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  darkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.23)",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 60,
    paddingHorizontal: 25,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  subtitle: {
    color: "white",
    fontSize: 14,
    marginTop: 20,
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#F83758",
    paddingVertical: 20,
    borderRadius: 9,
    width: "83%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
});
