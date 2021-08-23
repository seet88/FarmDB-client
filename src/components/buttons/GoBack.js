import React from "react";
import { useHistory } from "react-router-dom";

const GoBack = () => {
  const history = useHistory();
  return <button onClick={() => history.goBack()}>&larr;</button>;
};

export default GoBack;
