import {ApplicationApi} from "@/Api/ApplicationApi";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  errors: null,
  isLogged: false,
};

const AUTHENTICATION = "Authentication";
const AUTHENTICATION_REGISTER = "Authentication/register";
const AUTHENTICATION_LOGIN = "Authentication/login";
const API = import.meta.env.VITE_API_URL;
const PATH_LOGIN = "user/login";
const PATH_REGISTER = "user/register";

export const registerPost = createAsyncThunk(
  AUTHENTICATION_REGISTER,
  async (payload, thunkAPI) => {
    try {
      const response = await ApplicationApi(PATH_REGISTER).POST(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginPost = createAsyncThunk(
  AUTHENTICATION_LOGIN,
  async (payload, thunkAPI) => {
    try {
      const response = await ApplicationApi(PATH_LOGIN).POST(payload);
      if (response.status === 200) {
      }
      return {token: response.data, status: response.statusText};
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const AuthSlice = createSlice({
  name: AUTHENTICATION,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerPost.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(registerPost.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(registerPost.rejected, (state, action) => {
      state.status = "error";
      state.errors = null;
    });
    builder.addCase(loginPost.fulfilled, (state, action) => {
      state.status = action.payload.status;
      localStorage.setItem("_auth_jwt", action.payload.token);
      state.isLogged = true;
    });
    builder.addCase(loginPost.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(loginPost.rejected, (state, action) => {
      state.status = "error";
      state.errors = action.payload;
    });
  },
});

export default AuthSlice.reducer;
