import React from "react";
import classes from "./LibraryHeader.module.css";
import GoBack from "../buttons/GoBack";

const LibraryHeader = ({ library, mode }) => {
  const { name } = library;
  const linkingClass = mode === "linking" ? "linking" : "";
  const classesString = `${classes.header} ${classes[linkingClass]}`;
  return (
    <header className={classesString}>
      {mode !== "linking" && <GoBack />}
      {name}
    </header>
  );
};

export default LibraryHeader;
