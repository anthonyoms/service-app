import axios from "axios/dist/axios";

export const serviceApp = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

serviceApp.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || "";
  config.headers["x-token"] = token;

  return config;
});

export const get = async (endpoint) => {
  try {
    const { data } = await serviceApp.get(endpoint);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const post = async (endpoint, payload) => {
  //call the api
  try {
    const { data } = await serviceApp.post(endpoint, payload);
    return data;
  } catch (error) {
    const errors = error.response.data.msg || error.response.data.errors[0].msg;
    console.log(errors);
    return errors;
  }
};
