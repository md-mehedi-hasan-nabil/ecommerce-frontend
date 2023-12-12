import { apiSlice } from '../api/apiSlice';

export const productsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `/product`,
        }),
        getProduct: builder.query({
            query: (productId) => `/product/${productId}`
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: "/product",
                method: "POST",
                body: data,
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
        })
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useGetCategoriesQuery,
    useAddProductCategoryMutation

} = productsApi;
