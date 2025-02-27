import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
        const product = action.payload;
        const existingProduct = state.items.find((item) => item.id === product.id);
        if (existingProduct) {
            state.items = state.items.filter((item) => item.id !== product.id);
        } else {
            state.items.push(product);
        }
    }
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;