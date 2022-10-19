import React, { Component } from "react";
import DeckNavigation from "../Components/DeckNavigation";
import MainCard from "../Components/MainCard";
import Notecard from "../Components/Notecard";
import Flipcard from "../Components/Flipcard";
import Error from "../Components/Forms/Error";

class Practice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practiceCards: [],
      currentIndex: 1,
      error: "",
    };
  }

  setScoreError = (error) => {
    this.setState({ error });
  };

  changeCurrentIndex = (incrementValue, event) => {
    event.stopPropagation();
    const totalCards = this.state.practiceCards.length;
    const { currentIndex } = this.state;
    if (currentIndex === 1 && incrementValue < 0) {
      return;
    } else if (currentIndex === totalCards && incrementValue > 0) {
      return;
    }
    this.setState({ currentIndex: currentIndex + incrementValue });
  };

  componentDidMount() {
    const { cards } = this.props;
    this.setState({ practiceCards: cards });
  }

  render() {
    const { currentDeckName, onRouteChange, userId, updateScore } = this.props;
    const totalCards = this.state.practiceCards.length;
    const { currentIndex, error } = this.state;
    const currentCard = this.state.practiceCards.at(currentIndex - 1);
    return (
      <>
        <MainCard>
          <DeckNavigation editing={false} onRouteChange={onRouteChange} />
          <div
            style={{
              textAlign: "justify",
              textAlignLast: "center",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              paddingTop: "2px",
            }}
            className="f2 pb1 mb4"
          >
            {`${currentDeckName}`}
          </div>
          {error ? (
            <div className={"mt0 pt0 mb3"}>
              <Error error={error} />
            </div>
          ) : (
            <></>
          )}
          {totalCards > 0 ? (
            <Flipcard key={currentIndex}>
              <Notecard
                cardId={currentCard.card_id}
                score={currentCard.score}
                content={currentCard.term}
                userId={userId}
                totalCards={totalCards}
                changeCurrentIndex={this.changeCurrentIndex}
                setScoreError={this.setScoreError}
                updateScore={updateScore}
                currentIndex={currentIndex}
              />
              <Notecard
                cardId={currentCard.card_id}
                score={currentCard.score}
                content={currentCard.definition}
                userId={userId}
                totalCards={totalCards}
                changeCurrentIndex={this.changeCurrentIndex}
                setScoreError={this.setScoreError}
                updateScore={updateScore}
                currentIndex={currentIndex}
              />
            </Flipcard>
          ) : (
            <MainCard>
              <div className="f3-ns f4" style={{ textAlign: "center" }}>
                Add cards to this deck to practice!
              </div>
            </MainCard>
          )}
          <div>settings</div>
        </MainCard>
      </>
    );
  }
}

export default Practice;
