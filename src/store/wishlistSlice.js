import { createSlice } from "@reduxjs/toolkit";

const initialState = { wishlist: JSON.parse(localStorage.getItem('wishlistData')) || [], likes: {} };

const wishlistSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            // Avoid adding duplicates
            const exists = state.wishlist.some(item => item.id === action.payload.id);
            if (!exists) {
                state.wishlist.push(action.payload);
            }

            // Add it to local storage
            localStorage.setItem("wishlistData", JSON.stringify(state.wishlist));
        },
        toggleLike: (state, action) => {
            const productId = action.payload;
            // Toggle like status for the product
            if (state.likes[productId]) {
                delete state.likes[productId]; // Remove like if it exists
            } else {
                state.likes[productId] = true; // Add like if it doesn't exist
            }
        },
        // Remove Item From List
        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.wishlist = state.wishlist.filter(item => item.id !== productId);

            // Update local storage
            localStorage.setItem("wishlistData", JSON.stringify(state.wishlist));
        }
    }
});

export const { addToWishlist, toggleLike, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;