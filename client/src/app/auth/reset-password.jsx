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
  Modal,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_BASE_URL } from "../../lib/api";

export default function ResetPassword() {
  const { token } = useLocalSearchParams(); // Gets token from URL
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); // Success Modal state

  const [notification, setNotification] = useState({ message: "", type: "" });
  const fadeAnim = useState(new Animated.Value(0))[0];
  const { code } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: { password: "", confirmPassword: "" },
  });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  async function onSubmit(data) {
    if (data.password !== data.confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        `${API_BASE_URL}/auth/reset-password/${code}`,
        {
          password: data.password,
        },
      );

      // Trigger success modal
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.replace("/auth/login");
      }, 7000);
      setLoading(false);
    } catch (error) {
      showNotification(error?.response?.data?.error || "Reset failed", "error");
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      {/* Success Modal */}
      <Modal transparent={true} visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              source={require("../../../assets/images/star.png")}
              style={styles.starIcon}
            />
            <Text style={styles.modalText}>Password reset successful!</Text>
          </View>
        </View>
      </Modal>

      <Animated.View
        style={[
          styles.toast,
          {
            opacity: fadeAnim,
            backgroundColor: "#ffffff",
          },
        ]}
      >
        <Text style={styles.toastText}>{notification.message}</Text>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Reset Password</Text>

        {/* Password Field */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be above 6 characters",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View>
              <View style={[styles.inputRow, error && { borderColor: "red" }]}>
                <Ionicons
                  name="lock-closed-sharp"
                  size={20}
                  color="gray"
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  style={styles.inputFlex}
                  placeholder="New Password"
                  secureTextEntry={!showPassword}
                  value={value}
                  onChangeText={onChange}
                  placeholderTextColor="gray"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-sharp" : "eye-sharp"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </View>
          )}
        />

        {/* Confirm Password Field */}
        <Controller
          control={control}
          name="confirmPassword"
          rules={{ required: "Password reset is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={{ marginTop: 15 }}>
              <View style={[styles.inputRow, error && { borderColor: "red" }]}>
                <Ionicons
                  name="lock-closed-sharp"
                  size={20}
                  color="gray"
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  style={styles.inputFlex}
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirmPassword}
                  value={value}
                  onChangeText={onChange}
                  placeholderTextColor="gray"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off-sharp" : "eye-sharp"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </View>
          )}
        />

        <Pressable
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Reset Password</Text>
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
  toastText: {
    color: "#F83758",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  scrollContainer: { padding: 24, marginTop: 50 },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 30, marginTop: 80 },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
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
  button: {
    backgroundColor: "#F83758",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.71)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 40,
    borderRadius: 20,
    alignItems: "center",
  },
  starIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
