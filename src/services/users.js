import Swal from "sweetalert2";
import { serviceApp } from "./serviceApp";

export const getUsers = async () => {
  //call the api
  try {
    const { data } = await serviceApp.get("/usuarios?limite=200");
    return data.usuarios;
  } catch (error) {
    console.log(error);
  }
};
export const getUsersById = async (Id) => {
  //call the api
  try {
    const { data } = await serviceApp.get(`/usuarios/${Id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postUser = async (data = {}) => {
  //call the api
  try {
    const { data: response } = await serviceApp.post("/usuarios", data);

    if (response.ok) {
      Swal.fire(
        "Operación completada!",
        "Usuario registrado de forma correcta!",
        "success"
      );
    }
    return response;
  } catch (error) {
    Swal.fire(
      "Operación no completada!",
      error.response.data.errors[0].msg,
      "error"
    );
    console.log(error.response.data.errors[0]);
  }
};
export const putUser = async (uid, data = {}) => {
  try {
    const { data: response } = await serviceApp.put(`/usuarios/${uid}`, data);

    if (response.ok) {
      Swal.fire(
        "Operación completada!",
        "Usuario actualizado de forma correcta!",
        "success"
      );
    }
    return response;
  } catch (error) {
    Swal.fire(
      "Operación no completada!",
      error.response.data.errors[0].msg,
      "error"
    );
    console.log(error.response.data.errors[0]);
  }
};
export const deleteUser = async (uid) => {
  try {
    const { data: response } = await serviceApp.delete(`/usuarios/${uid}`);

    if (response.ok) {
      Swal.fire(
        "Operación completada!",
        "Usuario desactivado de forma correcta!",
        "success"
      );
    }
    return response;
  } catch (error) {
    Swal.fire("Operación no completada!", error.response.data.msg, "error");
    console.log(error.response.data);
  }
};
