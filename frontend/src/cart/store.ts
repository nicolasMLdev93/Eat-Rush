import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./app_slice";

export default configureStore({
  reducer: {
    cart: cartSlice,
  },
});
