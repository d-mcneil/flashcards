import React, { Component } from "react";
import { connect } from "react-redux";
import { loadDecks, getDecksOrCardsRequest } from "../redux/actions";
import Message from "../components/Message/Message";
import Header from "../components/Header/Header";
import Deck from "../components/Deck/Deck";

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
            <Deck
              key={deck.deckId}
              {...deck}
              userId={userId}
              // deckId={deck.deck_id}
              // userId={deck.user_id}
              // deckName={deck.deck_name}
              // description={deck.description}
              // definitionFirst={deck.definition_first}
              // deckPercentage={deck.deck_percentage}
              // termLanguage={deck.term_language}
              // definitionLanguage={deck.definition_language}
              // selectDeck={selectDeck}
              // removeDeck={this.removeDeck}
            />
          ))
        ) : (
          <></>
        )}
        {/* <NewDeck userId={userId} addDeck={this.addDeck} /> */}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
