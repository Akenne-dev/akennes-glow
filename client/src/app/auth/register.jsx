// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Pressable,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
//   TouchableOpacity,
//   Animated,
//   ActivityIndicator,
//   Modal,
//   Image,
//   ImageBackground
// } from "react-native";
// import { Link, useRouter } from "expo-router";
// import axios from "axios";
// import { useForm, Controller } from "react-hook-form";
// import { Ionicons } from "@expo/vector-icons";

// export default function Register() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showModal, setShowModal] = useState(false); // Modal state
//   const [showExistsModal, setShowExistsModal] = useState(false); // Exists Modal

//   // Notification State
//   const [notification, setNotification] = useState({ message: "", type: "" });
//   const fadeAnim = useState(new Animated.Value(0))[0];
//   const [loading, setLoading] = useState(false);

//   const showNotification = (message, type) => {
//     setNotification({ message, type });
//     Animated.sequence([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//       Animated.delay(4400),
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
//   });

// async function onSubmit(data) {
//   setLoading(true);
//   try {
//     await axios.post("http://192.168.0.124:4000/api/auth/register", data);

//     setShowModal(true);
//     setTimeout(() => {
//       setShowModal(false);
//       router.push("/auth/login");
//     }, 4000);
//     setLoading(false);
//   } catch (error) {
//     if (error?.response?.status === 409) {
//       setShowExistsModal(true); // Trigger the "Already Exists" modal
//     }
//     setLoading(false);
//   }

// }

//   return (
//     <ImageBackground
//       source={require("../../../assets/images/background.png")} // Update path to your image
//       style={styles.backgroundImage}
//     >
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <StatusBar barStyle="dark-content" />

//       {/* Success Modal */}
//       <Modal transparent={true} visible={showModal} animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {/* Make sure you have your star image in assets/image/star.png */}
//             <Image
//               source={require("../../../assets/images/star.png")}
//               style={styles.starIcon}
//             />
//             <Text style={styles.modalText}>Account created successfully!</Text>
//           </View>
//         </View>
//       </Modal>

//       {/* Already Exists Modal */}
//       <Modal transparent={true} visible={showExistsModal} animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Ionicons name="alert-circle" size={80} color="#F83758" />
//             <Text style={styles.modalText}>User already exists!</Text>
//             <Pressable
//               style={styles.button}
//               onPress={() => setShowExistsModal(false)}
//             >
//               <Text style={styles.buttonText}>Try Again</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>

//       {/* Toast Notification Dropdown */}
//       <Animated.View
//         style={[
//           styles.toast,
//           {
//             opacity: fadeAnim,
//             backgroundColor:
//               notification.type === "error" ? "#ffffff" : "#FFFFFF",
//           },
//         ]}
//       >
//         <Text style={styles.toastText}>{notification.message}</Text>
//       </Animated.View>

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>Create an account</Text>

//         {/* Username */}
//         <Controller
//           control={control}
//           name="name"
//           rules={{ required: "Username is required" }}
//           render={({ field: { onChange, value } }) => (
//             <View style={styles.inputWrapper}>
//               <View style={styles.inputRow}>
//                 <Ionicons
//                   name="person-sharp"
//                   size={20}
//                   color="gray"
//                   style={{ marginRight: 10 }}
//                 />
//                 <TextInput
//                   style={styles.inputFlex}
//                   placeholder="Username"
//                   value={value}
//                   onChangeText={onChange}
//                   placeholderTextColor="gray"
//                 />
//               </View>
//               {errors.name && (
//                 <Text style={styles.errorText}>{errors.name.message}</Text>
//               )}
//             </View>
//           )}
//         />

//         {/* Email */}
//         <Controller
//           control={control}
//           name="email"
//           rules={{
//             required: "Email is required",
//             pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
//           }}
//           render={({ field: { onChange, value } }) => (
//             <View style={styles.inputWrapper}>
//               <View style={styles.inputRow}>
//                 <Ionicons
//                   name="mail-sharp"
//                   size={20}
//                   color="gray"
//                   style={{ marginRight: 10 }}
//                 />
//                 <TextInput
//                   style={styles.inputFlex}
//                   placeholder="Email"
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   value={value}
//                   onChangeText={onChange}
//                   placeholderTextColor="gray"
//                 />
//               </View>
//               {errors.email && (
//                 <Text style={styles.errorText}>{errors.email.message}</Text>
//               )}
//             </View>
//           )}
//         />

