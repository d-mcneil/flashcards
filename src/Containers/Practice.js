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
} from "../redux/actions";
import MainCard from "../components/MainCard/MainCard";
import Notecards from "./Notecards";
import PracticeSettings from "./PracticeSettings";

const mapStateToProps = (state) => ({
  isPending: state.requestStatus.isPending,
  error: state.error.error,
  deckId: state.currentDeck.currentDeck.deckId,
  cards: state.currentDeck.cards,
  cardsHaveBeenFetched: state.currentDeck.cardsHaveBeenFetched,
  settingsHaveBeenFetched: state.currentDeck.practice.settingsHaveBeenFetched,
  practiceCards: state.currentDeck.practice.practiceCards,
  speechSynthesisVoices: state.speechSynthesisVoices.speechSynthesisVoices,
  settings: state.currentDeck.practice.settings,
});

const mapDispatchToProps = (dispatch) => ({
  onGetSettings: (settings) => dispatch(loadSettings(settings)),
  loadPracticeCards: (cards, practiceCardsQuantity) =>
    dispatch(shufflePracticeCards(cards, null, 0, true, practiceCardsQuantity)),
  onExitPractice: () => dispatch(endPracticeSession()),
  setTermVoice: (voice) => dispatch(setTermSpeechSynthesisVoice(voice)),
  setDefinitionVoice: (voice) =>
    dispatch(setDefinitionSpeechSynthesisVoice(voice)),
});

const Practice = ({
  error,
  isPending,
  settingsHaveBeenFetched,
  cardsHaveBeenFetched,
  deckId,
  practiceCards,
  speechSynthesisVoices,
  settings,
  cards,
  onGetSettings,
  loadPracticeCards,
  onExitPractice,
  setTermVoice,
  setDefinitionVoice,
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

  // set speech synthesis voices for term and definition on mount
  // set voices again when get request for settings resolves (if settings hadn't already been fetched on mount)
  // set voices again if any of the settings for them are changed by the user
  useEffect(() => {
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

    const termVoice = matchVoiceToSpeechSynthesisVoice(
      termLanguageName,
      termLanguageCode
    );
    const definitionVoice = matchVoiceToSpeechSynthesisVoice(
      definitionLanguageName,
      definitionLanguageCode
    );
    setTermVoice(termVoice);
    setDefinitionVoice(definitionVoice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    settingsHaveBeenFetched,
    termLanguageCode,
    termLanguageName,
    definitionLanguageCode,
    definitionLanguageName,
  ]);
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
      loadPracticeCards(cards, practiceCardsQuantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsHaveBeenFetched, practiceDeckPercentage]);

  return (
    <>
      <Header text="Practice" />

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
      ) : cards.length ? (
        <MainCard>
          <Message
            message="Setting up practice session..."
            wrapperClass="main-error-message" // in index.css
          />
        </MainCard>
      ) : (
        <MainCard>
          <div className="f3-ns f4 tc">Add cards to this deck to practice!</div>
        </MainCard>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Practice);
