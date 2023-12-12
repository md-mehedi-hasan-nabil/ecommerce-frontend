import { apiSlice } from '../api/apiSlice';

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => `/order`,
        }),
        getOrder: builder.query({
            query: (orderId) => `/order/${orderId}`
        }),
        addOrder: builder.mutation({
            query: (data) => ({
                url: "/order",
                method: "POST",
                body: data,
            }), async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // pessimistically cash update
                try {
                    const result = await queryFulfilled;

                    // const response = await fetch(import.meta.env.VITE_API_URL + `/api/cart/${result.data.data._id}`)
                    // const newCart = await response.json()

                    // dispatch(apiSlice.util.updateQueryData("getCarts", undefined, (draftCarts) => {
                    //     draftCarts.push(newCart)
                    // }));
                } catch (error) {
                    console.log(error)
                }
            }
        }),
    }),
});

export const { useGetOrdersQuery, useGetOrderQuery, useAddOrderMutation } = orderApi;
