import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: undefined,
    user: undefined,
    mode: "buyer"
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
        switchUserMode: (state, action) => {
            state.mode = action.payload
        }
    },
});

export const { userLoggedIn, userLoggedOut, switchUserMode } = authSlice.actions;
export default authSlice.reducer;
