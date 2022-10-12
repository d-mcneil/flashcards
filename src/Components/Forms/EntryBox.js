import React from "react";

const EntryBox = ({ label, onChange, onEnterSubmit, type }) => {
  const labelHtml = label.replace(" ", "-").toLowerCase();
  return (
    <>
      <div className="mt3">
        <label
          className="db fw6 lh-copy f6"
          htmlFor={`${labelHtml}`}
          style={{ textAlign: "start" }}
        >
          {`${label}`}
        </label>
        <input
          className={`${labelHtml} pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100`}
          type={type}
          name={`${labelHtml}`}
          onChange={onChange}
          onKeyDown={onEnterSubmit}
          maxLength={100}
        />
      </div>
    </>
  );
};

export default EntryBox;
