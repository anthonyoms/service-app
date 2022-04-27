import { serviceApp } from "./serviceApp";

export const searchUsers = async (termino) => {
  try {
    const url = `/buscar/usuarios/${termino}`;
    const { data } = await serviceApp.get(url);
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};
