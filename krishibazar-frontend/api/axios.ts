import axios from "axios";
import { BASE_API_URL } from "@/constants/apiConfig";

const api = axios.create({
  baseURL: BASE_API_URL,
});

export default api;
