import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export function setAuthToken(token) {
  api.defaults.headers.common.Authorization = token
    ? `Bearer ${token}`
    : undefined;
}
