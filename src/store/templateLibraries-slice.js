import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const librariesTemplateSlice = createSlice({
  name: "librariesTemplate",
  initialState,
  reducers: {
    updateAllLibraries(state, action) {
      action.payload.map((lib) => state.push(lib));
    },
  },
});

export const { updateAllLibraries } = librariesTemplateSlice.actions;

export default librariesTemplateSlice.reducer;

export const selectLibraryById = (state, uuid) =>
  state.librariesTemplate?.find((lib) => lib.libUUID === uuid);
