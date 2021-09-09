import React, { Fragment, useEffect } from "react";
import ShortEntryView from "./ShortEntryView";
import classes from "./EntriesList.module.css";
import { useSelector } from "react-redux";
import { addNewEntryLink } from "../../store/editedEntry-slice";
import LibraryHeader from "./LibraryHeader";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLibDataByLibraryId } from "../../store/librariesData-slice";

const EntriesList = ({
  libUUID,
  mode,
  parentColumnUUID,
  clickEntryLinkHandler,
}) => {
  const lacation = useLocation();
  if (mode !== "linking") libUUID = lacation?.state?.libUUID;
  console.log("libUUID", libUUID);
  const dispatch = useDispatch();

  const libData = useSelector((state) => getLibDataByLibraryId(state, libUUID));
  const library = {
    name: libData?.name,
  };

  const clickBoxHandler = (entry) => {
    if (mode === "linking") {
      console.log("entry", entry);
      const link = { ...entry, parentColumnUUID };
      dispatch(addNewEntryLink(link));
      clickEntryLinkHandler();
    }
  };
  const Box = ({ entry, children, clickHandler }) => {
    return <div onClick={() => clickHandler(entry)}>{children}</div>;
  };
  return (
    <Fragment>
      {<LibraryHeader library={library} mode={mode} />}
      <ul className={classes.list}>
        {libData?.rows.map((entry) => (
          <li key={entry.rowUUID} className={classes.entry}>
            <Box
              key={entry.rowUUID}
              entry={entry}
              clickHandler={clickBoxHandler}
            >
              <ShortEntryView
                entry={entry}
                libUUID={libData.libUUID}
                mode={mode}
              />
            </Box>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default EntriesList;
