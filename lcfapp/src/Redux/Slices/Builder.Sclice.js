import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  content: [],
};

const BUILDER = "Builder";

const builderSlice = createSlice({
  name: BUILDER,
  initialState,
  reducers: {
    AddElement: (state, action) => {
      state.content.push(action.payload);
    },
    DeleteElement: (state, action) => {
      return {
        id: state.id,
        name: state.name,
        content: [...state.content].filter((x) => x?.id !== action.payload),
      };
    },
    UpdateProperty: (state, action) => {
      const {modified, index} = action.payload;
      console.log(action);
      state.content[index].properties = modified;
    },
  },
});

export const {AddElement, DeleteElement, UpdateProperty} = builderSlice.actions;

export default builderSlice.reducer;
