import React from "react";
import MainCard from "../Components/MainCard";
import DeckNavigation from "../Components/DeckNavigation";
import DeckEditor from "../Components/DeckEditor";
import CardEditor from "../Components/CardEditor";
import NewCard from "../Components/NewCard";

const Editor = ({
  currentDeckId,
  currentDeckName,
  currentDeckDescription,
  userId,
  cards,
  onRouteChange,
  updateDeckName,
  updateDeckDescription,
  addCard,
  removeCard,
  // updateCardTerm,
  // updateCardDefinition,
  updateCard,
  updateScore,
}) => {
  return (
    <>
      <MainCard>
        <DeckNavigation onRouteChange={onRouteChange} editing={true} />
        {/* <div
            style={{ textAlign: "justify", textAlignLast: "center" }}
            className="f2 mb4"
          >
            {`${currentDeckName}`}
          </div> */}
        {/* <div style={{ textAlign: "justify" }} className="f5 mb4">
            <em>{`${currentDeckDescription}`}</em>
          </div> */}
        <DeckEditor
          currentDeckName={currentDeckName}
          currentDeckDescription={currentDeckDescription}
          currentDeckId={currentDeckId}
          userId={userId}
          updateDeckName={updateDeckName}
          updateDeckDescription={updateDeckDescription}
        />
        {Array.isArray(cards) && cards.length ? (
          cards.map((card) => {
            return (
              <CardEditor
                key={`${card.card_id}-${card.term.replace(" ", "-")}`}
                cardId={card.card_id}
                currentTerm={card.term}
                currentDefinition={card.definition}
                score={card.score}
                userId={userId}
                removeCard={removeCard}
                // updateCardTerm={updateCardTerm}
                // updateCardDefinition={updateCardDefinition}
                updateCard={updateCard}
                updateScore={updateScore}
              />
            );
          })
        ) : (
          <></>
        )}
        <NewCard userId={userId} deckId={currentDeckId} addCard={addCard} />
      </MainCard>
    </>
  );
};

export default Editor;
