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
    const errors = error.response.data.msg || error.response.data.errors[0].msg;
    console.log(errors);
    return errors;
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
