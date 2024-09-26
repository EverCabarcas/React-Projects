import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer from "./auth";

const Store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

export default Store;
