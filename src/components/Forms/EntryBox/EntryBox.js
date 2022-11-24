import React from "react";
import "./EntryBox.css";

const EntryBox = ({ label, type, onChange, onEnterSubmit }) => {
  const labelHtml = label.replace(" ", "-").toLowerCase();
  return (
    <div className="entry-box-outer f6">
      <label className="entry-box-label" htmlFor={`${labelHtml}`}>
        {`${label}`}
      </label>
      <input
        className="entry-box ba hover-white hover-bg-black input-reset"
        type={type}
        name={`${labelHtml}`}
        onChange={onChange}
        onKeyDown={onEnterSubmit}
        maxLength={100}
      />
    </div>
  );
};

export default EntryBox;