//         {/* Password */}
//         <Controller
//           control={control}
//           name="password"
//           rules={{
//             required: "Password is required",
//             minLength: { value: 6, message: "Min 6 characters" },
//           }}
//           render={({ field: { onChange, value } }) => (
//             <View style={styles.inputWrapper}>
//               <View style={styles.inputRow}>
//                 <Ionicons
//                   name="lock-closed-sharp"
//                   size={20}
//                   color="gray"
//                   style={{ marginRight: 10 }}
//                 />
//                 <TextInput
//                   style={styles.inputFlex}
//                   placeholder="Password"
//                   secureTextEntry={!showPassword}
//                   value={value}
//                   onChangeText={onChange}
//                   placeholderTextColor="gray"
//                 />
//                 <TouchableOpacity
//                   onPress={() => setShowPassword(!showPassword)}
//                 >
//                   <Ionicons
//                     name={showPassword ? "eye-off-sharp" : "eye-sharp"}
//                     size={20}
//                     color="gray"
//                   />
//                 </TouchableOpacity>
//               </View>
//               {errors.password && (
//                 <Text style={styles.errorText}>{errors.password.message}</Text>
//               )}
//             </View>
//           )}
//         />

//         {/* Confirm Password */}
//         <Controller
//           control={control}
//           name="confirmPassword"
//           rules={{
//             required: "Please confirm your password",
//             validate: (value) =>
//               value === control._formValues.password ||
//               "Passwords do not match",
//           }}
//           render={({ field: { onChange, value } }) => (
//             <View style={styles.inputWrapper}>
//               <View style={styles.inputRow}>
//                 <Ionicons
//                   name="lock-closed-sharp"
//                   size={20}
//                   color="gray"
//                   style={{ marginRight: 10 }}
//                 />
//                 <TextInput
//                   style={styles.inputFlex}
//                   placeholder="Confirm Password"
//                   secureTextEntry={!showConfirmPassword}
//                   value={value}
//                   onChangeText={onChange}
//                   placeholderTextColor="gray"
//                 />
//                 <TouchableOpacity
//                   onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   <Ionicons
//                     name={showConfirmPassword ? "eye-off-sharp" : "eye-sharp"}
//                     size={20}
//                     color="gray"
//                   />
//                 </TouchableOpacity>
//               </View>
//               {errors.confirmPassword && (
//                 <Text style={styles.errorText}>
//                   {errors.confirmPassword.message}
//                 </Text>
//               )}
//             </View>
//           )}
//         />

//         <Text style={styles.disclaimer}>
//           By clicking the <Text style={{ color: "#F83758" }}>Register</Text>{" "}
//           button, you agree to the public offer
//         </Text>

//         {/* this is the real clickable button do not delete it, it is the one that triggers the registration process */}
//         {/* <Pressable
//           style={[styles.button, loading && { opacity: 0.6 }]}
//           onPress={handleSubmit(onSubmit)}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Create Account</Text>
//           )}
//         </Pressable> */}

//         <Pressable
//           style={[styles.button]}
//           // Wrap it in an arrow function so it only runs on press
//           onPress={() => router.push("/auth/login")}
//         >
//           <Text style={styles.buttonText}>Create Account</Text>
//         </Pressable>

//         <Text style={styles.orText}>- OR Continue with -</Text>

//         <View style={styles.socialContainer}>
//           <TouchableOpacity
//             onPress={() =>
//               showNotification("Google Auth coming soon!", "error")
//             }
//           >
//             <Ionicons name="logo-google" size={30} color="#DB4437" />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.footerText}>
//           I Already Have an Account?{" "}
//           <Link href="/auth/login" style={styles.linkText}>
//             Login
//           </Link>
//         </Text>
//       </ScrollView>
//     </KeyboardAvoidingView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//   },
//   container:
//   { flex: 1,
//      backgroundColor: "transparent" },
//   toast: {
//     position: "absolute",
//     top: 50,
//     left: 20,
//     right: 20,
//     padding: 15,
//     zIndex: 1000,
//     fontSize: 26,
//   },
//   toastText: {
//     color: "#F83758",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 24,
//   },
//   scrollContainer: {
//     padding: 24,
//     justifyContent: "center",
//     flexGrow: 1,
//     marginTop: 40,
//   },
//   title: { fontSize: 28, fontWeight: "800", marginBottom: 30 },
//   inputWrapper: { marginBottom: 16 },
//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     backgroundColor: "#F9F9F9",
//   },
//   inputFlex: { flex: 1, paddingVertical: 16 },
//   errorText: { color: "red", fontSize: 12, marginTop: 4, marginLeft: 4 },
//   disclaimer: { fontSize: 12, color: "#666", marginBottom: 20 },
//   button: {
//     backgroundColor: "#F83758",
//     padding: 18,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
//   orText: { textAlign: "center", marginVertical: 30, color: "#666" },
//   socialContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 30,
//     marginHorizontal: 80,
//   },
//   footerText: { textAlign: "center", marginTop: 20 },
//   linkText: { color: "#F83758", fontWeight: "700" },

