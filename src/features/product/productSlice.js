import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productCategory: "all",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      state.productCategory = action.payload;
    },
  },
});

export const { filterByCategory } =
  productSlice.actions;
export default productSlice.reducer;
