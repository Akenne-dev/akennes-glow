import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../lib/api";
import { useRouter, useSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";

const ResetSchema = Yup.object().shape({
  password: Yup.string().min(6, "Too short").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export default function ResetPassword() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params?.token;

  async function handleReset(values, { setSubmitting }) {
    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        password: values.password,
      });
      const jwt = res.data.token;
      if (jwt) await SecureStore.setItemAsync("authToken", jwt);
      Alert.alert("Success", "Your password has been reset");
      router.push("/auth/login");
    } catch (err) {
      Alert.alert(
        "Error",
        err?.response?.data?.error || "Unable to reset password",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={ResetSchema}
        onSubmit={handleReset}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="New password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              secureTextEntry
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <Pressable
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSubmitting || !token}
            >
              <Text style={styles.buttonText}>Set New Password</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#6f42c1",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
  error: { color: "#d9534f", marginBottom: 8 },
});
