import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../../lib/api";

export default function EnterCode() {
  const router = useRouter();
  const { email } = useLocalSearchParams(); // Pass email from ForgotPassword
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const fadeAnim = useState(new Animated.Value(0))[0];

  const showNotification = (message, type) => {
    setNotification({ message, type });
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  async function verifyCode() {
    if (code.length !== 6) {
      showNotification("Please enter a 6-digit code", "error");
      return;
    }
    try {
      setLoading(true);
      // Verify code with backend
      const response = await api.post("/auth/verify-reset-code", {
        email,
        code,
      });
      // Navigate to ResetPassword with the code as a parameter
      router.push({ pathname: "/auth/reset-password", params: { code } });
    } catch (error) {
      showNotification("Invalid or expired code", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.toast,
          {
            opacity: fadeAnim,
            backgroundColor:
              notification.type === "error" ? "#F83758" : "#4CAF50",
          },
        ]}
      >
        <Text style={styles.toastText}>{notification.message}</Text>
      </Animated.View>

      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Enter Code</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to your email.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="000000"
          keyboardType="numeric"
          maxLength={6}
          value={code}
          onChangeText={setCode}
          placeholderTextColor="gray"
        />

        <Pressable
          style={styles.button}
          onPress={verifyCode}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify Code</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 24, marginTop: 50 },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 10, marginTop: 80},
  subtitle: { color: "gray", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    textAlign: "center",
    letterSpacing: 5,
  },
  button: {
    backgroundColor: "#F83758",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  toast: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    zIndex: 1000,
  },
  toastText: { color: "#fff", textAlign: "center" },
});
