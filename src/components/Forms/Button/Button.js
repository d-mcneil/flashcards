import React from "react";
import "./Button.css";

const Button = ({ label, onClick, onEnterSubmit = undefined }) => {
  return (
    <>
      <div className="submit-button-outer">
        <input
          className="input-reset ba grow f6 submit-button"
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
