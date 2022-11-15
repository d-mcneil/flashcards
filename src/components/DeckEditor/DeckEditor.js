import React, { useEffect } from "react";
import { batch, connect } from "react-redux";
import { setError, resetError, updateCurrentDeck } from "../../redux/actions";
import { useInputValueWithErrorReset as useInputValue } from "../../functions/hooks";
import { validateDeckName } from "../../functions/validateInput";
// prettier-ignore
import { setTextAreaHeight, onEnterCallback, onBlurSave } from "../../functions/repeatedFunctions";
import { fetchCallUpdateDeckOrCard } from "../../functions/fetchCalls";
import "./DeckEditor.css";

const mapStateToProps = (state) => ({
  currentDeck: state.currentDeck.currentDeck,
  userId: state.userStatus.user.userId,
  error: state.error.error,
});

const mapDispatchToProps = (dispatch) => ({
  updateError: (error) => dispatch(setError(error)),
  updateDeck: (deckName, description) =>
    batch(() => {
      dispatch(updateCurrentDeck(deckName, description));
      dispatch(resetError());
    }),
  resetErrorIfNeeded: () => dispatch(resetError()),
});

// prettier-ignore
const DeckEditor = ({ currentDeck, userId, error, updateError, updateDeck, resetErrorIfNeeded }) => {
  const newDeckName = useInputValue("", error, resetErrorIfNeeded);
  const newDescription = useInputValue("", error, resetErrorIfNeeded);

  const { deckId } = currentDeck;
  const currentDeckName = currentDeck.deckName;
  const currentDescription = currentDeck.description;

  const saveChanges = () => {
    const newDeckNameValue = newDeckName.value;
    const newDescriptionValue = newDescription.value;

    // this prevents sending information to the server if it's exactly the same as what it already has
    if (newDeckNameValue === currentDeckName && newDescriptionValue === currentDescription) {return;}
    
    const validity = validateDeckName(newDeckNameValue, newDescriptionValue);
    if (!validity.valid) {
      if (validity.reason) {
        updateError(validity.reason);
      }
      return;
    }

    // prettier-ignore
    fetchCallUpdateDeckOrCard(userId, deckId, newDeckNameValue, newDescriptionValue, 'deck')
    .then(data => {
        if (data.deckId === deckId) {
            updateDeck(newDeckNameValue, newDescriptionValue);
        } else {
            updateError(data)
        }
    }).catch(err => updateError("Error updating deck: 0"))
  };

  useEffect(() => {
    newDeckName.setValue(currentDeckName);
    newDescription.setValue(currentDescription);
    setTextAreaHeight("name-area")
    setTextAreaHeight("description-area")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id='deck-editor-grid' className="center">
      {/* **************start deck name***************** */}
      <textarea
        className="f2 outline-hover"
        id="name-area"
        defaultValue={currentDeckName}
        placeholder="Enter Deck Name"
        onBlur={(event) => onBlurSave(event, saveChanges)}
        onKeyDown={(event) => onEnterCallback(event, saveChanges)}
        maxLength={100}
        onChange={(event) => {
          setTextAreaHeight("name-area");
          newDeckName.onChange(event)
        }}
      ></textarea>

      {/* **************start description***************** */}
      <textarea
        className="f5 outline-hover"
        id="description-area"
        placeholder="Enter Deck Description (Optional)"
        defaultValue={currentDescription}
        onBlur={(event) => onBlurSave(event, saveChanges)}
        onKeyDown={(event) => onEnterCallback(event, saveChanges)}
        onChange={(event) => {
          setTextAreaHeight("description-area");
          newDescription.onChange(event)
        }}
      ></textarea>
    </div>)
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckEditor);
