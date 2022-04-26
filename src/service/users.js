import Swal from "sweetalert2";
import { serviceApp } from "./serviceApp";

export const getUsers = async () => {
  //call the api
  try {
    const { data } = await serviceApp.get("/usuarios?limite=150");
    return data.usuarios;
  } catch (error) {
    console.log(error);
  }
};
export const postUsers = async (data = {}) => {
  //call the api
  try {
    const { data: response } = await serviceApp.post("/usuarios", data, {
      headers: {
        "x-token": localStorage.getItem("token") || "",
      },
    });
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
      "Operación completada!",
      error.response.data.errors[0].msg,
      "error"
    );
    console.log(error.response.data.errors[0]);
  }
};
