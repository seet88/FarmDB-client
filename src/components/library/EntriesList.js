import React, { Fragment, useEffect } from "react";
import ShortEntryView from "./ShortEntryView";
import classes from "./EntriesList.module.css";
import { useSelector } from "react-redux";
import { selectRowsByLibraryId } from "../../store/librariesRecords-slice";
import { selectLibraryById } from "../../store/templateLibraries-slice";
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
  // return <div>{state}</div>;
  /*
  const getColumnsValueByColumnName = (columns, descriptionColumn) => {
    let descriptionValue;

    columns.forEach((column) => {
      if (
        String(column.columnName).toUpperCase() ===
        String(descriptionColumn?.name).toUpperCase()
      )
        if (descriptionColumn.type === "libEntry") {
          descriptionValue = column?.entryLinks
            ?.map((link) => link.uniqueName)
            ?.join(", ");
        } else descriptionValue = column.value;
    });

    return { descriptionValue };
  };

  const calcEntries = (rows, descriptionColumn) => {
    const entries = [];

    rows.forEach((row) => {
      const { descriptionValue } = getColumnsValueByColumnName(
        row.columns,
        descriptionColumn
      );

      entries.push({
        title: row.uniqueName,
        description: descriptionValue,
        rowUUID: row.rowUUID,
        libUUID,
      });
    });

    return entries;
  };
*/
  const libData = useSelector((state) => getLibDataByLibraryId(state, libUUID));
  const library = {
    name: libData?.name,
  };
  /*
  const { columns } = useSelector((state) => selectLibraryById(state, libUUID));

  // const titleColumn = columns.find((column) => column.usage === "title")?.name;
  const descriptionColumn = columns.find(
    (column) => column.usage === "description"
  );

  const libraryTemplate = useSelector((state) =>
    state.librariesTemplate?.find((lib) => lib.libUUID === libUUID)
  );
  const library = {
    name: libraryTemplate?.name,
  };
  */
  /*
  let entriesList = calcEntries(rows, descriptionColumn);

  useEffect(() => {
    entriesList = calcEntries(rows, descriptionColumn);
  }, [rows, descriptionColumn]);
*/
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
  console.log("libData", libData);
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
