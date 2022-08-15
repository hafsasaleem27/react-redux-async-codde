import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import cartReducer from "./cart";

const store = configureStore({
  reducer: { cart: cartReducer, ui: uiReducer },
});

export default store;
