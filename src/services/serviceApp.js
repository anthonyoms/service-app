import axios from "axios/dist/axios";

export const serviceApp = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

serviceApp.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || "";
  config.headers["x-token"] = token;

  return config;
});
