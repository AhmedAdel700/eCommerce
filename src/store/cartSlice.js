import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartData: JSON.parse(localStorage.getItem('cartData')) || []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Avoid adding duplicates
            const exists = state.cartData.some(item => item.id === action.payload.id);
            if (!exists) {
                state.cartData.push(action.payload);
            }
            // Add it to local storage
            localStorage.setItem("cartData", JSON.stringify(state.cartData));
        },

        // Remove Item From Cart
        removeItemFromCart: (state, action) => {
            const productId = action.payload;
            state.cartData = state.cartData.filter(item => item.id !== productId);

            // Update local storage
            localStorage.setItem("cartData", JSON.stringify(state.cartData));
        },
        // Remove Item From Cart
        clearCart: (state) => {
            state.cartData = [];

            // Update local storage
            localStorage.setItem("cartData", JSON.stringify(state.cartData));
        },

    },
})

export const { addToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;