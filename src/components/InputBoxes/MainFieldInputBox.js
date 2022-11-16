import React from "react";
import { onEnterCallback, onBlurSave } from "../../functions/repeatedFunctions";
import "./InputBoxes.css";

const MainFieldInputBox = ({
  // this component is used in 3 cases: newDeck, newCard, and cardEditor
  // the inputs for each of the 3 cases are in the comments below
  saveCallback, // newDeck: save | newCard: save | cardEditor: saveChanges
  maxLength, // newDeck: 100 | newCard: 255 | cardEditor: 255
  onChange, // mainField.onChange
  placeholder, // newDeck: "Enter New Deck Name" | newCard: "Enter New Term" | cardEditor: "Enter Term"
  defaultValue = undefined, // newDeck: undefined | newCard: undefined | cardEditor: card.term
  newItem = false, // newDeck: true | newCard: true | cardEditor: false
}) => {
  const newDeckOrNewCardResetClass = newItem
    ? "reset-new-deck-or-card-info"
    : "";

  return (
    <input
      type="text"
      maxLength={maxLength}
      onChange={onChange}
      onKeyDown={(event) => onEnterCallback(event, saveCallback)}
      onBlur={(event) => onBlurSave(event, saveCallback)}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={`deck-name-or-card-term f3-ns f4 outline-hover ${newDeckOrNewCardResetClass}`}
    ></input>
  );
};

export default MainFieldInputBox;
