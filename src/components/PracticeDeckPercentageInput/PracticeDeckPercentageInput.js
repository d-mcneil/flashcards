import React from "react";
import "./PracticeDeckPercentageInput.css";

const PracticeDeckPercentageInput = ({}) => {
  return (
    <div id="deck-percentage-input-grid-wrapper" className="f6 f5-ns">
      <div id="deck-percentage-label-left">Practice</div>
      <input
        type="number"
        id="deck-percentage-input"
        className="ba outline-hover"
        min={1}
        max={100}
        defaultValue={""}
        placeholder={""}
        onBlur={""}
        onChange={""}
      ></input>
      <div id="deck-percentage-label-right">% of Deck</div>
    </div>
  );
};

export default PracticeDeckPercentageInput;
