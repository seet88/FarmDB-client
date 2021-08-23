import React, { Fragment } from "react";

const CImage = ({ field }) => {
  if (!field?.value) return <div></div>;
  const addresses = String(field.value).split("\n");
  return (
    <Fragment>
      {addresses.map((src, idx) => (
        <img src={src} alt={src} width={325} key={idx}></img>
      ))}
    </Fragment>
  );
};

export default CImage;
