import React from "react";

const Button = ({ label, onClick, onEnterSubmit }) => {
  return (
    <>
      <div className="mt3" style={{ textAlign: "center" }}>
        <input
          className="b ph3 pv2 input-reset br1 ba b--black bg-transparent grow pointer f6 dib"
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
