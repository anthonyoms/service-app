import Swal from "sweetalert2";
import { serviceApp } from "./serviceApp";

export const Login = async (correo, password) => {
  //call the api
  try {
    const { data } = await serviceApp.post("/auth/login", {
      correo,
      password,
    });
    return data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.msg,
    });
    console.log(error.response.data);
    return error.response.data;
  }
};

export const revalidarToken = async () => {
  //call the api
  try {
    const { data } = await serviceApp.get("/auth/renew");
    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
