import {ApplicationApi} from "@/Api/ApplicationApi";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  info: null,
  applications: [],
  status: "idle",
  errors: null,
};

const APPLICATION = "Application";
const APPLICATION_CREATE = "Application/create";
const APPLICATION_UPDATE = "Application/update";
const APPLICATION_PUBLISH = "Application/publish";
const APPLICATION_GET = "Application/getall";
const PATH = "application";

export const applicationCreate = createAsyncThunk(
  APPLICATION_CREATE,
  async (payload, thunkAPI) => {
    try {
      const response = await ApplicationApi(PATH).POST(payload);
      return {data: response.data, status: response.statusText};
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const applicationGetAll = createAsyncThunk(
  APPLICATION_GET,
  async (_, thunkAPI) => {
    try {
      const response = await ApplicationApi(PATH).GET();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const applicationPublish = createAsyncThunk(
  APPLICATION_PUBLISH,
  async (payload, thunkAPI) => {
    try {
      const reponse = await ApplicationApi(`${PATH}/${payload}`).PUT();
      return reponse.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const ApplicationSlice = createSlice({
  name: APPLICATION,
  initialState,
  reducers: {
    GetName: (state, action) => {
      localStorage.setItem(
        "ApplicationInfo",
        JSON.stringify(state.applications[action.payload])
      );
      state.info = state.applications[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(applicationCreate.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.applications = action.payload.data;
    });
    builder.addCase(applicationCreate.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(applicationCreate.rejected, (state, action) => {
      state.errors = action.payload;
      state.status = "error";
    });
    builder.addCase(applicationGetAll.fulfilled, (state, action) => {
      state.status = "success";
      state.applications = action.payload;
    });
    builder.addCase(applicationGetAll.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(applicationGetAll.rejected, (state, action) => {
      state.applications = state.applications;
      state.errors = action.payload;
      state.status = "error";
    });
    builder.addCase(applicationPublish.fulfilled, (state, action) => {
      state.status = action.payload.status;
    });
    builder.addCase(applicationPublish.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(applicationPublish.rejected, (state, action) => {
      state.errors = action.payload;
      state.status = "error";
    });
  },
});

export const {GetName} = ApplicationSlice.actions;

export default ApplicationSlice.reducer;
