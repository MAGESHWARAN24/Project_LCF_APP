import {ApplicationApi} from "@/Api/ApplicationApi";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  userCollection: [],
  editUserInfo: {},
  error: null,
};

const USER = "user";
const USER_CREATE = "user/create";
const USER_DELETE = "user/delete";
const USER_UPDATE = "user/update";
const USER_GETBYID = "user/getbyid";
const USER_GELLALL = "user/getall";
const PATH = "user";

export const userGetall = createAsyncThunk(
  USER_GELLALL,
  async (_, thunkAPI) => {
    try {
      const response = await ApplicationApi(PATH).GET();
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSclice = createSlice({
  name: USER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userGetall.fulfilled, (state, action) => {
      state.status = "success";
      state.userCollection = action.payload;
    });
    builder.addCase(userGetall.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(userGetall.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error;
    });
  },
});

export default userSclice.reducer;
