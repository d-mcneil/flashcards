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
      definitionFirst: false,
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

  toggleSwitch = () => {
    const definitionFirst = document.getElementById("definition-first");
    console.log(definitionFirst.checked);
    this.setState({ definitionFirst: definitionFirst.checked });
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
    const { definitionFirst } = this.state;
    let front;
    let back;
    if (totalCards) {
      if (definitionFirst) {
        front = currentCard.definition;
        back = currentCard.term;
      } else {
        front = currentCard.term;
        back = currentCard.definition;
      }
    }
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
                content={front}
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
                content={back}
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
          <div
            className="f3-ns f4 w-100 mt4 mb3"
            style={{ textAlign: "center" }}
          >
            Settings
          </div>
          <div
            className="w-100"
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
              gridTemplateColumns: "1fr auto 1fr",
            }}
          >
            <span
              className="pr2 f6 f5-ns settings-definition-first "
              style={{ justifySelf: "end" }}
            >
              Term First
            </span>
            <label className="switch">
              <input
                type="checkbox"
                value="definition-first"
                id="definition-first"
                onChange={this.toggleSwitch}
              ></input>
              <span className="slider round"></span>
            </label>
            <span
              className="pl2 f6 f5-ns settings-definition-first"
              style={{ justifySelf: "start" }}
            >
              Definition First
            </span>
          </div>
        </MainCard>
      </>
    );
  }
}

export default Practice;