//   // New Modal Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.71)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     width: "80%",
//     backgroundColor: "white",
//     padding: 40,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   starIcon: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   modalText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
// });

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
  ActivityIndicator,
  Modal,
  Image,
  ImageBackground,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { api, setAuthToken } from "../../lib/api";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [showExistsModal, setShowExistsModal] = useState(false); // Exists Modal

  // Notification State
  const [notification, setNotification] = useState({ message: "", type: "" });
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const response = await api.post("/auth/register", data);
      await setAuthToken(response.data.token);

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push("/auth/login");
      }, 4000);
      setLoading(false);
    } catch (error) {
      if (error?.response?.status === 409) {
        setShowExistsModal(true); // Trigger the "Already Exists" modal
      }
      setLoading(false);
    }
  }

  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")} // Update path to your image
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar barStyle="dark-content" />

        {/* Success Modal */}
        <Modal transparent={true} visible={showModal} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Make sure you have your star image in assets/image/star.png */}
              <Image
                source={require("../../../assets/images/star.png")}
                style={styles.starIcon}
              />
              <Text style={styles.modalText}>
                Account created successfully!
              </Text>
            </View>
          </View>
        </Modal>

        {/* Already Exists Modal */}
        <Modal
          transparent={true}
          visible={showExistsModal}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Ionicons name="alert-circle" size={80} color="#FFB6C1" />
              <Text style={styles.modalText}>User already exists!</Text>
              <Pressable
                style={styles.button}
                onPress={() => setShowExistsModal(false)}
              >
                <Text style={styles.buttonText}>Try Again</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

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
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    style={styles.inputFlex}
                    placeholder="Username"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor="white"
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
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    style={styles.inputFlex}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor="white"
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
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    style={styles.inputFlex}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor="white"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-sharp" : "eye-sharp"}
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                )}
              </View>
            )}
          />

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
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    style={styles.inputFlex}
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor="white"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons
                      name={showConfirmPassword ? "eye-off-sharp" : "eye-sharp"}
                      size={20}
                      color="white"
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
            By clicking the <Text style={{ color: "#f66262" }}>Register</Text>{" "}
            button, you agree to the public offer
          </Text>

          {/* this is the real clickable button do not delete it, it is the one that triggers the registration process */}
          <Pressable
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </Pressable>

          {/* <Pressable
            style={[styles.button]}
            // Wrap it in an arrow function so it only runs on press
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable> */}

          <Text style={styles.orText}>- OR Continue with -</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              onPress={() =>
                showNotification("Google Auth coming soon!", "error")
              }
            >
              <Ionicons name="logo-google" size={30} color="#ffffff" />
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: { flex: 1, backgroundColor: "transparent" },
  toast: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 15,
    zIndex: 1000,
    fontSize: 26,
  },
  toastText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  scrollContainer: {
    padding: 24,
    justifyContent: "center",
    flexGrow: 1,
    marginTop: 40,
  },
  title: { fontSize: 28, fontWeight: "800", marginBottom: 30, color: "#ffffff" },
  inputWrapper: { marginBottom: 16 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  inputFlex: { flex: 1, paddingVertical: 16 },
  errorText: { color: "red", fontSize: 12, marginTop: 4, marginLeft: 4 },
  disclaimer: { fontSize: 12, color: "#ffffff", marginBottom: 20 },
  button: {
    backgroundColor: "#ffffff",
    shadowColor: "#faf0f1",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#000000", fontWeight: "700", fontSize: 16 },
  orText: { textAlign: "center", marginVertical: 30, color: "#ffffff" },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    marginHorizontal: 80,
  },
  footerText: { textAlign: "center", marginTop: 20 , color: "#ffffff"},
  linkText: { color: "#ffffff", fontWeight: "700" },

  // New Modal Styles
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