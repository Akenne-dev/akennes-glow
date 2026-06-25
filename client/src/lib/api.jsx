import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_BASE_URL = "https://akennes-glow.onrender.com/api";
const TOKEN_KEY = "authToken";
let cachedToken = null;

export async function setAuthToken(token) {
  cachedToken = token || null;
  if (token) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } else {
    await AsyncStorage.removeItem(TOKEN_KEY);
  }
}

async function request(path, { method = "GET", body } = {}) {
  if (cachedToken === null) {
    cachedToken = await AsyncStorage.getItem(TOKEN_KEY);
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(cachedToken ? { Authorization: `Bearer ${cachedToken}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const error = new Error(data?.error || `Request failed with status ${res.status}`);
    error.response = { status: res.status, data };
    throw error;
  }

  return { data, status: res.status };
}

export const api = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
};
