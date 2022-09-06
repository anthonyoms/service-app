import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/authReducer";
import { infoReducer } from "../reducers/infoReducer";

export const store = configureStore({
  reducer: { auth: authReducer, info: infoReducer },
});
