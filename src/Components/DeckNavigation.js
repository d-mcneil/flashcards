import React from "react";

const DeckNavigation = ({ onRouteChange }) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <p
          onClick={() => onRouteChange("decks")}
          className="f5 link dim black underline pa0 pb3 ma0 pointer"
        >
          Decks
        </p>
        <p
          onClick={() => onRouteChange("practice")}
          className="f5 link dim black underline pa0 pb3 mv0 pointer mr0 push"
        >
          Practice
        </p>
      </div>
    </>
  );
};

export default DeckNavigation;
