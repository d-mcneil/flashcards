import React, { Component } from "react";
import Practice from "./Practice";
import Editor from "./Editor";
import Decks from "./Decks";
import mainUrl from "../mainUrl";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDeckId: "",
      currentDeckName: "",
      currentDeckDescription: "",
      currentDeckSettings: {},
      cards: [],
      error: "",
      route: "decks",
    };
  }

  initialState = {
    currentDeckId: "",
    currentDeckName: "",
    currentDeckDescription: "",
    currentDeckSettings: {},
    cards: [],
    error: "",
    route: "decks",
  };

  updateDeckName = (newDeckName) => {
    this.setState({
      currentDeckName: newDeckName,
    });
  };

  updateDeckDescription = (newDeckDescription) => {
    this.setState({
      currentDeckDescription: newDeckDescription,
    });
  };

  updateDeckSettings = (definitionFirst, deckPercentage) => {
    this.setState({ currentDeckSettings: { definitionFirst, deckPercentage } });
  };

  onRouteChange = (route) => {
    if (route === "decks") {
      this.setState(this.initialState);
    } else {
      this.setState({ route });
    }
  };

  sortCards = (a, b) => {
    if (a.card_id < b.card_id) {
      return -1;
    } else if (b.card_id < a.card_id) {
      return 1;
    }
    return 0;
  };

  addCard = (card) => {
    this.setState({ cards: [...this.state.cards, card] });
  };

  removeCard = (cardId) => {
    const remainingCards = this.state.cards.filter(
      (card) => card.card_id !== cardId
    );
    this.setState({ cards: remainingCards });
  };

  updateCard = (cardId, term, definition) => {
    const { cards } = this.state;
    const updatedCards = cards.map((card) => {
      if (card.card_id !== cardId) {
        return card;
      } else {
        card.term = term;
        card.definition = definition;
        return card;
      }
    });
    this.setState({ cards: updatedCards });
  };

  // updateCardTerm = (cardId, term) => {
  //   const { cards } = this.state;
  //   const updatedCards = cards.map((card) => {
  //     if (card.card_id !== cardId) {
  //       return card;
  //     } else {
  //       card.term = term;
  //       return card;
  //     }
  //   });
  //   this.setState({ cards: updatedCards });
  // };

  // updateCardDefinition = (cardId, definition) => {
  //   const { cards } = this.state;
  //   const updatedCards = cards.map((card) => {
  //     if (card.card_id !== cardId) {
  //       return card;
  //     } else {
  //       card.definition = definition;
  //       return card;
  //     }
  //   });
  //   this.setState({ cards: updatedCards });
  // };

  updateScore = (cardId, incrementValue) => {
    const { cards } = this.state;
    const updatedCards = cards.map((card) => {
      if (card.card_id !== cardId) {
        return card;
      } else {
        card.score += incrementValue;
        return card;
      }
    });
    this.setState({ cards: updatedCards });
  };

  selectDeck = (
    route,
    deckId,
    deckName,
    description,
    definitionFirst,
    deckPercentage
  ) => {
    fetch(`${mainUrl}/read-cards/${deckId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          this.setState({
            cards: data.sort(this.sortCards),
            error: "",
            currentDeckId: deckId,
            currentDeckName: deckName,
            currentDeckDescription: description,
            currentDeckSettings: { definitionFirst, deckPercentage },
          });
          this.onRouteChange(route);
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => {
        this.setState({ error: "Error fetching cards from user's deck: 0" });
      });
  };

  render() {
    const {
      currentDeckId,
      currentDeckDescription,
      currentDeckName,
      currentDeckSettings,
      route,
      cards,
      error,
    } = this.state;
    const { userId } = this.props;
    if (route === "practice") {
      return (
        <Practice
          currentDeckId={currentDeckId}
          currentDeckDescription={currentDeckDescription}
          currentDeckName={currentDeckName}
          definitionFirst={currentDeckSettings.definitionFirst}
          deckPercentage={currentDeckSettings.deckPercentage}
          userId={userId}
          onRouteChange={this.onRouteChange}
          updateScore={this.updateScore}
          updateDeckSettings={this.updateDeckSettings}
          cards={cards}
        />
      );
    } else if (route === "editor") {
      return (
        <Editor
          userId={userId}
          currentDeckId={currentDeckId}
          currentDeckDescription={currentDeckDescription}
          currentDeckName={currentDeckName}
          onRouteChange={this.onRouteChange}
          updateDeckName={this.updateDeckName}
          updateDeckDescription={this.updateDeckDescription}
          cards={cards}
          addCard={this.addCard}
          removeCard={this.removeCard}
          // updateCardTerm={this.updateCardTerm}
          // updateCardDefinition={this.updateCardDefinition}
          updateCard={this.updateCard}
          updateScore={this.updateScore}
        />
      );
    } else {
      return (
        <Decks userId={userId} selectDeck={this.selectDeck} error={error} />
      );
    }
  }
}

export default Home;
