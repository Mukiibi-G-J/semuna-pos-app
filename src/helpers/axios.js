import axios from "axios";

let headers = {};

const axiosInstance = axios.create({
  baseURL: "http://3.109.186.130/api/",
  headers,
});

export default axiosInstance;
