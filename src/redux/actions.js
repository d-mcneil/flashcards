import { batch } from "react-redux";
import { fetchCallGet, fetchCallDelete } from "../functions/fetchCalls";
import {
  ROUTE_CHANGE,
  LOAD_USER,
  UNLOAD_USER,
  REQUEST_PENDING,
  REQUEST_RESOLVED,
  SET_ERROR,
  RESET_ERROR,
  LOAD_DECKS,
  UNLOAD_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  UPDATE_DECK_LIST,
  LOAD_CURRENT_DECK,
  UNLOAD_CURRENT_DECK,
  LOAD_CARDS,
  // UNLOAD_CARDS,
  ADD_CARD,
  REMOVE_CARD,
  UPDATE_CURRENT_DECK,
  UPDATE_CARD,
  UPDATE_CARD_SCORE,
  LOAD_SETTINGS,
  // UNLOAD_SETTINGS,
  CHANGE_CURRENT_INDEX,
  RESET_INDEX,
  SET_PRACTICE_CARDS,
  UNLOAD_PRACTICE_CARDS,
  SET_TERM_SPEECH_SYNTHESIS_VOICE,
  SET_DEFINITION_SPEECH_SYNTHESIS_VOICE,
  LOAD_SPEECH_SYNTHESIS_VOICES,
  UPDATE_SETTINGS,
} from "./constants";

// **************** route reducer****************
export const routeChange = (route) => ({ type: ROUTE_CHANGE, payload: route });

// **************** userStatus reducer ****************
const loadUser = (user) => ({ type: LOAD_USER, payload: user });
const unloadUser = () => ({ type: UNLOAD_USER });

// **************** requestStatus reducer ****************
export const requestPending = () => ({ type: REQUEST_PENDING });
export const requestResovled = () => ({ type: REQUEST_RESOLVED });

// **************** error reducer ****************
export const setError = (error) => ({ type: SET_ERROR, payload: error });
export const resetError = () => ({ type: RESET_ERROR });

// **************** decks reducer ****************
export const loadDecks = (decks) => ({ type: LOAD_DECKS, payload: decks });
const unloadDecks = () => ({ type: UNLOAD_DECKS });
export const addDeck = (deck) => ({ type: ADD_DECK, payload: deck });
export const removeDeck = (deckId) => ({ type: REMOVE_DECK, payload: deckId });
export const updateDeckList = (deckName, description, deckId) => ({
  type: UPDATE_DECK_LIST,
  payload: { deckName, description, deckId },
});

// **************** currentDeck reducer ****************
const loadCurrentDeck = (deck) => ({ type: LOAD_CURRENT_DECK, payload: deck });
export const unloadCurrentDeck = () => ({ type: UNLOAD_CURRENT_DECK });
const loadCards = (cards) => ({ type: LOAD_CARDS, payload: cards });
// const unloadCards = () => ({ type: UNLOAD_CARDS });
export const addCard = (card) => ({ type: ADD_CARD, payload: card });
export const removeCard = (cardId) => ({ type: REMOVE_CARD, payload: cardId });
export const updateCurrentDeck = (deckName, description) => ({
  type: UPDATE_CURRENT_DECK,
  payload: { deckName, description },
});
export const updateCard = (term, definition, cardId) => ({
  type: UPDATE_CARD,
  payload: { term, definition, cardId },
});
export const updateCardScore = (cardId, incrementValue) => ({
  type: UPDATE_CARD_SCORE,
  payload: { cardId, incrementValue },
});
export const loadSettings = (settings) => ({
  type: LOAD_SETTINGS,
  payload: settings,
});
export const changeCurrentIndex = (incrementValue) => ({
  type: CHANGE_CURRENT_INDEX,
  payload: incrementValue,
});
const resetIndex = () => ({ type: RESET_INDEX });
export const setPracticeCards = (cards) => ({
  type: SET_PRACTICE_CARDS,
  payload: cards,
});
const unloadPracticeCards = () => ({ type: UNLOAD_PRACTICE_CARDS });
export const setTermSpeechSynthesisVoice = (voice) => ({
  type: SET_TERM_SPEECH_SYNTHESIS_VOICE,
  payload: voice,
});
export const setDefinitionSpeechSynthesisVoice = (voice) => ({
  type: SET_DEFINITION_SPEECH_SYNTHESIS_VOICE,
  payload: voice,
});
export const updateSettings = (settingPropertyName, settingValue) => ({
  type: UPDATE_SETTINGS,
  payload: { settingPropertyName, settingValue },
});

// **************** speechSynthesisVoices reducer ****************
export const loadSpeechSynthesisVoices = (voices) => ({
  type: LOAD_SPEECH_SYNTHESIS_VOICES,
  payload: voices,
});

