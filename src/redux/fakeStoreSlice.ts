import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./fakeStoreApiSlice";

const initialState: Product[] = [];

const nameSpace = "fakeStore";

export const fakeStoreSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
    populateFakeStore: (state, action: PayloadAction<Product[]>) =>
      (state = [...action.payload]),
    addNewProduct: (state, action: PayloadAction<Product>) =>
      (state = [...state, action.payload]),
    deleteProduct: (state, action: PayloadAction<number>) => {
      const productIdToDelete = action.payload;
      return state.filter((product) => product.id !== productIdToDelete);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;
      return state.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
    },
  },
});

export const {
  populateFakeStore,
  addNewProduct,
  deleteProduct,
  updateProduct,
} = fakeStoreSlice.actions;
export default fakeStoreSlice.reducer;
