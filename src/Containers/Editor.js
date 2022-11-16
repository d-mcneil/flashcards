import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header/Header";
import Message from "../components/Message/Message";
import NewDeckOrNewCard from "../components/NewDeckOrNewCard/NewDeckOrNewCard";
import { fetchCallCreateCard } from "../functions/fetchCalls";
import { addCard } from "../redux/actions";
import { validateCardInput } from "../functions/validateInput";
import DeckEditor from "../components/DeckEditor/DeckEditor";
import CardEditor from "../components/CardEditor/CardEditor";

const mapStateToProps = (state) => ({
  isPending: state.requestStatus.isPending,
  error: state.error.error,
  deckId: state.currentDeck.currentDeck.deckId,
  userId: state.userStatus.user.userId,
  cards: state.currentDeck.cards,
});

const mapDispatchToProps = (dispatch) => ({});

const Editor = ({ error, isPending, deckId, userId, cards }) => {
  const message = isPending ? "Loading cards..." : error;

  return (
    <>
      <Header text="Editor" />
      <DeckEditor />
      {message ? (
        <Message
          message={message}
          wrapperClass="main-error-message" // in index.css
        />
      ) : (
        <></>
      )}
      {Array.isArray(cards) && cards.length ? (
        cards.map((card) => {
          return (
            <CardEditor
              // key={`${card.cardId}-${card.term.replace(" ", "-")}`}
              key={card.cardId}
              cardId={card.cardId}
              score={card.score}
              currentTerm={card.term}
              currentDefinition={card.definition}
              userId={userId}
            />
          );
        })
      ) : (
        <></>
      )}
      <NewDeckOrNewCard
        userId={userId}
        deckId={deckId}
        validationCallback={validateCardInput}
        fetchCallback={fetchCallCreateCard}
        actionCallback={addCard}
        idPropertyName="cardId"
        maxLengthMainField={255}
        maxLengthSecondaryField={255}
        placeholderMainField="Enter New Term"
        placeholderSecondaryField="Enter New Definition"
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
