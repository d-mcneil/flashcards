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
} from "./constants";

export const routeChange = (route) => ({
  type: ROUTE_CHANGE,
  payload: route,
});

export const loadUser = (user) => ({
  type: LOAD_USER,
  payload: user,
});

export const requestPending = () => ({ type: REQUEST_PENDING });
export const requestResovled = () => ({ type: REQUEST_RESOLVED });

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const resetError = () => ({ type: RESET_ERROR });

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

export const loadDecks = (decks) => ({ type: LOAD_DECKS, payload: decks });
const unloadDecks = () => ({ type: UNLOAD_DECKS });
export const addDeck = (deck) => ({ type: ADD_DECK, payload: deck });
export const removeDeck = (deckId) => ({ type: REMOVE_DECK, payload: deckId });
export const loadCards = (cards) => ({ type: LOAD_CARDS, payload: cards });
const unloadCards = () => ({ type: UNLOAD_CARDS });
export const addCard = (card) => ({ type: ADD_CARD, payload: card });
export const removeCard = (cardId) => ({ type: REMOVE_CARD, payload: cardId });

// export const getDecksRequest = (userId) => (dispatch) => {
//   dispatch(requestPending());
//   fetchCallGetDecksOrCards(userId, "decks")
//     .then((data) => {
//       if (Array.isArray(data) && data.length) {
//         batch(() => {
//           dispatch(loadDecks(data.sort((a, b) => a.deckId - b.deckId)));
//           dispatch(requestResovled());
//         });
//       } else {
//         batch(() => {
//           dispatch(setError(data));
//           dispatch(requestResovled());
//         });
//       }
//     })
//     .catch((err) => {
//       batch(() => {
//         dispatch(setError("Error fetching decks: 0"));
//         dispatch(requestResovled());
//       });
//     });
// };

export const getDecksOrCardsRequest =
  (id, actionLoadCallback, decksOrCards = "decks") =>
  (dispatch) => {
    console.log(id);
    dispatch(requestPending());
    fetchCallGetDecksOrCards(id, decksOrCards)
      .then((data) => {
        if (Array.isArray(data) && data.length) {
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

export const signOutUser = (error) => (dispatch) => {
  batch(() => {
    dispatch(routeChangeAndResetError("signed-out", error));
    dispatch(unloadDecks());
    dispatch(unloadCards());
    dispatch({ type: SIGN_OUT_USER });
  });
};
