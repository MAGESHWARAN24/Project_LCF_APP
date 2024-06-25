import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  name: "",
  content: [],
};

const BUILDER = "Builder";

const builderSlice = createSlice({
  name: BUILDER,
  initialState,
  reducers: {
    AddElement: (state, action) => {
      return state.content.push(action.payload);
    },
  },
});
export const {AddElement} = builderSlice.actions;
export default builderSlice.reducer;
