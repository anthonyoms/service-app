import axios from "axios/dist/axios";
import { endpoints } from "../utils/constants/endpoints";
import { httpMethods } from "../utils/constants/httpMethods";
import { dataValidation } from "../utils/helpers/messages";

export const serviceApp = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
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
    console.log(error.message);
    const errors =
      error?.response?.data?.msg ||
      (error?.response?.data?.errors && error.response.data?.errors[0]?.msg) ||
      error.message;
    console.log(errors);
    return { data: { ok: false, errorMsg: errors } };
  }
};

export const downloadFileServiceApp = async (endpoint, fieldName) => {
  try {
    const response = await serviceApp.get(endpoint, {
      responseType: "blob", // Importante para manejar archivos binarios
    });

    // Crear un enlace para descargar el archivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fieldName); // Nombre predeterminado del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { ok: true };
  } catch (error) {
    console.log(error.message);
    const errors =
      error?.response?.data?.msg ||
      (error?.response?.data?.errors && error.response.data?.errors[0]?.msg) ||
      error.message;
    console.log(errors);
    return { ok: false, errorMsg: errors };
  }
};

export const getServiceApp = async (endpoint) => {
  const { data } = await fetchServiceApp(endpoint);
  return data;
};

export const deleteServiceApp = async (id, endpoint) => {
  const { data } = await fetchServiceApp(
    `${endpoint}/${id}`,
    {},
    httpMethods.Delete
  );
  return data;
};

export const postServiceApp = async (payload, endpoint) => {
  const { data } = await fetchServiceApp(endpoint, payload, httpMethods.Post);
  return data;
};
export const updateServiceApp = async (payload, endpoint, id) => {
  const { data } = await fetchServiceApp(
    `${endpoint}/${id}`,
    payload,
    httpMethods.Put
  );
  return data;
};

export const uploadFileServiceApp = async (file, coleccion, id) => {
  const endpoint = endpoints.uploads + coleccion;
  const formData = new FormData();
  formData.append("archivo", file);
  const data = await updateServiceApp(formData, endpoint, id);
  return data;
};

export const saveWithImage = async (payload, image, endpoint) => {
  let entidad = endpoint.slice(1);
  entidad = entidad.slice(0, -1);
  const dataResponse = await postServiceApp(payload, endpoint);
  if (dataResponse.ok) {
    const data = await uploadFileServiceApp(
      image,
      endpoint,
      dataResponse[entidad].uid
    );
    const { ok } = dataValidation(data, false);
    if (ok) {
      return dataValidation(dataResponse);
    }
  } else {
    return dataValidation(dataResponse);
  }
};
