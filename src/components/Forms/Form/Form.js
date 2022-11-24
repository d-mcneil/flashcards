import React from "react";
import "./Form.css";

const Form = ({ children }) => {
  return (
    <>
      <fieldset className="form">
        {/* the input boxes for the register and sign-in forms */}
        {children.slice(0, -2)}
      </fieldset>
      {/* the submit button and error message for the register and sign-in forms */}
      {children.slice(-2)}
    </>
  );
};

export default Form;
