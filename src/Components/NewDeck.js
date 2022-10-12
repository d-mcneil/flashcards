import React from "react";

const NewDeck = ({
  onDeckNameChange,
  onDeckDescriptionChange,
  onAddNewDeck,
}) => {
  return (
    <>
      <div
        style={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}
        className="mh0 bt b--black-10"
      >
        {/* **************start deck name***************** */}
        <input
          type="text"
          maxLength={100}
          onChange={onDeckNameChange}
          placeholder="Enter New Deck Name"
          className="f3-ns f4 mt3 mb2 mr4 bn"
          style={{
            alignSelf: "end",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        ></input>
        {/* **************start save button***************** */}
        <div
          onClick={onAddNewDeck}
          className="f6 f5-ns mt3 mb2 link dim pointer"
          style={{ alignSelf: "end" }}
        >
          Save
        </div>
        {/* **************start description***************** */}
        <textarea
          onChange={onDeckDescriptionChange}
          placeholder="Enter New Deck Description"
          style={{
            alignSelf: "start",
            resize: "none",
          }}
          className="f6 mb0 mt2 mr4 bn"
          rows={3}
        ></textarea>
      </div>
    </>
  );
};

export default NewDeck;
