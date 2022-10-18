import React, { Component } from "react";
import mainUrl from "../mainUrl";
import MainCard from "../Components/MainCard";
import Error from "../Components/Forms/Error";
import CardEditor from "../Components/CardEditor";
import NewCard from "../Components/NewCard";
import DeckNavigation from "../Components/DeckNavigation";
import DeckTitleAndDescriptionEditor from "../Components/DeckTitleAndDescriptionEditor";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      cards: [],
      newDeckName: "",
      newDeckDescription: "",
      changesToBeSaved: "false",
    };
  }

  checkValidInput = (deckName) => {
    if (!deckName) {
      this.setState({
        error: "Invalid submission: deck name is required",
      });
      return false;
    } else if (deckName.length > 100) {
      this.setState({
        error:
          "Invalid submission: deck name must be no more than 100 characters long",
      });
      return false;
    }
    return true;
  };

  onSaveDeckChanges = () => {
    const { newDeckName, newDeckDescription } = this.state;
    const { updateDeckInformation, userId, currentDeckId } = this.props;
    const valid = this.checkValidInput(newDeckName);
    if (!valid) {
      return;
    }
    fetch(`${mainUrl}/update-deck`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        deckId: currentDeckId,
        deckName: newDeckName,
        description: newDeckDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deck_id) {
          updateDeckInformation(newDeckName, newDeckDescription);
          this.setState({ changesToBeSaved: false, error: "" });
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => this.setState({ error: "Unable to update deck: 0" }));
  };

  checkChangesToBeSaved = (newDeckName, newDeckDescription) => {
    const { currentDeckName, currentDeckDescription } = this.props;
    if (
      currentDeckName === newDeckName &&
      currentDeckDescription === newDeckDescription
    ) {
      this.setState({ changesToBeSaved: false });
    } else {
      this.setState({ changesToBeSaved: true });
    }
  };

  onDeckNameChange = (event) => {
    const newDeckName = event.target.value;
    this.setState({ newDeckName });
    const { newDeckDescription } = this.state;
    this.checkChangesToBeSaved(newDeckName, newDeckDescription);
  };

  onDeckDescriptionChange = (event) => {
    const newDeckDescription = event.target.value;
    this.setState({ newDeckDescription: event.target.value });
    const { newDeckName } = this.state;
    this.checkChangesToBeSaved(newDeckName, newDeckDescription);
  };

  addNewCard = (card) => {
    this.setState({ cards: [...this.state.cards, card] });
  };

  removeCard = (cardId) => {
    const remainingCards = this.state.cards.filter(
      (card) => card.card_id !== cardId
    );
    this.setState({ cards: remainingCards });
  };

  sortCards = (a, b) => {
    if (a.card_id < b.card_id) {
      return -1;
    } else if (b.card_id < a.card_id) {
      return 1;
    }
    return 0;
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

  componentDidMount() {
    const { currentDeckId, currentDeckName, currentDeckDescription } =
      this.props;
    this.setState({
      newDeckName: currentDeckName,
      newDeckDescription: currentDeckDescription,
    });
    fetch(`${mainUrl}/read-cards/${currentDeckId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          this.setState({ cards: data.sort(this.sortCards) });
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
    const { error, cards, changesToBeSaved } = this.state;
    return (
      <>
        <MainCard>
          <DeckNavigation
            onRouteChange={onRouteChange}
            editing={true}
            onSaveDeckChanges={this.onSaveDeckChanges}
            changesToBeSaved={changesToBeSaved}
          />
          {/* <div
            style={{ textAlign: "justify", textAlignLast: "center" }}
            className="f2 mb4"
          >
            {`${currentDeckName}`}
          </div> */}
          {/* <div style={{ textAlign: "justify" }} className="f5 mb4">
            <em>{`${currentDeckDescription}`}</em>
          </div> */}
          <DeckTitleAndDescriptionEditor
            currentDeckName={currentDeckName}
            currentDeckDescription={currentDeckDescription}
            onDeckNameChange={this.onDeckNameChange}
            onDeckDescriptionChange={this.onDeckDescriptionChange}
          />
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
                <CardEditor
                  key={`${card.card_id}-${card.term.replace(" ", "-")}`}
                  cardId={card.card_id}
                  userId={userId}
                  currentDefinition={card.definition}
                  currentTerm={card.term}
                  score={card.score}
                  removeCard={this.removeCard}
                  updateCard={this.updateCard}
                  updateScore={this.updateScore}
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
