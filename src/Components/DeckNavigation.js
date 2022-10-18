import React from "react";

const DeckNavigation = ({
  onRouteChange,
  editing,
  changesToBeSaved,
  onSaveDeckChanges,
}) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <p
          onClick={() => onRouteChange("decks")}
          className="f5 link dim black underline pa0 pb3 ma0 pointer"
        >
          Decks
        </p>
        {changesToBeSaved === true ? (
          <p
            onClick={onSaveDeckChanges}
            className="f5 link dim black underline pa0 pb3 mv0 pointer mr0 push"
          >
            Save
          </p>
        ) : (
          <></>
        )}
        {editing ? (
          <p
            onClick={() => onRouteChange("practice")}
            className="f5 link dim black underline pa0 pb3 mv0 pointer mr0 push"
          >
            Practice
          </p>
        ) : (
          <p
            onClick={() => onRouteChange("editor")}
            className="f5 link dim black underline pa0 pb3 mv0 pointer mr0 push"
          >
            Edit
          </p>
        )}
      </div>
    </>
  );
};

export default DeckNavigation;
