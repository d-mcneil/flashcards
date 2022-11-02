import React, { Component } from "react";
import DeckNavigation from "../Components/DeckNavigation";
import MainCard from "../Components/MainCard";
import Notecard from "../Components/Notecard";
import Flipcard from "../Components/Flipcard";
import Error from "../Components/Forms/Error";
import mainUrl from "../mainUrl";
import PracticeSettings from "./PracticeSettings";

class Practice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practiceCards: [],
      currentIndex: 1,
      scoreError: "",
      settingsError: "",
      definitionFirst: false,
      deckPercentage: 100,
      termLanguage: "Google US English",
      definitionLanguage: "Google US English",
      speechSynthesisVoices: [],
      termVoice: {},
      definitionVoice: {},
    };
  }

  setScoreError = (error) => {
    this.setState({ scoreError: error });
  };

  // ********called in the onClick event for the arrow buttons on the notecard********
  changeCurrentIndex = (incrementValue, event) => {
    event.stopPropagation();
    const totalCards = this.state.practiceCards.length;
    if (!totalCards) {
      return;
    }
    const { currentIndex } = this.state;
    if (currentIndex === 1 && incrementValue < 0) {
      return;
    } else if (currentIndex === totalCards && incrementValue > 0) {
      return;
    }
    this.setState({ currentIndex: currentIndex + incrementValue });
  };

  // ********called in this.toggleSwitch and onBlur for the deck percentage input field********
  saveDeckSettings = (
    definitionFirst,
    deckPercentage,
    termLanguage,
    definitionLanguage
  ) => {
    const { userId, currentDeckId, updateDeckSettings } = this.props;
    updateDeckSettings(
      definitionFirst,
      deckPercentage,
      termLanguage,
      definitionLanguage
    );
    fetch(`${mainUrl}/update-deck-settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        deckId: currentDeckId,
        definitionFirst: definitionFirst,
        deckPercentage: deckPercentage,
        termLanguage: termLanguage,
        definitionLanguage: definitionLanguage,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.deck_id) {
          this.setState({ settingsError: data });
        } else {
          this.setState({ settingsError: "" });
        }
      })
      .catch((err) =>
        this.setState({ settingsError: "Unable to save deck settings: 0" })
      );
  };

  // ********called in onClick for the toggle switch********
  toggleSwitch = (event) => {
    const definitionFirst = event.target.checked;
    // const definitionFirst = document.getElementById("definition-first").checked;
    const { deckPercentage, termLanguage, definitionLanguage } = this.state;
    this.saveDeckSettings(
      definitionFirst,
      deckPercentage,
      termLanguage,
      definitionLanguage
    );
    this.setState({ definitionFirst });
  };

  // called in this.updatePracticeCards
  validatePercentageInput = (event) => {
    const currentDeckPercentage = this.state.deckPercentage;
    const percentageInput = event.target;
    let newDeckPercentage;
    if (percentageInput.value > 100) {
      percentageInput.value = 100;
      newDeckPercentage = 100;
    } else if (percentageInput.value < 1) {
      newDeckPercentage = 1;
    } else {
      newDeckPercentage = Number(percentageInput.value);
    }
    if (currentDeckPercentage === newDeckPercentage) {
      return false;
      // this way, the cards won't be unnecessarily regenerated
    }
    this.setState({ deckPercentage: newDeckPercentage });
    return newDeckPercentage;
  };

  // called in this.setPracticeCards and this.shufflePracticeCardsOnly
  shuffleCards = (cards) => {
    let shuffledCards = [].concat(cards);
    for (let i = shuffledCards.length - 1; i >= 1; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = shuffledCards[j];
      shuffledCards[j] = shuffledCards[i];
      shuffledCards[i] = temp;
    }
    return shuffledCards;
  };

  // called in this.setPracticeCards
  calculatePracticeCardsQuantity = (cards, deckPercentage) => {
    if (deckPercentage >= 100) {
      return cards.length;
    }
    const practiceCardsQuantity = Math.round(
      (deckPercentage / 100) * cards.length
    );
    if (practiceCardsQuantity <= 1) {
      return 1;
    }
    return practiceCardsQuantity;
  };

  // called in this.updatePracticeCards and componentDidMount
  setPracticeCards = (deckPercentage) => {
    const { cards } = this.props;
    const practiceCardsQuantity = this.calculatePracticeCardsQuantity(
      cards,
      deckPercentage
    );
    const practiceCards = this.shuffleCards(cards).slice(
      0,
      practiceCardsQuantity
    );
    this.setState({ practiceCards });
  };

  // ********called in onChange for the deck percentage input field********
  updatePracticeCards = (event) => {
    const deckPercentage = this.validatePercentageInput(event);
    if (deckPercentage) {
      this.setState({ currentIndex: 1 });
      this.setPracticeCards(deckPercentage);
    }
  };

  // ********called in onClick for the shuffle cards button********
  shufflePracticeCardsOnly = (event) => {
    event.stopPropagation();
    const { practiceCards } = this.state;
    const shuffledPracticeCards = this.shuffleCards(practiceCards);
    this.setState({ practiceCards: shuffledPracticeCards, currentIndex: 1 });
  };

  // called in componentDidMount as an event handler
  handleArrowKeys = (event) => {
    if (event.code === "ArrowRight") {
      this.changeCurrentIndex(1, event);
    } else if (event.code === "ArrowLeft") {
      this.changeCurrentIndex(-1, event);
    }
  };

  matchVoices = (voices, language) => {
    const matchingVoices = voices.filter((voice) => voice.name === language);
    if (matchingVoices.length) {
      const voice = matchingVoices[0];
      return voice;
    }
    return {};
  };

  // called in componentDidMount
  getSpeechSynthesisVoices = (termLanguage, definitionLanguage) => {
    const synth = window.speechSynthesis;
    if (synth) {
      const _handleVoicesChanged = () => {
        const voices = window.speechSynthesis.getVoices();
        const termVoice = this.matchVoices(voices, termLanguage);
        const definitionVoice = this.matchVoices(voices, definitionLanguage);
        this.setState({
          speechSynthesisVoices: voices,
          termVoice: termVoice,
          definitionVoice: definitionVoice,
        });
        synth.removeEventListener("voiceschanged", _handleVoicesChanged);
      };
      synth.addEventListener("voiceschanged", _handleVoicesChanged);
    }
  };

  // passed down through PracticeSettings to LanguageSelector and called when a new language is selected
  setSpeechSynthesisVoice = (voice, language, termOrDefinition) => {
    if (termOrDefinition === "Term") {
      this.setState({ termVoice: voice, termLanguage: language });
    } else if (termOrDefinition === "Definition") {
      this.setState({ definitionVoice: voice, definitionLanguage: language });
    }
  };

  componentDidMount() {
    const {
      definitionFirst,
      deckPercentage,
      termLanguage,
      definitionLanguage,
    } = this.props;
    this.setState({
      definitionFirst,
      deckPercentage,
      termLanguage,
      definitionLanguage,
    });
    this.setPracticeCards(deckPercentage);
    if (window) {
      window.addEventListener("keydown", this.handleArrowKeys);
    }
    this.getSpeechSynthesisVoices(termLanguage, definitionLanguage);
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener("keydown", this.handleArrowKeys);
    }
  }

  render() {
    const { currentDeckName, onRouteChange, userId, updateScore } = this.props;

    const {
      currentIndex,
      scoreError,
      definitionFirst,
      deckPercentage,
      termLanguage,
      definitionLanguage,
      settingsError,
      speechSynthesisVoices,
      termVoice,
      definitionVoice,
    } = this.state;
    const initialDeckPercentage = this.props.deckPercentage;
    const totalCards = this.state.practiceCards.length;
    const currentCard = this.state.practiceCards.at(currentIndex - 1);
    let frontContent;
    let backVoice = [];
    let frontVoice = [];
    let backContent;
    if (totalCards) {
      if (definitionFirst) {
        frontContent = currentCard.definition;
        backContent = currentCard.term;
        frontVoice = [definitionVoice];
        backVoice = [termVoice];
      } else {
        frontContent = currentCard.term;
        backContent = currentCard.definition;
        frontVoice = [termVoice];
        backVoice = [definitionVoice];
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
          {scoreError ? (
            <div className={"mt0 pt0 mb3"}>
              <Error error={scoreError} />
            </div>
          ) : (
            <></>
          )}
          {totalCards > 0 ? (
            <>
              <Flipcard key={currentIndex}>
                <Notecard
                  cardId={currentCard.card_id}
                  score={currentCard.score}
                  content={frontContent}
                  userId={userId}
                  totalCards={totalCards}
                  changeCurrentIndex={this.changeCurrentIndex}
                  setScoreError={this.setScoreError}
                  shufflePracticeCardsOnly={this.shufflePracticeCardsOnly}
                  updateScore={updateScore}
                  currentIndex={currentIndex}
                  arrowKeysChangeScore={true}
                  voice={frontVoice}
                />
                <Notecard
                  cardId={currentCard.card_id}
                  score={currentCard.score}
                  content={backContent}
                  userId={userId}
                  totalCards={totalCards}
                  changeCurrentIndex={this.changeCurrentIndex}
                  setScoreError={this.setScoreError}
                  shufflePracticeCardsOnly={this.shufflePracticeCardsOnly}
                  updateScore={updateScore}
                  currentIndex={currentIndex}
                  arrowKeysChangeScore={false}
                  voice={backVoice}
                />
              </Flipcard>
              <PracticeSettings
                definitionFirst={definitionFirst}
                initialDeckPercentage={initialDeckPercentage}
                deckPercentage={deckPercentage}
                termLanguage={termLanguage}
                definitionLanguage={definitionLanguage}
                toggleSwitch={this.toggleSwitch}
                updatePracticeCards={this.updatePracticeCards}
                saveDeckSettings={this.saveDeckSettings}
                voices={speechSynthesisVoices}
                matchVoices={this.matchVoices}
                setSpeechSynthesisVoice={this.setSpeechSynthesisVoice}
              />
              {settingsError ? (
                <div className={"mt0 pt0 mt3"}>
                  <Error error={settingsError} />
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <MainCard>
              <div className="f3-ns f4" style={{ textAlign: "center" }}>
                Add cards to this deck to practice!
              </div>
            </MainCard>
          )}
        </MainCard>
      </>
    );
  }
}

export default Practice;