// ************************************************************ batched actions ************************************************************
export const routeChangeAndResetError =
  (route, error = "error") =>
  // if I forget to pass the error as an argument, at least the error will automatically by reset on route change
  (dispatch) => {
    if (error) {
      batch(() => {
        dispatch(resetError());
        dispatch(routeChange(route));
      });
    } else {
      dispatch(routeChange(route));
    }
  };

export const registrationAndSignInRequest =
  (
    validationCallback,
    fetchCallback,
    clientSideErrorMessage,
    currentError,
    ...args
  ) =>
  (dispatch) => {
    const validity = validationCallback(...args);
    // returns object with properties { valid, reason(only if invalid) }
    if (!validity.valid) {
      dispatch(setError(validity.reason));
      return;
    }
    dispatch(requestPending());
    fetchCallback(...args)
      .then((data) => {
        if (data.userId) {
          batch(() => {
            dispatch(loadUser(data));
            dispatch(routeChangeAndResetError("home", currentError));
            dispatch(requestResovled());
          });
        } else {
          batch(() => {
            dispatch(setError(data));
            dispatch(requestResovled());
          });
        }
      })
      .catch((err) =>
        batch(() => {
          dispatch(setError(clientSideErrorMessage));
          dispatch(requestResovled());
        })
      );
  };

export const getDecksOrCardsRequest =
  (id, actionLoadCallback, decksOrCards = "decks") =>
  (dispatch) => {
    dispatch(requestPending());
    fetchCallGet(id, decksOrCards)
      .then((data) => {
        if (Array.isArray(data) && data.length > 1) {
          const idPropertyName = `${decksOrCards.replace("s", "")}Id`;
          batch(() => {
            dispatch(resetError());
            dispatch(
              actionLoadCallback(
                data.sort(
                  (a, b) => b[`${idPropertyName}`] - a[`${idPropertyName}`]
                )
              )
            );
            dispatch(requestResovled());
          });
        } else if (Array.isArray(data) && data.length <= 1) {
          batch(() => {
            dispatch(resetError());
            dispatch(actionLoadCallback(data));
            dispatch(requestResovled());
          });
        } else {
          batch(() => {
            dispatch(setError(data));
            dispatch(requestResovled());
          });
        }
      })
      .catch((err) => {
        batch(() => {
          dispatch(setError(`Error fetching ${decksOrCards}: 0`));
          dispatch(requestResovled());
        });
      });
  };

export const selectDeck = (route, error, deck) => (dispatch) => {
  batch(() => {
    dispatch(routeChangeAndResetError(route, error));
    dispatch(loadCurrentDeck(deck));
  });
  dispatch(getDecksOrCardsRequest(deck.deckId, loadCards, "cards"));
};

export const unselectDeck = (error) => (dispatch) => {
  batch(() => {
    dispatch(routeChangeAndResetError("home", error));
    dispatch(unloadCurrentDeck());
  });
};

export const shufflePracticeCards =
  (
    cards,
    event = null,
    currentIndex = 1,
    sliceDeck = false,
    practiceCardsQuantity = 0
  ) =>
  (dispatch) => {
    if (event) {
      event.stopPropagation();
    }
    // shuffle cards
    let shuffledCards = [].concat(cards);
    for (let i = shuffledCards.length - 1; i >= 1; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = shuffledCards[j];
      shuffledCards[j] = shuffledCards[i];
      shuffledCards[i] = temp;
    }
    // slice deck if required
    if (sliceDeck) {
      shuffledCards = shuffledCards.slice(0, practiceCardsQuantity);
    }
    // dispatch
    if (currentIndex > 0) {
      batch(() => {
        dispatch(resetIndex());
        dispatch(setPracticeCards(shuffledCards));
      });
    } else {
      dispatch(setPracticeCards(shuffledCards));
    }
  };

export const endPracticeSession = () => (dispatch) => {
  batch(() => {
    dispatch(resetIndex());
    dispatch(unloadPracticeCards());
  });
};

export const selectVoice =
  (languageName, languageCode, termOrDefinition) => (dispatch) => {
    batch(() => {
      dispatch(updateSettings(`${termOrDefinition}LanguageName`, languageName));
      dispatch(updateSettings(`${termOrDefinition}LanguageCode`, languageCode));
    });
  };

export const signOutUser = (error) => (dispatch) => {
  batch(() => {
    dispatch(routeChangeAndResetError("signed-out", error));
    dispatch(unloadDecks());
    dispatch(unloadCurrentDeck());
    dispatch(unloadUser());
    dispatch(requestResovled());
  });
};

export const deleteUserRequest = (userId, username, error) => (dispatch) => {
  dispatch(requestPending());
  fetchCallDelete(userId, username, "user")
    .then((data) => {
      if (data.userId === userId) {
        dispatch(signOutUser(error));
      } else {
        batch(() => {
          dispatch(requestResovled());
          dispatch(setError(data));
        });
      }
    })
    .catch((err) =>
      batch(() => {
        dispatch(requestResovled());
        dispatch(setError("Error deleting user: 0"));
      })
    );
};
