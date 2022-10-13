import React, { Component } from "react";
import Deck from "../Components/Deck";
import MainCard from "../Components/MainCard";
import NewDeck from "../Components/NewDeck";
import Error from "../Components/Forms/Error";
import mainUrl from "../mainUrl";

class Decks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      error: "",
    };
  }

  addNewDeck = (deck) => {
    this.setState({ decks: [...this.state.decks, deck] });
  };

  removeDeck = (deckId) => {
    const remainingDecks = this.state.decks.filter(
      (deck) => deck.deck_id !== deckId
    );
    this.setState({ decks: remainingDecks });
  };

  componentDidMount() {
    const { userId } = this.props;
    fetch(`${mainUrl}/read-decks/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          this.setState({ decks: data });
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => {
        this.setState({ error: "Error fetching user's decks: 0" });
      });
  }

  render() {
    const { userId, onSelectDeck } = this.props;
    const { decks, error } = this.state;
    return (
      <>
        <MainCard>
          <div style={{ textAlign: "center" }} className="f2 mb4">
            {"Decks"}
          </div>
          {error ? (
            <div className={"mt0 pt0 mb3"}>
              <Error error={error} />
            </div>
          ) : (
            <></>
          )}
          {Array.isArray(decks) && decks.length ? (
            decks.map((deck) => {
              return (
                <Deck
                  key={`${deck.deck_id}-${deck.deck_name.replace(" ", "-")}`}
                  deckId={deck.deck_id}
                  userId={deck.user_id}
                  deckName={deck.deck_name}
                  description={deck.description}
                  onSelectDeck={onSelectDeck}
                  removeDeck={this.removeDeck}
                />
              );
            })
          ) : (
            <></>
          )}
          <NewDeck userId={userId} addNewDeck={this.addNewDeck} />
        </MainCard>
      </>
    );
  }
}

export default Decks;
