import React from "react";
import { useDispatch } from "react-redux";
import { updateFieldValue } from "../../store/editedEntry-slice";

const CDate = ({ field, mode }) => {
  const dispatch = useDispatch();
  const saveDataHandler = (e) => {
    const data = {
      columnUUID: field.columnUUID,
      type: e.target.type,
      checked: e.target.checked,
      value: e.target.value,
    };
    console.log("data", data);
    dispatch(updateFieldValue(data));
  };

  if (!field?.value) return <div></div>;
  console.log("field?.value", field?.value);
  const date = new Date(field?.value);
  const dateString = date.toISOString().replace("T", " ").split(" ")[0];
  console.log("dateString", dateString);
  if (mode === "view") return <div>{dateString}</div>;
  else
    return (
      <input
        type="date"
        id={field.columnUUID}
        name={field.columnName}
        onBlur={saveDataHandler}
        defaultValue={dateString}
      ></input>
    );
};

export default CDate;
