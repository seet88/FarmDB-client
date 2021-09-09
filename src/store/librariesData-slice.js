import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const librariesDataSlice = createSlice({
  name: "librariesDataSlice",
  initialState,
  reducers: {
    updateAllLibrariesData(state, action) {
      action.payload.map((lib) => {
        const rowsData = [];
        lib.rows.map((row) => {
          const columnsFromJSON = JSON.parse(row.rowJSON);
          rowsData.push({
            rowUUID: row.rowUUID,
            fe_title: row.fe_title,
            fe_description: row.fe_description,
            ...columnsFromJSON,
          });
        });

        const libTemp = {
          name: lib.name,
          libUUID: lib.libUUID,
          rows: rowsData,
        };

        state.push(libTemp);
      });
    },
  },
});

export const { updateAllLibrariesData } = librariesDataSlice.actions;

export default librariesDataSlice.reducer;

export const getLibDataByLibraryId = (state, libUUID) => {
  return state.librariesData.find((lib) => lib.libUUID === libUUID);
};

export const getRowDataById = (state, { rowUUID, libUUID }) => {
  return state.librariesData
    .find((lib) => lib.libUUID === libUUID)
    .rows.find((row) => row.rowUUID === rowUUID);
};
