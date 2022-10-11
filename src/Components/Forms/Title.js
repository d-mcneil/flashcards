import React from "react";

const Title = ({ fontSize, label }) => {
  return (
    <>
      <legend
        style={{ textAlign: "center" }}
        className={`${fontSize} fw6 ph0 mh0`}
      >{`${label}`}</legend>
    </>
  );
};

export default Title;
