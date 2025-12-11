import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Safe localStorage parse
const userExist = JSON.parse(localStorage.getItem("user") || "null");

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: userExist,
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: "",
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
         
              // login case handle 
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
                state.message = ""
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.user = {}
                state.isError = action.payload
            })

            // login case handle 
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
                state.message = ""
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.user = {}
                state.isError = action.payload
            })
    },
});


export default authSlice.reducer;

export const registerUser = createAsyncThunk(
    "register/user",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/user/register", formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Registration Failed");
        }
    }
);

export const loginUser = createAsyncThunk(
    "login/user",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/user/login", formData);
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Login Failed");
        }
    }
);
