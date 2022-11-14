import { batch } from "react-redux";
import { fetchCallGetDecksOrCards } from "../functions/fetchCalls";
import {
  ROUTE_CHANGE,
  LOAD_USER,
  SIGN_OUT_USER,
  REQUEST_PENDING,
  REQUEST_RESOLVED,
  SET_ERROR,
  RESET_ERROR,
  LOAD_DECKS,
  UNLOAD_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  LOAD_CURRENT_DECK,
  UNLOAD_CURRENT_DECK,
  LOAD_CARDS,
  UNLOAD_CARDS,
  ADD_CARD,
  REMOVE_CARD,
  LOAD_SETTINGS,
  UNLOAD_SETTINGS,
} from "./constants";

export const routeChange = (route) => ({ type: ROUTE_CHANGE, payload: route });
const loadUser = (user) => ({ type: LOAD_USER, payload: user });
const unloadUser = () => ({ type: SIGN_OUT_USER });
export const requestPending = () => ({ type: REQUEST_PENDING });
export const requestResovled = () => ({ type: REQUEST_RESOLVED });
export const setError = (error) => ({ type: SET_ERROR, payload: error });
export const resetError = () => ({ type: RESET_ERROR });
export const loadDecks = (decks) => ({ type: LOAD_DECKS, payload: decks });
const unloadDecks = () => ({ type: UNLOAD_DECKS });
export const addDeck = (deck) => ({ type: ADD_DECK, payload: deck });
export const removeDeck = (deckId) => ({ type: REMOVE_DECK, payload: deckId });
const loadCurrentDeck = (deck) => ({ type: LOAD_CURRENT_DECK, payload: deck });
const unloadCurrentDeck = () => ({ type: UNLOAD_CURRENT_DECK });
const loadCards = (cards) => ({ type: LOAD_CARDS, payload: cards });
const unloadCards = () => ({ type: UNLOAD_CARDS });
export const addCard = (card) => ({ type: ADD_CARD, payload: card });
export const removeCard = (cardId) => ({ type: REMOVE_CARD, payload: cardId });
const loadSettings = (settings) => ({ type: LOAD_SETTINGS, payload: settings });
const unloadSettings = () => ({ type: UNLOAD_SETTINGS });

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
    fetchCallGetDecksOrCards(id, decksOrCards)
      .then((data) => {
        if (Array.isArray(data) && data.length > 1) {
          const idPropertyName = `${decksOrCards.replace("s", "")}Id`;
          batch(() => {
            dispatch(resetError());
            dispatch(
              actionLoadCallback(
                data.sort(
                  (a, b) => a[`${idPropertyName}`] - b[`${idPropertyName}`]
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

export const signOutUser = (error) => (dispatch) => {
  batch(() => {
    dispatch(routeChangeAndResetError("signed-out", error));
    dispatch(unloadDecks());
    dispatch(unloadCards());
    dispatch(unloadSettings());
    dispatch(unloadUser());
  });
};
