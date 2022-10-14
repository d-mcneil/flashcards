import React, { Component } from "react";
import mainUrl from "../mainUrl";
import MainCard from "../Components/MainCard";
import Error from "../Components/Forms/Error";
import Card from "../Components/Card";
import NewCard from "../Components/NewCard";
import DeckNavigation from "../Components/DeckNavigation";
import Deck from "../Components/Deck";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "", cards: [] };
  }

  addNewCard = (card) => {
    this.setState({ cards: [...this.state.cards, card] });
  };

  removeCard = (cardId) => {
    const remainingCards = this.state.cards.filter(
      (card) => card.card_id !== cardId
    );
    this.setState({ cards: remainingCards });
  };

  componentDidMount() {
    const { currentDeckId } = this.props;
    fetch(`${mainUrl}/read-cards/${currentDeckId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          this.setState({ cards: data });
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => {
        this.setState({ error: "Error fetching cards from user's deck: 0" });
      });
  }

  render() {
    const {
      currentDeckId,
      currentDeckName,
      currentDeckDescription,
      userId,
      onRouteChange,
    } = this.props;
    const { error, cards } = this.state;
    return (
      <>
        <MainCard>
          <DeckNavigation onRouteChange={onRouteChange} />
          <div style={{ textAlign: "center" }} className="f2 mb4">
            {`${currentDeckName}`}
          </div>
          <div style={{ textAlign: "start" }} className="f5 mb4">
            <em>{`${currentDeckDescription}`}</em>
          </div>
          {error ? (
            <div className={"mt0 pt0 mb3"}>
              <Error error={error} />
            </div>
          ) : (
            <></>
          )}
          {Array.isArray(cards) && cards.length ? (
            cards.map((card) => {
              return (
                <Card
                  key={`${card.card_id}-${card.term.replace(" ", "-")}`}
                  cardId={card.card_id}
                  userId={card.user_id}
                  definition={card.definition}
                  term={card.term}
                  score={card.score}
                  removeCard={this.removeCard}
                />
              );
            })
          ) : (
            <></>
          )}
          <NewCard
            userId={userId}
            deckId={currentDeckId}
            addNewCard={this.addNewCard}
          />
        </MainCard>
      </>
    );
  }
}

export default Editor;
