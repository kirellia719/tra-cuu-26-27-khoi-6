import axios from "axios";
import { storageService } from "../services/storageService";

const api = axios.create();

// 🔥 TỰ ĐỘNG GẮN TOKEN
api.interceptors.request.use((config) => {
  const token = storageService.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;