import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      //check i item exists
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (!existingItem) {
        state.cartItems.push(action.payload);
        toast.success("Item added to cart");
      } else {
        toast("⚠️ Item already exist");
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
    },
    emptyCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
