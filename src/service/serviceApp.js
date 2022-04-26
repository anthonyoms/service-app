import axios from "axios/dist/axios";

export const serviceApp = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

