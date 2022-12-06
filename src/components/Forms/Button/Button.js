import React from "react";
import "./Button.css";

const Button = ({
  label,
  onClick,
  onEnterSubmit = undefined,
  wrapperExtraClassName = "",
  buttonExtraClassName = "",
}) => {
  return (
    <>
      <div className={`submit-button-outer ${wrapperExtraClassName}`}>
        <input
          className={`input-reset ba grow f6 submit-button ${buttonExtraClassName}`}
          type="submit"
          value={`${label}`}
          onClick={onClick}
          onKeyDown={onEnterSubmit}
        />
      </div>
    </>
  );
};

export default Button;
