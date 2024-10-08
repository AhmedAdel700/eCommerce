import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { products: [], loading: false, error: null, };

export const addProducts = createAsyncThunk("products/addProducts", async (productId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
        const response = await fetch(productId ? `https://fakestoreapi.in/api/products/${productId}` : "https://fakestoreapi.in/api/products?limit=150");
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder
            // Get All Products Or Single Product
            .addCase(addProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload;
            })
            .addCase(addProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default productSlice.reducer;