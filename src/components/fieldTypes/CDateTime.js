import React from "react";
import { useDispatch } from "react-redux";
import { updateFieldValue } from "../../store/editedEntry-slice";

const CDateTime = ({ field, mode }) => {
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

  if (!field?.value) return <div></div>;
  const date = new Date(field?.value);
  const dateString = date.toISOString().split(".")[0];
  if (mode === "view") return <div>{dateString.replace("T", " ")}</div>;
  else
    return (
      <input
        type="datetime-local"
        id={field.columnUUID}
        name={field.columnName}
        onBlur={saveDataHandler}
        defaultValue={dateString}
      ></input>
    );
};

export default CDateTime;
