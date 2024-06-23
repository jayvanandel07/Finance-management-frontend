import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ user_id, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        user_id,
        password,
      });

      const { token } = response.data;
      // Save token to localStorage
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for register
export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/auth/register", {
        email,
        password,
      });
      const { token } = response.data;
      // Save token to localStorage
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
