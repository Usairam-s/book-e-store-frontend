import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/features/Cart/cart";
import { bookApi } from "./features/bookApi/bookApi";
import { paymentApi } from "./features/paymentApi/paymentApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [bookApi.reducerPath]: bookApi.reducer, // Add bookApi reducer
    [paymentApi.reducerPath]: paymentApi.reducer, // Add paymentApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookApi.middleware) // Add bookApi middleware
      .concat(paymentApi.middleware), // ✅ Add paymentApi middleware
});
