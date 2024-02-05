import { apiSlice } from "../api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: (email) => {
        let params = {};

        if (email) {
          params.email = email;
        }

        return {
          url: `/cart`,
          params,
        };
      },
      providesTags: ["carts"],
    }),
    getCart: builder.query({
      query: (cartId) => `/cart/${cartId}`,
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["carts"],
    }),

    incrementProductToCart: builder.mutation({
      query: (data) => ({
        url: `/cart/increase-product/${data.cartId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["carts"]
    }),

    decreaseProductToCart: builder.mutation({
      query: (data) => ({
        url: `/decrease-product/cart/${data.cartId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["carts"]
    }),

    updateProductQuantity: builder.mutation({
      query: (data) => ({
        url: `/cart/${data.cartId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["carts"],
    }),

    removeProductFromCart: builder.mutation({
      query: (data) => ({
        url: `/cart/${data.cartId}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["carts"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useGetCartsQuery,
  useAddToCartMutation,
  useRemoveProductFromCartMutation,
  useUpdateProductQuantityMutation,
} = cartApi;
