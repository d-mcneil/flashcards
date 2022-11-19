import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "../components/Header/Header";
import Message from "../components/Message/Message";
import { fetchCallGet } from "../functions/fetchCalls";
import {
  endPracticeSession,
  loadSettings,
  setPracticeCards,
} from "../redux/actions";
import MainCard from "../components/MainCard/MainCard";
import Notecards from "./Notecards";

const mapStateToProps = (state) => ({
  isPending: state.requestStatus.isPending,
  error: state.error.error,
  deckId: state.currentDeck.currentDeck.deckId,
  cards: state.currentDeck.cards,
  cardsHaveBeenFetched: state.currentDeck.cardsHaveBeenFetched,
  settingsHaveBeenFetched: state.currentDeck.practice.settingsHaveBeenFetched,
  practiceCards: state.currentDeck.practice.practiceCards,
});

const mapDispatchToProps = (dispatch) => ({
  onGetSettings: (settings) => dispatch(loadSettings(settings)),
  loadPracticeCards: (cards) => dispatch(setPracticeCards(cards)),
  onExitPractice: () => dispatch(endPracticeSession()),
});

const Practice = ({
  error,
  isPending,
  settingsHaveBeenFetched,
  cardsHaveBeenFetched,
  deckId,
  practiceCards,
  cards,
  onGetSettings,
  loadPracticeCards,
  onExitPractice,
}) => {
  const message = isPending ? "Loading cards..." : error;

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

  useEffect(() => {
    if (cardsHaveBeenFetched) {
      loadPracticeCards(cards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsHaveBeenFetched]);

  const renderNotecards = practiceCards.length ? (
    <Notecards />
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
  );

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
      {renderNotecards}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Practice);
