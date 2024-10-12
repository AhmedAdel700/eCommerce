import { configureStore } from "@reduxjs/toolkit";

import products from "./productSlice";
import auth from "./authSlice";
import wishlist from "./wishlistSlice";
import cart from "./cartSlice";

const store = configureStore({
    reducer: {
        products,
        auth,
        wishlist,
        cart,
    }
})

export default store;