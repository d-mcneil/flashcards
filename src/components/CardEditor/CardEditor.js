import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { updateCard, removeCard } from "../../redux/actions";
import { useInputValueWithErrorReset as useInputValue } from "../../functions/hooks";
import { fetchCallDelete } from "../../functions/fetchCalls";
// prettier-ignore
import {setTextAreaHeight, saveChangesDeckOrCard } from "../../functions/repeatedFunctions";
import { validateCardInput } from "../../functions/validateInput";
import DeckOrCardGrid from "../DeckOrCardGrid/DeckOrCardGrid";
import MainFieldInputBox from "../InputBoxes/MainFieldInputBox";
import SecondaryFieldInputBox from "../InputBoxes/SecondaryFieldInputBox";
import Message from "../Message/Message";
import DeleteButton from "../DeleteButton/DeleteButton";
import ScoreCounter from "../ScoreCounter/ScoreCounter";
import "./CardEditor.css";

const mapDispatchToProps = (dispatch) => ({
  onDelete: (cardId) => dispatch(removeCard(cardId)),
  onSave: (...args) => dispatch(updateCard(...args)),
  //   onUpdateScore: (cardId, incrementValue) =>
  //     dispatch(updateCardScore(cardId, incrementValue)),
});

// prettier-ignore
const CardEditor = ({ onSave, onDelete, userId, cardId, score, currentTerm, currentDefinition }) => {
  const [error, setError] = useState("");
  const newTerm = useInputValue("", error, () => setError(""));
  const newDefinition = useInputValue("", error, () => setError(""));

  const textAreaId = `text-area-${cardId}`;

  const saveChanges = () => {
    saveChangesDeckOrCard(currentTerm, newTerm.value, currentDefinition, newDefinition.value, validateCardInput, setError, onSave, userId, cardId, 'card')
  };

  const deleteCard = () => {
    fetchCallDelete(userId, cardId, "card")
      .then((data) => {
        if (data.cardId === cardId) {
          onDelete(cardId);
        } else {
          setError(data);
        }
      })
      .catch((err) => setError("Error deleting card: 0"));
  };

  useEffect(() => {
    newTerm.setValue(currentTerm);
    newDefinition.setValue(currentDefinition);
    setTextAreaHeight(textAreaId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DeckOrCardGrid>
      {/* **************start term***************** */}
      <MainFieldInputBox
        saveCallback={saveChanges}
        maxLength={255}
        onChange={newTerm.onChange}
        placeholder={"Enter Term"}
        defaultValue={currentTerm}
      />

      {/* **************start definition***************** */}
      <SecondaryFieldInputBox
        saveCallback={saveChanges}
        cardId={cardId}
        maxLength={255}
        onChange={newDefinition.onChange}
        placeholder={"Enter Definition"}
        defaultValue={currentDefinition}
      />

      {/* **************start score counter***************** */}
      <ScoreCounter 
      score={score}
      cardId={cardId}
      userId={userId}
      setErrorCallback={setError}
      wrapperClass='score-counter-wrapper-card-editor f6 f5-ns'
      />

      {/* **************start delete button***************** */}
      <DeleteButton deleteCallback={deleteCard} />

      {/* **************start error message***************** */}
      {error ? (
        <Message
          message={error}
          wrapperClass="main-error-message" // in index.css
        />
      ) : (
        <></>
      )}
    </DeckOrCardGrid>
  );
};

export default connect(null, mapDispatchToProps)(CardEditor);
