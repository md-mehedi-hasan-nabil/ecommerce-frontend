import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: undefined,
    user: undefined,
    role: "buyer"
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.accessToken = undefined;
            state.user = undefined;
        },
        switchUserRole: (state, action) => {
            localStorage.setItem("role", action.payload)
            state.role = action.payload
        }
    },
});

export const { userLoggedIn, userLoggedOut, switchUserRole } = authSlice.actions;
export default authSlice.reducer;
