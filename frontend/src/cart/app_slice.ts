import { createSlice } from "@reduxjs/toolkit";
import type { Cart_state } from "../interfaces/interfaces";

const cart_state: Cart_state = {
  cart: [],
  total: 0,
  logged: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: cart_state,
  reducers: {
    add_product: (state, action) => {
      const product = state.cart.find((prod) => prod.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      } else {
        state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      state.total = state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    delete_product: (state, action) => {
      state.cart = state.cart.filter((prod) => prod.id !== action.payload.id);

      state.total = state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    increase_quantity: (state, action) => {
      const product = state.cart.find((prod) => prod.id === action.payload.id);
      if (product) {
        product.quantity += 1;
        state.total = state.cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    },
    decrease_quantity: (state, action) => {
      const product = state.cart.find((prod) => prod.id === action.payload.id);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.cart = state.cart.filter(
            (prod) => prod.id !== action.payload.id
          );
        }
        state.total = state.cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    },
    login_user: (state) => {
      state.logged = true;
    },
    logout_user: (state) => {
      state.logged = false;
    },
    clear_cart: (state) => {
      state.cart = [];
      state.total = 0;
    },
  },
});

export const {
  add_product,
  delete_product,
  increase_quantity,
  decrease_quantity,
  login_user,
  logout_user,
  clear_cart,
} = cartSlice.actions;

export default cartSlice.reducer;
