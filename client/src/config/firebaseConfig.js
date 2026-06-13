
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Get these values from your Firebase Project Settings in the console
const firebaseConfig = {
    apiKey: "AIzaSyBOUs_J5WIb1MR2NG293NMJVocOAc8UB_4",
    authDomain: "akennes-glow.firebaseapp.com",
    projectId: "akennes-glow",
    storageBucket: "akennes-glow.firebasestorage.app",
    messagingSenderId: "904276709234",
    appId: "1:904276709234:web:8e9fb9cee216dbadaad7eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence (so the user stays logged in)
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };