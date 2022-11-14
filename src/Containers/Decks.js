import React, { Component } from "react";
import { connect } from "react-redux";
import { loadDecks, getDecksOrCardsRequest } from "../redux/actions";
import Message from "../components/Message/Message";
import Header from "../components/Header/Header";
import Deck from "../components/Deck/Deck";
import NewDeckOrNewCard from "../components/NewDeckOrNewCard/NewDeckOrNewCard";
// the following functions are passed down as props for the NewDeckOrNewCard component
import { fetchCallCreateDeck } from "../functions/fetchCalls";
import { validateDeckName } from "../functions/validateInput";
import { addDeck } from "../redux/actions";

const mapStateToProps = (state) => ({
  error: state.error.error,
  decks: state.decks.decks,
  isPending: state.requestStatus.isPending,
  decksHaveBeenFetched: state.decks.decksHaveBeenFetched,
  userId: state.userStatus.user.userId,
});

const mapDispatchToProps = (dispatch) => ({
  getDecks: (userId) =>
    dispatch(getDecksOrCardsRequest(userId, loadDecks, "decks")),
});

class Decks extends Component {
  componentDidMount() {
    const { getDecks, decksHaveBeenFetched } = this.props;
    if (!decksHaveBeenFetched) {
      getDecks(this.props.userId);
    }
  }

  render() {
    const { userId, decks, error, isPending } = this.props;
    const message = isPending ? "Loading decks..." : error;
    return (
      <>
        <Header text="Decks" />
        {message ? (
          <Message message={message} wrapperClass="decks-error-message" />
        ) : (
          <></>
        )}
        {Array.isArray(decks) && decks.length ? (
          decks.map((deck) => (
            <Deck key={deck.deckId} deck={deck} userId={userId} />
          ))
        ) : (
          <></>
        )}
        {/* <NewDeck /> */}
        <NewDeckOrNewCard
          userId={userId}
          deckId={undefined}
          validationCallback={validateDeckName}
          fetchCallback={fetchCallCreateDeck}
          actionAddDeckOrCardCallback={addDeck}
          idPropertyName="deckId"
          maxLengthMainField={100}
          maxLengthSecondaryField={undefined}
          mainFieldPlaceholder="Enter New Deck Name"
          secondaryFieldPlaceholder="Enter New Deck Description (Optional)"
        />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
