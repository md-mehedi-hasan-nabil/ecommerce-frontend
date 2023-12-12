import { apiSlice } from '../api/apiSlice';

export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCarts: builder.query({
            query: () => `/cart`,
        }),
        getCart: builder.query({
            query: (cartId) => `/cart/${cartId}`
        }),
        addToCart: builder.mutation({
            query: (data) => ({
                url: "/cart",
                method: "POST",
                body: data,
            }), async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // pessimistically cash update
                try {
                    const result = await queryFulfilled;

                    const response = await fetch(import.meta.env.VITE_API_URL + `/api/cart/${result.data.data._id}`)
                    const newCart = await response.json()

                    dispatch(apiSlice.util.updateQueryData("getCarts", undefined, (draftCarts) => {
                        draftCarts.push(newCart)
                    }));
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        incrementProductToCart: builder.mutation({
            query: (data) => ({
                url: `/cart/increase-product/${data.cartId}`,
                method: "PATCH",
                body: data,
            }),

        }),

        decreaseProductToCart: builder.mutation({
            query: (data) => ({
                url: `/decrease-product/cart/${data.cartId}`,
                method: "PATCH",
                body: data,
            }),
        }),

        updateProductQuantity: builder.mutation({
            query: (data) => ({
                url: `/cart/${data.cartId}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // pessimistically cash update
                try {
                    const result = await queryFulfilled;
                    console.log(arg)
                    console.log(result.data.data.cartQuantity)
                    // const response = await fetch(import.meta.env.VITE_API_URL + `/api/cart/${arg.cartId}`)
                    // const newCart = await response.json()

                    dispatch(apiSlice.util.updateQueryData("getCarts", undefined, (draftCarts) => {
                        const cart = draftCarts.find(cart => cart._id == arg.cartId);
                        cart.quantity = result.data.data.cartQuantity
                        console.log(JSON.stringify(cart))
                    }));
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        removeProductFromCart: builder.mutation({
            query: (data) => ({
                url: `/cart/${data.cartId}`,
                method: "DELETE",
                body: data
            }), async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                // optimistic cash update
                const patchResult = dispatch(apiSlice.util.updateQueryData("getCarts", undefined, (draftCarts) => {
                    const index = draftCarts.findIndex(cart => cart._id == arg.cartId);
                    draftCarts.splice(index, 1)
                }));

                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo()
                }
            }
        }),
    }),
});

export const {
    useGetCartQuery, useGetCartsQuery, useAddToCartMutation, useRemoveProductFromCartMutation, useUpdateProductQuantityMutation
} = cartApi;
