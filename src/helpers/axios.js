import axios from "axios";

let headers = {};

const axiosInstance = axios.create({
  // baseURL: "https://web-production-446e.up.railway.app/api",
  baseURL: "https://9b0c-197-239-14-10.ngrok-free.app/api",
  headers,
});

export default axiosInstance;
