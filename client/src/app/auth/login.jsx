import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data) {
    try {
      const response = await axios.post(
        "http://192.168.0.124:4000/api/auth/login",
        data,
      );
      Alert.alert("Success", "Logged in successfully!");
      router.push("/home"); // Adjust to your actual home route
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error?.response?.data?.error || "Invalid credentials",
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Welcome Back!</Text>

        {/* Email/Username */}
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email or Username is required" }}
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
                  placeholder="Username or Email"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
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
          rules={{ required: "Password is required" }}
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

        <TouchableOpacity onPress={() => router.push("/auth/forgot-password")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Text style={styles.orText}>- OR Continue with -</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            onPress={() => Alert.alert("Google Auth", "Coming soon!")}
          >
            <Ionicons name="logo-google" size={30} color="#DB4437" />
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Create An Account?{" "}
          <Link href="/auth/register" style={styles.linkText}>
            Sign Up
          </Link>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { padding: 24, justifyContent: "center", flexGrow: 1, marginBottom: 120 },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 40,  },
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
  forgotPassword: {
    textAlign: "right",
    color: "#FF3B30",
    marginBottom: 20,
    fontWeight: "600",
  },
  errorText: { color: "red", fontSize: 12, marginTop: 4, marginLeft: 4 },
  button: {
    backgroundColor: "#FF3B30",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  orText: { textAlign: "center", marginVertical: 30, color: "#666" },
  socialContainer: { alignItems: "center" },
  footerText: { textAlign: "center", marginTop: 20 },
  linkText: { color: "#FF3B30", fontWeight: "700" },
});
