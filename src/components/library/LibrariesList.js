import React from "react";
import { useSelector } from "react-redux";
import classes from "./LibrariesList.module.css";
import LibraryTile from "./LibraryTile";

const LibrariesList = () => {
  const libraries = useSelector((state) => state.librariesTemplate);
  if (!libraries) return <div>...loading</div>;
  return (
    <ul className={classes.list}>
      {libraries.map((lib) => {
        return (
          <li key={lib.libUUID}>
            <LibraryTile library={lib} />
          </li>
        );
      })}
    </ul>
  );
};

export default LibrariesList;
