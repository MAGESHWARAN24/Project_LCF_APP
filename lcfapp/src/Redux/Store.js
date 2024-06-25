import {configureStore} from "@reduxjs/toolkit";
import BuilderReducers from "./Slices/Builder.Sclice";
import ApplicationReducers from "./Slices/Application.Slice";
import AuthSlice from "./Slices/Auth.Slice";
import UserSlice from "./Slices/User.Slice";
export const Store = configureStore({
  reducer: {
    Builder: BuilderReducers,
    Application: ApplicationReducers,
    Auth: AuthSlice,
    User: UserSlice,
  },
});
