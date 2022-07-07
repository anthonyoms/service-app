import axios from "axios/dist/axios";
import { httpMethods } from "../utils/constants/httpMethods";
import { errorMsg, successMsg } from "../utils/helpers/messages";

export const serviceApp = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

serviceApp.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || "";
  config.headers["x-token"] = token;

  return config;
});

const fetchServiceApp = async (endpoint, payload, method = httpMethods.Get) => {
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

export const getServiceApp = async (endpoint) => {
  const { data } = await fetchServiceApp(endpoint);
  if (data.ok) {
    return data;
  } else {
    errorMsg();
  }
};

export const deleteServiceApp = async (id, endpoint) => {
  const { data } = await fetchServiceApp(
    `${endpoint}/${id}`,
    {},
    httpMethods.Delete
  );
  if (data.ok) {
    successMsg(data.msg);
  } else {
    errorMsg(data.errorMsg);
  }
};

export const postServiceApp = async (payload, endpoint) => {
  const { data } = await fetchServiceApp(endpoint, payload, httpMethods.Post);
  if (data.ok) {
    successMsg(data.msg);
  } else {
    errorMsg(data.errorMsg);
  }
};
export const updateServiceApp = async (payload, endpoint, id) => {
  const { data } = await fetchServiceApp(
    `${endpoint}/${id}`,
    payload,
    httpMethods.Put
  );
  if (data.ok) {
    successMsg(data.msg);
  } else {
    errorMsg(data.errorMsg);
  }
};
