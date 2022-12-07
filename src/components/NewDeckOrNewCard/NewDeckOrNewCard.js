import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useInputValueWithErrorReset as useInputValue } from "../../functions/hooks";
import { setTextAreaHeight } from "../../functions/repeatedFunctions";
import DeckOrCardGrid from "../DeckOrCardGrid/DeckOrCardGrid";
import MainFieldInputBox from "../InputBoxes/MainFieldInputBox";
import SecondaryFieldInputBox from "../InputBoxes/SecondaryFieldInputBox";
import Message from "../Message/Message";
import "./NewDeckOrNewCard.css";

const mapStateToProps = (state) => ({
  sampleUser: state.userStatus.sampleUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSave: (deckOrCardObject, actionCallback) =>
    dispatch(actionCallback(deckOrCardObject)),
});

const NewDeckOrNewCard = ({
  onSave, // from mapDispatchToProps
  sampleUser, // from mapStateToProps
  sampleUserNewDeckOrCardId, // keeps track of sampleUsers new decks and cards with their own id numbers
  userId, // userId
  deckId = undefined, // newDeck: undefined | newCard: deckId
  validationCallback, // newDeck: validateDeckName | newCard: validateCardInput from "../../functions/validateInput"
  fetchCallback, // newDeck: fetchCallCreateDeck | newCard: fetchCallCreateCard from "../../functions/fetchCalls"
  actionCallback, // newDeck: addDeck | newCard: addCard from "../../redux/actions";
  idPropertyName, // newDeck: deckId | newCard: cardId
  maxLengthMainField, // newDeck: 100 | newCard: 255
  maxLengthSecondaryField = undefined, // newDeck: undefined | newCard: 255
  placeholderMainField, // newDeck: "Enter New Deck Name" | newCard: "Enter New Term"
  placeholderSecondaryField, // newDeck: "Enter New Deck Description (Optional)" | newCard: "Enter New Definition"
}) => {
  const [error, setError] = useState("");
  const mainField = useInputValue("", error, () => setError(""));
  const secondaryField = useInputValue("", error, () => setError(""));

  // once a new card or new deck has been saved, the input needs to be cleared so another deck or card can be created
  const resetInput = () => {
    for (const item of document.getElementsByClassName(
      "reset-new-deck-or-card-info"
    )) {
      item.value = "";
    }
    mainField.setValue("");
    secondaryField.setValue("");
    setError("");
    setTextAreaHeight("text-area-new");
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
    if (sampleUser) {
      if (deckId) {
        // saving a card
        onSave(
          {
            cardId: sampleUserNewDeckOrCardId,
            score: 0,
            term: mainField.value,
            definition: secondaryField.value,
          },
          actionCallback
        );
      } else {
        // saving a deck
        onSave(
          {
            userId,
            deckId: sampleUserNewDeckOrCardId,
            deckName: mainField.value,
            description: secondaryField.value,
          },
          actionCallback
        );
      }
      resetInput();
      return;
    }
    fetchCallback(userId, mainField.value, secondaryField.value, deckId)
      .then((data) => {
        if (data[`${idPropertyName}`]) {
          onSave(data, actionCallback);
          resetInput();
        } else {
          setError(data);
        }
      })
      .catch((err) =>
        setError(`Error saving new ${idPropertyName.replace("Id", "")}: 0`)
      );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTextAreaHeight("text-area-new"), []);

  return (
    <DeckOrCardGrid newItem={true}>
      {/* **************start deck name / card term***************** */}
      <MainFieldInputBox
        saveCallback={save}
        maxLength={maxLengthMainField}
        onChange={mainField.onChange}
        placeholder={placeholderMainField}
        newItem={true}
      />

      {/* **************start deck description / card definition***************** */}
      <SecondaryFieldInputBox
        saveCallback={save}
        maxLength={maxLengthSecondaryField}
        onChange={secondaryField.onChange}
        placeholder={placeholderSecondaryField}
        newItem={true}
      />

      {/* **************start save button***************** */}
      {/* alternate save button if I decide to get rid of the onBlur action for saving
        <div onClick={save} className="f6 f5-ns mt3 mb2 dim pointer" style={{ alignSelf: "end", justifySelf: "center" }}>Save</div> */}

      {/* **************start error notification***************** */}
      {error ? (
        <Message
          message={error}
          wrapperClass="new-deck-or-card-error-message"
        />
      ) : (
        <></>
      )}
    </DeckOrCardGrid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckOrNewCard);
