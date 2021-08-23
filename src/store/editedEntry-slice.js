import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

export const editedEntrySlice = createSlice({
  name: "editedEntry",
  initialState,
  reducers: {
    updateFieldValue(state, action) {
      const { columnUUID, value: valueIn, type, checked } = action.payload;
      const fieldIndex = state.items.findIndex(
        (field) => field.field.columnUUID === columnUUID
      );
      let value = valueIn;
      if (type === "date" || type === "datetime-local")
        value = Date.parse(value);
      else if (type === "checkbox") value = checked ? "1" : "0";
      if (fieldIndex >= 0) {
        state.items[fieldIndex].field.value = String(value);
      }
    },
    updateEntryValues(state, action) {
      state.items = action.payload;
    },
    addNewEntryLink(state, action) {
      const { parentColumnUUID, rowUUID, fe_title } = action.payload;
      const link = {
        rowUUID,
        columnUUID: parentColumnUUID,
        rowTitle: fe_title,
      };
      console.log("linkENtry: ", link);
      const fieldIndex = state.items.findIndex((field) => {
        return field.field.columnUUID === parentColumnUUID;
      });
      if (fieldIndex >= 0) {
        if (state.items[fieldIndex].field?.entryLinks)
          state.items[fieldIndex].field?.entryLinks?.push(link);
        else {
          const entryLinks = [];
          entryLinks.push(link);
          state.items[fieldIndex].field.entryLinks = entryLinks;
        }
      }
    },

    deleteEntryLink(state, action) {
      const { columnUUID, entryIndex } = action.payload;

      const fieldIndex = state.items.findIndex((field) => {
        return field.field.columnUUID === columnUUID;
      });
      if (fieldIndex >= 0 && entryIndex >= 0)
        state.items[fieldIndex].field?.entryLinks?.splice(entryIndex, 1);
    },
  },
});

export const {
  updateFieldValue,
  updateEntryValues,
  addNewEntryLink,
  deleteEntryLink,
} = editedEntrySlice.actions;

export default editedEntrySlice.reducer;

export const selectAllFields = (state) => state.editedEntry?.items;
