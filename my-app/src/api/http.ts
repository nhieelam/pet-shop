import axios from "axios";
import { API_CONFIG } from "../config/apiConfig";

export const http = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});