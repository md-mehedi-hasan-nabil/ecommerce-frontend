import { apiSlice } from '../api/apiSlice';

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPayments: builder.query({
            query: () => `/payment`,
        }),
        getPayment: builder.query({
            query: (paymentId) => `/payment/${paymentId}`
        }),
        addPayment: builder.mutation({
            query: (data) => ({
                url: "/payment",
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

export const { useGetPaymentsQuery, useGetPaymentQuery, useAddPaymentMutation } = paymentApi;
