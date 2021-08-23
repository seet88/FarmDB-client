import React, { useState } from "react";
import classes from "./LibraryTileOptions.module.css";

const LibraryTileOptions = () => {
  const [active, setActive] = useState(false);

  const showOptionHandler = (e) => {
    setActive(!active);
    e.preventDefault();
  };

  const opt1Handler = (e) => {
    setActive(!active);
    e.preventDefault();
  };

  if (!active)
    return (
      <button onClick={showOptionHandler}>
        <div className={classes.menuIcon}></div>
        <div className={classes.menuIcon}></div>
        <div className={classes.menuIcon}></div>
      </button>
    );
  else
    return (
      <div className={classes.list}>
        <button onClick={opt1Handler}>Opt1 sad sadsa sad</button>
        <button onClick={opt1Handler}>Opt2</button>
        <button onClick={opt1Handler}>Opt3</button>
        <button onClick={opt1Handler}>Opt3</button>
      </div>
    );
};

export default LibraryTileOptions;
