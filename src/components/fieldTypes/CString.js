import React from "react";
import { useDispatch } from "react-redux";
import { updateFieldValue } from "../../store/editedEntry-slice";

const CString = ({ field, mode, inputChangeHandler }) => {
  const dispatch = useDispatch();
  const saveDataHandler = (e) => {
    const data = {
      columnUUID: field.columnUUID,
      type: e.target.type,
      checked: e.target.checked,
      value: e.target.value,
    };
    dispatch(updateFieldValue(data));
  };
  const colsText = 40;
  let rowsText = 1;
  if (field?.value) rowsText = Math.ceil(field?.value?.length / colsText);
  if (mode === "view") return <div>{field?.value}</div>;
  else
    return (
      <textarea
        id={field.columnUUID}
        name={field.columnName}
        onBlur={saveDataHandler}
        defaultValue={field?.value}
        rows={rowsText}
        cols={colsText}
      ></textarea>
    );
};

export default CString;
