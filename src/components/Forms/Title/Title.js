import React from "react";
import "./Title.css";

const Title = ({ label }) => {
  return <legend className="form-title f1">{`${label}`}</legend>;
};

export default Title;
