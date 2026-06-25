import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_BASE_URL = "https://akennes-glow.onrender.com/api";
const TOKEN_KEY = "authToken";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export async function setAuthToken(token) {
  if (token) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    await AsyncStorage.removeItem(TOKEN_KEY);
    delete api.defaults.headers.common.Authorization;
  }
}

// Fallback for requests made before setAuthToken has run in this session
// (e.g. right after an app restart), so the token is still read from storage.
api.interceptors.request.use(async (config) => {
  if (!config.headers.Authorization) {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
