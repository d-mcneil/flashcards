import React from "react";
// prettier-ignore
import { onEnterCallback, onBlurSave, setTextAreaHeight } from "../../functions/repeatedFunctions";
import "./InputBoxes.css";

const SecondaryFieldInputBox = ({
  // this component is used in 3 cases: newDeck, newCard, and cardEditor
  // the inputs for each of the 3 cases are in the comments below
  saveCallback, // newDeck: save | newCard: save | cardEditor: saveChanges
  cardId = undefined, // newDeck: undefined | newCard: undefined | cardEditor: cardId
  maxLength, // newDeck: undefined | newCard: 255 | cardEditor: 255
  onChange, // secondaryField.onChange
  placeholder, // newDeck: "Enter New Deck Description (Optional)" | newCard: "Enter New Definition" | cardEditor: "Enter Definition"
  defaultValue = undefined, // newDeck: undefined | newCard: undefined | cardEditor: card.definition
  newItem = false, // newDeck: true | newCard: true | cardEditor: false
}) => {
  const newDeckOrNewCardResetClass = newItem
    ? "reset-new-deck-or-card-info"
    : "";

  const textAreaId = `text-area-${newItem ? "new" : cardId}`;

  return (
    <textarea
      maxLength={maxLength}
      onChange={(event) => {
        setTextAreaHeight(textAreaId);
        onChange(event);
      }}
      onKeyDown={(event) => onEnterCallback(event, saveCallback)}
      onBlur={(event) => onBlurSave(event, saveCallback)}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={`deck-description-or-card-definition outline-hover f6 ${newDeckOrNewCardResetClass}`}
      id={textAreaId}
    ></textarea>
  );
};

export default SecondaryFieldInputBox;
