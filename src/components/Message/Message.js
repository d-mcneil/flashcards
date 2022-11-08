import React from "react";
import "./Message.css";

const Message = ({ message, wrapperClass }) => {
  return (
    <>
      {message ? (
        <div className={`${wrapperClass}`}>
          <p className="f6 w-100 message">{message}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Message;
