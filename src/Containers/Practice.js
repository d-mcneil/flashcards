import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "../components/Header/Header";
import Message from "../components/Message/Message";
import { fetchCallGet } from "../functions/fetchCalls";
import {
  endPracticeSession,
  loadSettings,
  setDefinitionSpeechSynthesisVoice,
  setTermSpeechSynthesisVoice,
  shufflePracticeCards,
  routeChangeAndResetError,
} from "../redux/actions";
import MainCard from "../components/MainCard/MainCard";
import Notecards from "./Notecards";
import PracticeSettings from "./PracticeSettings";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mapStateToProps = (state) => ({
  isPending: state.requestStatus.isPending,
  error: state.error.error,
  deckId: state.currentDeck.currentDeck.deckId,
  deckName: state.currentDeck.currentDeck.deckName,
  cards: state.currentDeck.cards,
  cardsHaveBeenFetched: state.currentDeck.cardsHaveBeenFetched,
  settingsHaveBeenFetched: state.currentDeck.practice.settingsHaveBeenFetched,
  practiceCards: state.currentDeck.practice.practiceCards,
  speechSynthesisVoices: state.speechSynthesisVoices.speechSynthesisVoices,
  settings: state.currentDeck.practice.settings,
  currentIndex: state.currentDeck.practice.currentIndex,
});

const mapDispatchToProps = (dispatch) => ({
  onGetSettings: (settings) => dispatch(loadSettings(settings)),
  loadPracticeCards: (cards, practiceCardsQuantity, currentIndex) =>
    dispatch(
      shufflePracticeCards(
        cards,
        null,
        currentIndex,
        true,
        practiceCardsQuantity
      )
    ),
  onExitPractice: () => dispatch(endPracticeSession()),
  setTermVoice: (voice) => dispatch(setTermSpeechSynthesisVoice(voice)),
  setDefinitionVoice: (voice) =>
    dispatch(setDefinitionSpeechSynthesisVoice(voice)),
  routeChange: (route, error) =>
    dispatch(routeChangeAndResetError(route, error)),
});

const Practice = ({
  error,
  isPending,
  settingsHaveBeenFetched,
  cardsHaveBeenFetched,
  deckId,
  deckName,
  practiceCards,
  speechSynthesisVoices,
  settings,
  cards,
  onGetSettings,
  loadPracticeCards,
  onExitPractice,
  setTermVoice,
  setDefinitionVoice,
  currentIndex,
  routeChange,
}) => {
  const message = isPending ? "Loading cards..." : error;
  const {
    termLanguageCode,
    termLanguageName,
    definitionLanguageCode,
    definitionLanguageName,
    practiceDeckPercentage,
  } = settings;

  // request deck practice settings if they have not already been fetched
  useEffect(() => {
    if (!settingsHaveBeenFetched) {
      fetchCallGet(deckId, "practice-settings").then((data) => {
        if (data.deckId) {
          onGetSettings(data);
        }
      });
    }
    return onExitPractice;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //
  //
  //

  const matchVoiceToSpeechSynthesisVoice = (voiceName, langCode) => {
    // prettier-ignore
    const matchingVoicesByName = speechSynthesisVoices.filter(voice => voice.name === voiceName)
    if (matchingVoicesByName.length) {
      return matchingVoicesByName[0];
    }
    // prettier-ignore
    const matchingVoicesByLangCode = speechSynthesisVoices.filter(voice => voice.lang === langCode)
    if (matchingVoicesByLangCode.length) {
      return matchingVoicesByLangCode[0];
    }
    return null;
  };

  // set speech synthesis voice for term on mount
  // set voice again when get request for settings resolves (if settings hadn't already been fetched on mount)
  // set voice again if the setting for it is changed by the user
  useEffect(() => {
    const termVoice = matchVoiceToSpeechSynthesisVoice(
      termLanguageName,
      termLanguageCode
    );
    setTermVoice(termVoice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsHaveBeenFetched, termLanguageCode, termLanguageName]);
  //
  //
  //

  // set speech synthesis voice for definition on mount
  // set voice again when get request for settings resolves (if settings hadn't already been fetched on mount)
  // set voice again if the setting for it is changed by the user
  useEffect(() => {
    const definitionVoice = matchVoiceToSpeechSynthesisVoice(
      definitionLanguageName,
      definitionLanguageCode
    );
    setDefinitionVoice(definitionVoice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsHaveBeenFetched, definitionLanguageCode, definitionLanguageName]);
  //
  //
  //

  // load practice cards once the get request for cards resolves
  // reload them if the perecentage of the whole deck for practice is changed by the user
  useEffect(() => {
    if (cardsHaveBeenFetched && cards.length) {
      const calculatePracticeCardsQuantity = () => {
        const totalCards = cards.length;
        if (!totalCards) {
          return 0;
        } else if (practiceDeckPercentage >= 100) {
          return totalCards;
        } else if (practiceDeckPercentage < 1) {
          return 1;
        } else {
          const practiceCardsQuantity = Math.round(
            (practiceDeckPercentage / 100) * totalCards
          );
          if (practiceCardsQuantity <= 1) {
            return 1;
          }
          return practiceCardsQuantity;
        }
      };

      const practiceCardsQuantity = calculatePracticeCardsQuantity(cards);
      loadPracticeCards(cards, practiceCardsQuantity, currentIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsHaveBeenFetched, practiceDeckPercentage]);

  return (
    <>
      <Header text="Practice" />

      <div
        className="center"
        id="practice-deck-name-title-wrapper" // in index.css
      >
        <div
          className="f3"
          id="practice-deck-name-title" // in index.css
        >
          {deckName}
        </div>
      </div>

      {message ? (
        <Message
          message={message}
          wrapperClass="main-error-message" // in index.css
        />
      ) : (
        <></>
      )}

      {practiceCards.length ? (
        <>
          <Notecards />
          <PracticeSettings />
        </>
      ) : (
        <MainCard
          extraClassName="notecard-main-extra-class-practice" // in index.css
        >
          {!cardsHaveBeenFetched ? (
            <Message message="Setting up practice session..." />
          ) : (
            <div
              className="f3-ns f4 center pointer dim"
              id="add-cards-message" // in index.css
              onClick={() => routeChange("editor", error)}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Cards
            </div>
          )}
        </MainCard>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Practice);
