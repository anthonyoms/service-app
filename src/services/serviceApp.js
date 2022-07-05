import axios from "axios/dist/axios";
import { httpMethods } from "../utils/constants/httpMethods";

export const serviceApp = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

serviceApp.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || "";
  config.headers["x-token"] = token;

  return config;
});

export const fetchServiceApp = async (
  endpoint,
  payload,
  method = httpMethods.Get
) => {
  //call the api
  try {
    if (method === httpMethods.Get || method === httpMethods.Delete) {
      return await serviceApp[method](endpoint);
    } else {
      return await serviceApp[method](endpoint, payload);
    }
  } catch (error) {
    const errors = error.response.data.msg || error.response.data.errors[0].msg;
    console.log(errors);
    return { data: { errorMsg: errors } };
  }
};
