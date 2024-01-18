import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/product`,
    }),
    getProduct: builder.query({
      query: (productId) => `/product/${productId}`,
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/product/${data.id}`,
        method: "PATCH",
        body: data.body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (data) => ({
        url: `/product/${data.id}`,
        method: "DELETE",
      }),
    }),
    getCategories: builder.query({
      query: () => `/category`,
    }),
    addProductCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useAddProductCategoryMutation,
} = productsApi;
