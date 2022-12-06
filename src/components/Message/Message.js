import React from "react";
import "./Message.css";

const Message = ({
  message,
  wrapperClass = "",
  messageExtraClassName = "",
}) => {
  return (
    <>
      {message ? (
        <div className={`${wrapperClass}`}>
          <p className={`f6 w-100 message ${messageExtraClassName}`}>
            {message}
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Message;
