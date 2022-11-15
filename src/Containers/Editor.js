import React from "react";
import { connect } from "react-redux";
// import Header from "../components/Header/Header";
import Message from "../components/Message/Message";
import NewDeckOrNewCard from "../components/NewDeckOrNewCard/NewDeckOrNewCard";
import { fetchCallCreateCard } from "../functions/fetchCalls";
import { addCard } from "../redux/actions";
import { validateCardInput } from "../functions/validateInput";
import DeckEditor from "../components/DeckEditor/DeckEditor";

const mapStateToProps = (state) => ({
  isPending: state.requestStatus.isPending,
  error: state.error.error,
  deckId: state.currentDeck.currentDeck.deckId,
  userId: state.userStatus.user.userId,
});

const mapDispatchToProps = (dispatch) => ({});

const Editor = ({ error, isPending, deckId, userId }) => {
  const message = isPending ? "Loading cards..." : error;

  return (
    <>
      {/* <Header text="Editor" /> */}
      <DeckEditor />
      {message ? (
        <Message message={message} wrapperClass="decks-error-message" />
      ) : (
        <></>
      )}
      <NewDeckOrNewCard
        userId={userId}
        deckId={deckId}
        validationCallback={validateCardInput}
        fetchCallback={fetchCallCreateCard}
        actionAddDeckOrCardCallback={addCard}
        idPropertyName="cardId"
        maxLengthMainField={255}
        maxLengthSecondaryField={255}
        mainFieldPlaceholder="Enter New Term"
        secondaryFieldPlaceholder="Enter New Definition"
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
