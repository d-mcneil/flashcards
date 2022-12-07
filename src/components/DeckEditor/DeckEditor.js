import React, { useEffect } from "react";
import { batch, connect } from "react-redux";
// prettier-ignore
import { setError, resetError, updateCurrentDeck, updateDeckList } from "../../redux/actions";
import { useInputValueWithErrorReset as useInputValue } from "../../functions/hooks";
import { validateDeckName } from "../../functions/validateInput";
// prettier-ignore
import { setTextAreaHeight, onEnterCallback, onBlurSave, saveChangesDeckOrCard } from "../../functions/repeatedFunctions";
import "./DeckEditor.css";

const mapStateToProps = (state) => ({
  currentDeck: state.currentDeck.currentDeck,
  userId: state.userStatus.user.userId,
  error: state.error.error,
  sampleUser: state.userStatus.sampleUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateError: (error) => dispatch(setError(error)),
  updateDeck: (deckName, description, deckId) =>
    batch(() => {
      dispatch(updateCurrentDeck(deckName, description));
      dispatch(updateDeckList(deckName, description, deckId));
      dispatch(resetError());
    }),
  resetErrorIfNeeded: () => dispatch(resetError()),
});

// prettier-ignore
const DeckEditor = ({ currentDeck, userId, error, updateError, updateDeck, resetErrorIfNeeded, sampleUser }) => {
  const newDeckName = useInputValue("", error, resetErrorIfNeeded);
  const newDescription = useInputValue("", error, resetErrorIfNeeded);

  const { deckId } = currentDeck;
  const currentDeckName = currentDeck.deckName;
  const currentDescription = currentDeck.description;

  const saveChanges = () => {
    saveChangesDeckOrCard(currentDeckName, newDeckName.value, currentDescription, newDescription.value, validateDeckName, updateError, updateDeck, userId, deckId, 'deck', sampleUser)
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
        className="f3 outline-hover"
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
