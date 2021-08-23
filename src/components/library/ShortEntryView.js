import React, { Fragment } from "react";
import classes from "./ShortEntryView.module.css";
import { Link } from "react-router-dom";

const ShortEntryView = ({ entry, mode, libUUID }) => {
  const content = (
    <Fragment>
      <h3 className={classes.title}>{entry?.fe_title}</h3>
      <div className={classes.secondLevel}>
        <div className={classes.description}>{entry.fe_description}</div>
        <div className={classes.status}>{entry.status}</div>
      </div>
    </Fragment>
  );
  if (mode === "linking") return <div className={classes.entry}>{content}</div>;
  else
    return (
      <Link
        to={{
          pathname: "/library/entry",
          state: {
            libUUID: libUUID,
            rowUUID: entry?.rowUUID,
            mode: "view",
          },
        }}
        className={classes.entry}
      >
        {content}
      </Link>
    );
};

export default ShortEntryView;
