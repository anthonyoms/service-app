import { serviceApp } from "./serviceApp";

export const searchUsers = async (termino) => {
  try {
    if (termino.length > 0) {
      const { data } = await serviceApp.get(`/buscar/usuarios/${termino}`);
      return data.results;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
