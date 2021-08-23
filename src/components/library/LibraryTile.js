import React from "react";
import LibraryTileOptions from "../buttons/LibraryTileOptions";
import classes from "./LibraryTile.module.css";
import { Link } from "react-router-dom";

const src = "https://img.icons8.com/ios/452/field.png";

const LibraryTile = ({ library }) => {
  return (
    <Link
      to={{
        pathname: "/library",
        state: { libUUID: library?.libUUID },
      }}
    >
      <div className={classes.tile}>
        <div className={classes.leftSide}>
          <img src={src} alt="" height="50" width="50"></img>
          <h4 className={classes.name}>{library?.name}</h4>
          <p className={classes.entriesCount}>
            Wpisow: {library?.entriesCount}
          </p>
          <p className={classes.lastModification}>
            {library?.lastModification}
          </p>
        </div>
        <div className={classes.rightSide}>
          <LibraryTileOptions />
          <button>+</button>
        </div>
      </div>
    </Link>
  );
};

export default LibraryTile;
