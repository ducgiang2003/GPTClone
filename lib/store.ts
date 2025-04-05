// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  //Không bật devTools trong môi trường production
});
export default store;
