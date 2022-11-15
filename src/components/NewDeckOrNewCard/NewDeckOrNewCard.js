import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useInputValueWithErrorReset as useInputValue } from "../../functions/hooks";
// prettier-ignore
import { setTextAreaHeight, onEnterCallback, onBlurSave } from "../../functions/repeatedFunctions";
import Message from "../Message/Message";
import "./NewDeckOrNewCard.css";

const mapDispatchToProps = (dispatch) => ({
  onSave: (deckOrCardObject, actionAddDeckOrCardCallback) =>
    dispatch(actionAddDeckOrCardCallback(deckOrCardObject)),
});

const NewDeckOrNewCard = ({
  onSave, // from mapDispatchToProps
  userId, // userId
  deckId, // undefined if component is for making a new deck, defined if for making a new card
  validationCallback, // validateDeckName or validateNewCardInput "../../functions/validateInput"
  fetchCallback, // fetchCallCreateDeck or fetchCallCreateCard from "../../functions/fetchCalls"
  actionAddDeckOrCardCallback, // addDeck or addCard from "../../redux/actions"
  idPropertyName, // deckId or cardId
  maxLengthMainField, // {100} for deck name or {255} for term
  maxLengthSecondaryField, // {undefined} for deck description or {255} for definition
  mainFieldPlaceholder, // "Enter New Deck Name" or "Enter New Term"
  secondaryFieldPlaceholder, // "Enter New Deck Description (Optional)" or "Enter New Definition"
}) => {
  const [error, setError] = useState("");
  const mainField = useInputValue("", error, () => setError(""));
  const secondaryField = useInputValue("", error, () => setError(""));

  const resetInput = () => {
    mainField.setValue("");
    secondaryField.setValue("");
    setError("");
    setTextAreaHeight("new-text-area");
  };

  const save = () => {
    const validity = validationCallback(mainField.value, secondaryField.value);
    // returns object with properties { valid, reason(not in every case) }
    if (!validity.valid) {
      if (validity.reason) {
        setError(validity.reason);
      }
      return;
    }
    fetchCallback(userId, mainField.value, secondaryField.value, deckId)
      .then((data) => {
        if (data[`${idPropertyName}`]) {
          onSave(data, actionAddDeckOrCardCallback);
          for (const item of document.getElementsByClassName(
            "reset-new-deck-or-card-info"
          )) {
            item.value = "";
          }
          resetInput();
        } else {
          setError(data);
        }
      })
      .catch((err) =>
        setError(`Error saving new ${idPropertyName.replace("Id", "")}: 0`)
      );
  };

  useEffect(() => setTextAreaHeight("new-text-area"), []);

  return (
    <div className="new-deck-or-card-grid center">
      {/* **************start deck name / card term***************** */}
      <input
        type="text"
        maxLength={maxLengthMainField}
        onChange={mainField.onChange}
        onKeyDown={(event) => onEnterCallback(event, save)}
        onBlur={(event) => onBlurSave(event, save)}
        placeholder={mainFieldPlaceholder}
        className="new-deck-name-or-card-term reset-new-deck-or-card-info f3-ns f4 outline-hover"
      ></input>

      {/* **************start deck description / card definition***************** */}
      <textarea
        maxLength={maxLengthSecondaryField}
        onChange={(event) => {
          setTextAreaHeight("new-text-area");
          secondaryField.onChange(event);
        }}
        onKeyDown={(event) => onEnterCallback(event, save)}
        onBlur={(event) => onBlurSave(event, save)}
        placeholder={secondaryFieldPlaceholder}
        className="new-deck-description-or-card-definition reset-new-deck-or-card-info outline-hover f6"
        id="new-text-area"
      ></textarea>

      {/* **************start save button***************** */}
      {/* alternate save button if I decide to get rid of the onBlur action for saving
        <div
            onClick={save}
            className="f6 f5-ns mt3 mb2 dim pointer"
            style={{ alignSelf: "end", justifySelf: "center" }}
          >
            Save
          </div> */}

      {/* **************start error notification***************** */}
      {error ? (
        <Message
          message={error}
          wrapperClass="new-deck-or-card-error-message"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default connect(null, mapDispatchToProps)(NewDeckOrNewCard);
