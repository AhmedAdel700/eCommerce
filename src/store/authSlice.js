import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    redirectState: {
        state: false,
        type: null,
    },
    data: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        isLoggedIn: (state, action) => {
            state.isAuthenticated = true;
            state.redirectState.state = true;
            state.data = action.payload;
        },
        changeDirection: (state, action) => {
            state.redirectState.state = action.payload.state;
            state.redirectState.type = action.payload.type;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        }
    }
})

export const { isLoggedIn, changeDirection, logout } = authSlice.actions;

export default authSlice.reducer;