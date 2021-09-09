import React from "react";

const CAudio = ({ value }) => {
  return (
    <audio controls>
      <source src={value} type="audio/ogg" />
    </audio>
  );
};

export default CAudio;
