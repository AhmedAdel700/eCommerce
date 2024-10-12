import { createSlice } from "@reduxjs/toolkit";


const initialState = { cartData: [] };

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
        }
    },
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;