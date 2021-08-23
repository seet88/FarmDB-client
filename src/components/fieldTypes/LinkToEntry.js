import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./LinkToEntry.module.css";
import ModalEntriesList from "../library/ModalEntriesList";
import { useDispatch } from "react-redux";
import { deleteEntryLink } from "../../store/editedEntry-slice";

const LinkToEntry = ({ field, mode, columnTemplate }) => {
  // const { libUUID, uniqueName } = entryLinks;
  // console.log("columnTemplate in LinkToEntry", columnTemplate);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const toggleShowModalHandler = () => {
    setShowModal(!showModal);
  };

  const deleteHandler = (e, entryIndex) => {
    console.log("delete link handler", entryIndex);
    e.preventDefault();
    dispatch(deleteEntryLink({ columnUUID: field?.columnUUID, entryIndex }));
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  let libUUID;
  // if (field?.entryLinks) libUUID = field?.entryLinks[0]?.libUUID;
  // else
  libUUID = columnTemplate?.options[0]?.dictionaryLibraryUUID;
  // console.log(
  //   "columnTemplate?.options[0]?.dictionaryLibraryUUID",
  //   columnTemplate?.options[0]?.dictionaryLibraryUUID
  // );
  return (
    <div>
      <ul className={classes.list}>
        {field.entryLinks?.map((entryLink, idx) => (
          <li className={classes.item} key={idx}>
            {/* <Link to={`/library/${entry?.libraryId}/entry/${entry?.id}`}> */}
            <Link
              to={{
                pathname: "/library/entry",
                state: {
                  libUUID: entryLink?.libUUID,
                  rowUUID: entryLink?.rowUUID,
                  mode: "view",
                },
              }}
              // className={classes.link}
            >
              <div className={classes.link}>
                <div className={classes.name}>{entryLink?.rowTitle}</div>
                {mode === "edit" && (
                  <button
                    className={classes.delete}
                    onClick={(event) => deleteHandler(event, idx)}
                  >
                    X
                  </button>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {mode === "edit" && (
        <button
          className={classes.viewEntryList}
          onClick={toggleShowModalHandler}
        >
          Add from list
        </button>
      )}
      {showModal && (
        <ModalEntriesList
          toggleShowModal={toggleShowModalHandler}
          libUUID={libUUID}
          columnUUID={field?.columnUUID}
        ></ModalEntriesList>
      )}
    </div>
  );
};

export default LinkToEntry;
