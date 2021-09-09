import React, { Fragment } from "react";
import EntriesList from "./EntriesList";
import classes from "./ModalEntriesList.module.css";
const ModalEntriesList = ({ toggleShowModal, libUUID, columnUUID }) => {
  return (
    <Fragment>
      <div className={classes.modal}>
        <EntriesList
          libUUID={libUUID}
          mode="linking"
          parentColumnUUID={columnUUID}
          clickEntryLinkHandler={toggleShowModal}
        ></EntriesList>
        <button onClick={toggleShowModal} className={classes.cancel}>
          &larr;
        </button>
      </div>
      <div className={classes.backdrop}></div>
    </Fragment>
  );
};

export default ModalEntriesList;
