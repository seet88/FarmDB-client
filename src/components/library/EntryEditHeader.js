import React from "react";
import GoBack from "../buttons/GoBack";
import classes from "./EntryEditHeader.module.css";

const EntryEditHeader = ({ setMode, actionButtonHandler }) => {
  const { cancelHandler, saveHandler } = actionButtonHandler;
  const cancelButtonHandler = () => {
    setMode("view");
    cancelHandler();
  };

  const saveButtonHandler = () => {
    setMode("view");
    saveHandler();
  };

  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <button onClick={saveButtonHandler} className={classes.save}>
          &#10003;
        </button>
        <div>Edit entry</div>
        <button onClick={cancelButtonHandler} className={classes.cancel}>
          Cancel
        </button>
        <GoBack />
      </div>
    </div>
  );
};

export default EntryEditHeader;
