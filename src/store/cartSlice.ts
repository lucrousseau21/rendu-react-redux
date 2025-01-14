import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

const initialState: Product[] = [];

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialState,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity! += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.items.find((item) => item.id === id);
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;