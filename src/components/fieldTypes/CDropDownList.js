import React from "react";
import { useDispatch } from "react-redux";
import { updateFieldValue } from "../../store/editedEntry-slice";

const CDropDownList = ({ field, mode, options }) => {
  const dispatch = useDispatch();
  const saveDataHandler = (e) => {
    const data = {
      columnUUID: field.columnUUID,
      type: e.target.type,
      checked: e.target.checked,
      value: e.target.selectedIndex + 1,
    };
    dispatch(updateFieldValue(data));
  };

  const isDisabled = mode === "view" ? "disabled" : "";
  const selectedValue = options?.find(
    (option) => option.index === Number(field?.value)
  )?.value;

  return (
    <select
      name="dropDown"
      id="dropDown"
      defaultValue={selectedValue}
      disabled={isDisabled}
      onChange={saveDataHandler}
    >
      {options?.map((option) => {
        return (
          <option value={option.value} key={option.index}>
            {option.value}
          </option>
        );
      })}
    </select>
  );
};

export default CDropDownList;
