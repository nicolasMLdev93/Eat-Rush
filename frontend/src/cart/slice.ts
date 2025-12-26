import { createSlice } from "@reduxjs/toolkit";
import type { Cart_state } from "../interfaces/interfaces";

const initialCartState = localStorage.getItem("cart");
const initialTotalState = localStorage.getItem("total");
const initialLoggedState = localStorage.getItem("token");
const initialTotal_productsState = localStorage.getItem("total_producs");

const safeParse = <T>(value: string | null, defaultValue: T): T => {
  if (!value) return defaultValue;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error("Error parsing localStorage value:", error);
    return defaultValue;
  }
};

const isLoggedIn = initialLoggedState ? true : false;

const cart_state: Cart_state = {
  cart: safeParse(initialCartState, []),
  total: safeParse(initialTotalState, 0),
  logged: isLoggedIn, // Solo verifica si existe
  total_products: safeParse(initialTotal_productsState, 0),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: cart_state,
  reducers: {
    add_product: (state, action) => {
      const product = state.cart.find((prod) => prod.id === action.payload.id);
      if (product) {
        product.quantity += 1;
        state.total += product.price;
        state.total_products += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        state.total_products += 1;
        state.total += action.payload.price;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem(
        "total_producs",
        JSON.stringify(state.total_products)
      );
    },

    delete_product: (state, action) => {
      const product = state.cart.find((prod) => prod.id === action.payload.id);
      if (product) {
        state.total -= product.price * product.quantity;
        state.total_products -= product.quantity;
        state.cart = state.cart.filter((prod) => prod.id !== action.payload.id);

        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem(
          "total_producs",
          JSON.stringify(state.total_products)
        );
      }
    },

    increase_quantity: (state, action) => {
      const product = state.cart.find((prod) => prod.id === action.payload.id);
      if (product) {
        product.quantity += 1;
        state.total += product.price;
        state.total_products += 1;

        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem(
          "total_producs",
          JSON.stringify(state.total_products)
        );
      }
    },

    decrease_quantity: (state, action) => {
      const product = state.cart.find((prod) => prod.id === action.payload.id);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
          state.total -= product.price;
          state.total_products -= 1;
        } else {
          state.total -= product.price;
          state.total_products -= 1;
          state.cart = state.cart.filter(
            (prod) => prod.id !== action.payload.id
          );
        }

        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem(
          "total_producs",
          JSON.stringify(state.total_products)
        );
      }
    },

    login_user: (state) => {
      state.logged = true;
      localStorage.setItem("token", "true");
    },

    logout_user: (state) => {
      state.logged = false;
      localStorage.removeItem("token");
    },

    clear_cart: (state) => {
      state.cart = [];
      state.total = 0;
      state.total_products = 0;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem(
        "total_producs",
        JSON.stringify(state.total_products)
      );
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
