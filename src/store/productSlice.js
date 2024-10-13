import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { products: [], loading: false, error: null, limitedProducts: [], allProducts: [], category: [], allCategories: [], };

export const addLimitedProducts = createAsyncThunk("products/addLimitedProducts", async ({ limit = 20, page = 1 } = {}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    const url = `https://fakestoreapi.in/api/products?page=${page}&limit=${limit}`

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addProducts = createAsyncThunk("products/addProducts", async ({ productId, limit = 20, page = 1 } = {}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    const url = productId ? `https://fakestoreapi.in/api/products/${productId}` : `https://fakestoreapi.in/api/products?page=${page}&limit=${limit}`

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addAllProducts = createAsyncThunk("products/addAllProducts", async ({ limit = 150, page = 1 } = {}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    const url = `https://fakestoreapi.in/api/products?page=${page}&limit=${limit}`

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addCategory = createAsyncThunk("products/addCategory ", async (category, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    const url = `https://fakestoreapi.in/api/products/category?type=${category}&limit=4`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const addAllCategories = createAsyncThunk(
    "products/addAllCategories",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        const categoriesArray = [
            "https://fakestoreapi.in/api/products/category?type=gaming",
            "https://fakestoreapi.in/api/products/category?type=mobile",
            "https://fakestoreapi.in/api/products/category?type=laptop",
            "https://fakestoreapi.in/api/products/category?type=tv",
            "https://fakestoreapi.in/api/products/category?type=audio",
            "https://fakestoreapi.in/api/products/category?type=appliances",
        ];

        try {
            // Use Promise.all to wait for all fetches to complete
            const responses = await Promise.all(
                categoriesArray.map(async (category) => {
                    const response = await fetch(category);
                    return response.json();
                })
            );

            // Return the array containing all fetched data
            return responses;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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

            // Get Limited Products
            .addCase(addLimitedProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLimitedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.limitedProducts = action.payload;
            })
            .addCase(addLimitedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All Products
            .addCase(addAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.allProducts = action.payload;
            })
            .addCase(addAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Category Data 
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.category = action.payload;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get All Categories Data
            .addCase(addAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.allCategories = action.payload;
            })
            .addCase(addAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default productSlice.reducer;