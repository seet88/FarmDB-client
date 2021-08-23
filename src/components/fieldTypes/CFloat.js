import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFieldValue } from "../../store/editedEntry-slice";

const CFloat = ({ field, mode }) => {
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

  const [value, setValue] = useState(Number(field?.value));

  useEffect(() => {
    if (mode !== "view") setValue(Number(field?.value));
  }, [mode]);

  const increaseNumberHandler = () => {
    let e = {};
    e.target = {};
    e.target.id = field.columnUUID;
    e.target.value = Number(value + 0.1);
    saveDataHandler(e);
    setValue(Number(value + 0.1));
  };
  const decreaseNumberHandler = () => {
    let e = {};
    e.target = {};
    e.target.id = field.columnUUID;
    e.target.value = Number(value - 0.1);
    saveDataHandler(e);
    setValue(Number(value - 0.1));
  };
  const inputNumberChangeHandler = (e) => {
    setValue(Number(e.target.value));
    saveDataHandler(e);
  };

  if (mode === "view") return <div>{field?.value}</div>;
  else
    return (
      <div>
        <input
          type="number"
          id={field.columnUUID}
          name={field.columnName}
          // onBlur={inputChangeHandler}
          // defaultValue={value}
          value={value}
          step="0.1"
          onChange={inputNumberChangeHandler}
        ></input>
        <button onClick={increaseNumberHandler}>+</button>
        <button onClick={decreaseNumberHandler}>-</button>
      </div>
    );
};
export default CFloat;
