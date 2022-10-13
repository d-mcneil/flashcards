import React, { Component } from "react";
import Deck from "../Components/Deck";
import MainCard from "../Components/MainCard";
import mainUrl from "../mainUrl";
import NewDeck from "../Components/NewDeck";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      currentDeck: "",
      error: "",
      route: "decks",
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

  onSelectDeck = (route, deckId) => {
    this.onRouteChange(route);
    this.setState({ currentDeck: deckId });
  };

  onRouteChange = (route) => {
    if (route === "decks") {
      this.setState({
        newDeckDescription: "",
        newDeckName: "",
        currentDeck: "",
      });
    }
    this.setState({ route });
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
    const { decks, currentDeck, route } = this.state;
    const { userId } = this.props;
    if (route === "practice") {
      return <></>;
    } else if (route === "edit") {
      return <></>;
    } else {
      return (
        <>
          <MainCard>
            <div style={{ textAlign: "center" }} className="f2 mb4">
              {"Decks"}
            </div>
            {Array.isArray(decks) && decks.length ? (
              decks.map((deck) => {
                return (
                  <Deck
                    key={`${deck.deck_id}-${deck.deck_name.replace(" ", "-")}`}
                    deckId={deck.deck_id}
                    userId={deck.user_id}
                    deckName={deck.deck_name}
                    description={deck.description}
                    onSelectDeck={this.onSelectDeck}
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
}

export default Home;
