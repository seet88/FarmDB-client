import React from "react";
import { useDispatch } from "react-redux";
import { updateFieldValue } from "../../store/editedEntry-slice";

const CCheckbox = ({ field, mode }) => {
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

  console.log("values", field?.value);
  const isDisabled = mode === "view" ? "disabled" : "";
  const isChecked = field?.value === "1" ? "checked" : "";
  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        id={field.columnUUID}
        name={field.columnName}
        disabled={isDisabled}
        onChange={saveDataHandler}
      />
    </div>
  );
};

export default CCheckbox;
