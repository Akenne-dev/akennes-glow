import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";

export default function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [validationError, setValidationError] = useState("");

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

  // Inside ForgotPassword.jsx, update onSubmit:
async function onSubmit(data) {
  setValidationError(""); // Reset error
  try {
    setLoading(true);
    await axios.post(
      "http://192.168.0.124:4000/api/auth/forgot-password",
      data,
    );

    // Success: Navigate
    router.push({
      pathname: "/auth/enter-code",
      params: { email: data.email },
    });
  } catch (error) {
    // If the server returns 404, show it as red text below the input
    if (error.response?.status === 404) {
      setValidationError("Invalid email address");
    } else {
      showNotification("Error sending email", "error");
    }
  } finally {
    setLoading(false);
  }
}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      {/* Toast Notification */}
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

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Forgot Password?</Text>

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputRow}>
              <Ionicons
                name="mail-sharp"
                size={20}
                color="gray"
                style={{ marginRight: 10 }}
              />
              <TextInput
                style={styles.inputFlex}
                placeholder="Enter your email address"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  setValidationError(""); // Clear red text as they type
                }}
                autoCapitalize="none"
                placeholderTextColor="gray"
                keyboardType="email-address"
              />
            </View>
          )}
        />
        {/* {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )} */}

        {/* --- PLACE IT RIGHT HERE --- */}
        {validationError ? (
          <Text style={{ color: "#F83758", marginTop: 5 }}>{validationError}</Text>
        ) : (
          errors.email && (
            <Text style={{ color: "#F83758", marginTop: 5 }}>
              {errors.email.message}
            </Text>
          )
        )}

        <Text style={styles.note}>
          {/* * We will send you a message to reset your password */}
          If the email is registered, you will receive a code"** message.
        </Text>

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  toast: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    zIndex: 1000,
  },
  toastText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  scrollContainer: { padding: 24, marginTop: 50 },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 30, marginTop: 80 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#F9F9F9",
  },
  inputFlex: { flex: 1 },
  note: { color: "gray", fontSize: 12, marginTop: 10 },
  button: {
    backgroundColor: "#F83758",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  errorText: {
    color: "#F83758",
    marginTop: 8,
    marginLeft: 8,
    fontSize: 13,
  },
});
