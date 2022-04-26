import { serviceApp } from "./serviceApp";

export const getUsers = async () => {
  //call the api
  try {
    const { data } = await serviceApp.get("/usuarios");
    return data.usuarios;
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (correo, password) => {
  //call the api
  try {
    const { data } = await serviceApp.post("/auth/login", {
      correo,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const revalidarToken = async () => {
  //call the api
  try {
    const { data } = await serviceApp.get("/auth/renew", {
      headers: {
        "x-token": localStorage.getItem("token") || "",
      },
    });
    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
