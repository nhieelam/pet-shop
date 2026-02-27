import axios from "axios";
import { API_CONFIG } from "../config/apiConfig";

export const http = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});