import axios from "axios";

const api = axios.create({
  baseURL: "https://fashionhub-backend-efhn.onrender.com"
});

export default api;