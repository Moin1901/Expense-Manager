import axios from "axios";

const baseURL = (import.meta.env.VITE_API_BASE as string) || "http://localhost:5000";

export const API = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export default API;
