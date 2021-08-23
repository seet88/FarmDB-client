import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectRowById,
  updateLibraryRecord,
} from "../../store/librariesRecords-slice";
import { selectLibraryById } from "../../store/templateLibraries-slice";
import {
  updateEntryValues,
  selectAllFields,
} from "../../store/editedEntry-slice";
import CFloat from "../fieldTypes/CFloat";
import CInt from "../fieldTypes/CInt";
import CString from "../fieldTypes/CString";
import CImage from "../fieldTypes/CImage";
import CDate from "../fieldTypes/CDate";
import CDateTime from "../fieldTypes/CDateTime";
import CBarcode from "../fieldTypes/CBarcode";
import CAudio from "../fieldTypes/CAudio";
import CCheckbox from "../fieldTypes/CCheckbox";
import CDropDownList from "../fieldTypes/CDropDownList";
import LinkToEntry from "../fieldTypes/LinkToEntry";
import EntryViewHeader from "./EntryViewHeader";
import classes from "./SingleEntryPage.module.css";
import { useLocation } from "react-router-dom";
import EntryEditHeader from "./EntryEditHeader";
import { useDispatch } from "react-redux";
import { getRowDataById } from "../../store/librariesData-slice";

const setComponentByType = (column, field, mode, options) => {
  switch (column.type) {
    case "string":
      return <CString mode={mode} field={field}></CString>;
    case "float":
      return <CFloat mode={mode} field={field}></CFloat>;
    case "int":
      return <CInt mode={mode} field={field}></CInt>;
    case "image":
      return <CImage value={field.value} mode={mode} field={field}></CImage>;
    case "date":
      return <CDate mode={mode} field={field}></CDate>;
    case "dateTime":
      return <CDateTime mode={mode} field={field}></CDateTime>;
    case "barcode":
      return (
        <CBarcode value={field.value} mode={mode} field={field}></CBarcode>
      );
    case "audio":
      return <CAudio value={field.value} mode={mode} field={field}></CAudio>;
    case "checkbox":
      return <CCheckbox mode={mode} field={field}></CCheckbox>;
    case "dropDownList":
      return (
        <CDropDownList
          mode={mode}
          field={field}
          options={options}
        ></CDropDownList>
      );
    case "libEntry":
      // console.log("insetComponentByType - column: ", column);
      return (
        <LinkToEntry
          mode={mode}
          field={field}
          columnTemplate={column}
        ></LinkToEntry>
      );
    default:
      return <div>----</div>;
  }
};

const SingleEntryPage = () => {
  const location = useLocation();
  const { rowUUID, libUUID } = location.state;
  const dispatch = useDispatch();
  console.log(location.state);

  const { columns: columnsTemplates } = useSelector((state) =>
    selectLibraryById(state, libUUID)
  );
  const row = useSelector((state) =>
    getRowDataById(state, { rowUUID, libUUID })
  );
  const [mode, setMode] = useState("view");

  const entry = { title: row.fe_title, libUUID, rowUUID };

  const fieldsInit = columnsTemplates?.map((columnTemplate) => {
    let options = [];
    // console.log(
    //   "row[columnTemplate.sqlFieldName]",
    //   row[columnTemplate.sqlFieldName]
    // );
    if (columnTemplate?.type === "libEntry")
      options = columnTemplate?.options[0].dictionaryLibraryName;
    else if (columnTemplate?.type === "dropDownList")
      options = columnTemplate?.options;
    return {
      type: columnTemplate?.type,
      name: columnTemplate?.name,
      order: columnTemplate?.order,
      columnTemplate: columnTemplate,
      options,
      field: {
        value: row[columnTemplate.sqlFieldName],
        columnUUID: columnTemplate?.columnUUID,
        columnName: columnTemplate?.name,
        entryLinks: row[columnTemplate.sqlFieldName]?.entrylinks,
      },
    };
  });

  useEffect(() => {
    dispatch(updateEntryValues(fieldsInit));
  }, []);

  useEffect(() => {
    // if (mode === "edit") {
    dispatch(updateEntryValues(fieldsInit));
    // }
  }, [rowUUID, libUUID]);

  const cancelHandler = () => {
    console.log("fieldsInit", fieldsInit);
    dispatch(updateEntryValues(fieldsInit));
  };
  const saveHandler = () => {
    console.log("clicked save button");
    const editedEntry = {
      editedFields: fields,
      libUUID,
      rowUUID,
    };
    dispatch(updateLibraryRecord(editedEntry));
  };

  const fields = useSelector((state) => selectAllFields(state));

  console.log("fields", fields);

  // useEffect(() => {}, [fields]);

  return (
    <Fragment>
      {mode === "view" && <EntryViewHeader entry={entry} setMode={setMode} />}
      {mode === "edit" && (
        <EntryEditHeader
          entry={entry}
          setMode={setMode}
          actionButtonHandler={{ cancelHandler, saveHandler }}
        />
      )}
      <ul className={classes.list}>
        {fields?.map((field) => {
          return (
            <li key={field.order} className={classes.field}>
              <div className={classes.firstRow}>
                <div className={classes.columnName}>{field.name}</div>
                {field?.type === "libEntry" && (
                  <div className={classes.linkEntryName}>{field?.options}</div>
                )}
              </div>
              {setComponentByType(
                field.columnTemplate,
                field.field,
                mode,
                field.options
              )}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default SingleEntryPage;
