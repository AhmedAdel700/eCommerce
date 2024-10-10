import { configureStore } from "@reduxjs/toolkit";

import products from "./productSlice";
import auth from "./authSlice";
import wishlist from "./wishlistSlice";

const store = configureStore({
    reducer: {
        products,
        auth,
        wishlist,
    }
})

export default store;