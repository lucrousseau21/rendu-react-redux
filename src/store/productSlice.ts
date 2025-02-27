import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Product {
  thumbnail: string;
  category: string[];
  brand: string;
  discountPercentage: number;
  stock: number;
  availabilityStatus: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  images: string[];
  warrantyInformation: string;
  weight: number;
  shippingInformation: string;
  sku: string;
  returnPolicy: string;
  reviews: {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  rating: number;
  id: number;
  title: string;
  description: string;
  price: number;
  quantity?: number;
}
// Product Slice
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (currentPage: number) => {
    const response = await fetch("https://dummyjson.com/products?limit=15&skip="+ (currentPage - 1) * 15);
    const jsonResponse = await response.json();
    // console.log(jsonResponse.products.length);

    return { products: jsonResponse.products as Product[], total: jsonResponse.total };
  }
);

const initialState: {
  items: Product[];
  isLoading: boolean;
  currentPage: number;
  total?: number;
} = {
  items: [],
  isLoading: false,
  currentPage: 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        console.log("Error fetching products");
      });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
