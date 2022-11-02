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

  addDeck = (deck) => {
    this.setState({ decks: [...this.state.decks, deck] });
  };

  removeDeck = (deckId) => {
    const remainingDecks = this.state.decks.filter(
      (deck) => deck.deck_id !== deckId
    );
    this.setState({ decks: remainingDecks });
  };

  sortDecks = (a, b) => {
    if (a.deck_id < b.deck_id) {
      return -1;
    } else if (b.deck_id < a.deck_id) {
      return 1;
    }
    return 0;
  };

  componentDidUpdate() {
    const { error } = this.props;
    if (error && error !== this.state.error) {
      this.setState({ error });
    }
  }

  componentDidMount() {
    const { userId } = this.props;
    fetch(`${mainUrl}/read-decks/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          this.setState({ decks: data.sort(this.sortDecks) });
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => {
        this.setState({ error: "Error fetching user's decks: 0" });
      });
  }

  render() {
    const { userId, selectDeck } = this.props;
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
                  definitionFirst={deck.definition_first}
                  deckPercentage={deck.deck_percentage}
                  termLanguage={deck.term_language}
                  definitionLanguage={deck.definition_language}
                  selectDeck={selectDeck}
                  removeDeck={this.removeDeck}
                />
              );
            })
          ) : (
            <></>
          )}
          <NewDeck userId={userId} addDeck={this.addDeck} />
        </MainCard>
      </>
    );
  }
}

export default Decks;
