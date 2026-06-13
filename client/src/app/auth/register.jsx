import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notification State
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
      Animated.delay(4400),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(data) {
    if (data.password !== data.confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }
    try {
      await axios.post("http://192.168.0.124:4000/api/auth/register", data);
      showNotification("Account created successfully!", "success");
      setTimeout(() => router.push("/auth/login"), 4000);
    } catch (error) {
      showNotification(
        error?.response?.data?.error || "Unable to connect",
        "error",
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      {/* Toast Notification Dropdown */}
      <Animated.View
        style={[
          styles.toast,
          {
            opacity: fadeAnim,
            backgroundColor:
              notification.type === "error" ? "#ffffff" : "#FFFFFF",
          },
        ]}
      >
        <Text style={styles.toastText}>{notification.message}</Text>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create an account</Text>

        {/* Username */}
        <Controller
          control={control}
          name="name"
          rules={{ required: "Username is required" }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputWrapper}>
              <View style={styles.inputRow}>
                <Ionicons
                  name="person-sharp"
                  size={20}
                  color="gray"
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  style={styles.inputFlex}
                  placeholder="Username"
                  value={value}
                  onChangeText={onChange}
                />
              </View>
              {errors.name && (
                <Text style={styles.errorText}>{errors.name.message}</Text>
              )}
            </View>
          )}
        />

        {/* Email */}
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
          }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputWrapper}>
              <View style={styles.inputRow}>
                <Ionicons
                  name="mail-sharp"
                  size={20}
                  color="gray"
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  style={styles.inputFlex}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>
          )}
        />

        {/* Password */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: { value: 6, message: "Min 6 characters" },
          }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputWrapper}>
              <View style={styles.inputRow}>
                <Ionicons
                  name="lock-closed-sharp"
                  size={20}
                  color="gray"
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  style={styles.inputFlex}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={value}
                  onChangeText={onChange}
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
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />

        {/* Confirm Password */}
        {/* <Controller
          control={control}
          name="confirmPassword"
          rules={{ required: "Please confirm your password" }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputWrapper}>
              <View style={styles.inputRow}>
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
              {errors.confirmPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          )}
        /> */}

        {/* Confirm Password */}
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === control._formValues.password ||
              "Passwords do not match",
          }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputWrapper}>
              <View style={styles.inputRow}>
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
              {errors.confirmPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          )}
        />

        <Text style={styles.disclaimer}>
          By clicking the <Text style={{ color: "red" }}>Register</Text> button,
          you agree to the public offer
        </Text>

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>

        <Text style={styles.orText}>- OR Continue with -</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            onPress={() =>
              showNotification("Google Auth coming soon!", "error")
            }
          >
            <Ionicons name="logo-google" size={30} color="#DB4437" />
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          I Already Have an Account?{" "}
          <Link href="/auth/login" style={styles.linkText}>
            Login
          </Link>
        </Text>
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
    // borderRadius: 10,
    zIndex: 1000,
    fontSize: 26,
  },
  fontSize: 26,
  toastText: { color: "#DB4437", textAlign: "center", fontWeight: "bold", fontSize: 24 },
  scrollContainer: {
    padding: 24,
    justifyContent: "center",
    flexGrow: 1,
    marginTop: 40,
  },
  title: { fontSize: 28, fontWeight: "800", marginBottom: 30 },
  inputWrapper: { marginBottom: 16 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F9F9F9",
  },
  inputFlex: { flex: 1, paddingVertical: 16 },
  errorText: { color: "red", fontSize: 12, marginTop: 4, marginLeft: 4 },
  disclaimer: { fontSize: 12, color: "#666", marginBottom: 20 },
  button: {
    backgroundColor: "#FF3B30",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  orText: { textAlign: "center", marginVertical: 30, color: "#666" },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    marginHorizontal: 80,
  },
  footerText: { textAlign: "center", marginTop: 20 },
  linkText: { color: "#FF3B30", fontWeight: "700" },
});
