import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

export const librariesRecordsSlice = createSlice({
  name: "librariesRecords",
  initialState,
  reducers: {
    test(state, action) {
      console.log("test reducers");
      console.log("state", state);
      console.log("action.payload", action.payload);
    },
    updateAllLibrariesRecords(state, action) {
      // console.log("updateAllLibrariesRecords action.payload", action.payload);
      // state = action.payload.map((lib) => state.push(lib));
      console.log("updateAllLibrariesRecords");
      state.items = action.payload;
    },
    updateLibraryRecord(state, action) {
      const { libUUID, rowUUID, editedFields } = action.payload;
      const oldState = { ...state.items };
      const libIndex = state.items.findIndex((lib) => lib.libUUID === libUUID);
      const rowIndex = state.items[libIndex].rows.findIndex(
        (row) => row.rowUUID === rowUUID
      );
      // const temp = [...state.items];
      const fields = oldState[libIndex].rows[rowIndex].columns.map((column) => {
        const { entryLinks, value } = editedFields.find((item) => {
          // console.log("item.field.columnUUID", item.field.columnUUID);
          // console.log("column.columnUUID", column.columnUUID);
          return item.field.columnUUID === column.columnUUID;
        }).field;
        // column.value = value;
        // column.entryLinks = entryLinks;
        return { ...column, value, entryLinks };
      });
      oldState[libIndex].rows[rowIndex].columns = fields;
      console.log("updateLibraryRecord");
      // state.items = JSON.parse(oldStateJson);
      // const oldStateJson = JSON.stringify(oldState.items);

      // state.items = { ...oldState };
      console.log("updateLibraryRecord 2");

      return void { ...state, items: oldState };
    },
  },
});

export const { test, updateAllLibrariesRecords, updateLibraryRecord } =
  librariesRecordsSlice.actions;

export default librariesRecordsSlice.reducer;

export const selectRowById = (state, { libUUID, entryUUID }) =>
  state.librariesRecords?.items
    ?.find((lib) => lib.libUUID === libUUID)
    ?.rows.find((row) => row.rowUUID === entryUUID);

export const selectRowsByLibraryId = (state, libUUID) =>
  state.librariesRecords?.items?.find((lib) => lib.libUUID === libUUID)?.rows;

export const selectLibrariesInfo = (state) => {
  return state?.librariesRecords?.items?.map((lib) => {
    return {
      name: lib.name,
      id: lib.id,
      uuid: lib.libUUID,
      entriesCount: lib?.rows?.length,
      lastModification: "",
    };
  });
};
