import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/auth`,
    }),
    getUserByEmail: builder.query({
      query: (email) => `/auth/${email}`,
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          // localStorage.setItem(
          //     "auth",
          //     JSON.stringify({
          //         accessToken: result.data.accessToken,
          //         user: result.data.user,
          //     })
          // );

          // dispatch(
          //     userLoggedIn({
          //         accessToken: result.data.accessToken,
          //         user: result.data.user,
          //     })
          // );
        } catch (err) {
          // do nothing
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateInfo: builder.mutation({
      query: (data) => ({
        url: `/auth/edit-user/${data.email}`,
        method: "PATCH",
        body: data,
      }),
    }),
    googleLogin: builder.mutation({
      query: (data) => ({
        url: `/auth/google-login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByEmailQuery,
  useLoginMutation,
  useRegisterMutation,
  useUpdateInfoMutation,
  useGoogleLoginMutation,
} = authApi;
