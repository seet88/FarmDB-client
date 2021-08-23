import React from "react";
import GoBack from "../buttons/GoBack";
import classes from "./EntryViewHeader.module.css";

const EntryViewHeader = ({ entry, setMode }) => {
  const editHandler = () => {
    setMode("edit");
  };

  return (
    <div className={classes.content}>
      <header className={classes.header}>
        <GoBack />
        {entry?.title}

        <button onClick={editHandler}>edit</button>

        <button>delete</button>
        <button>info</button>
      </header>
    </div>
  );
};

export default EntryViewHeader;
