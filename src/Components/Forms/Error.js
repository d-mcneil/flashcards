import React from "react";

const Error = ({ error }) => {
  return (
    <>
      {error ? (
        <div className="lh-copy mt3" style={{ textAlign: "center" }}>
          <p className="b mb0 f6 pt2 link black db">{error}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Error;
