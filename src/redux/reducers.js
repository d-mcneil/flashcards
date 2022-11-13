import { combineReducers } from "redux";
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

// ************************************************************ initial states ************************************************************

const initialStateRoute = { route: "signed-out" };
const initialStateUserStatus = {
  user: {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    joined: "",
  },
  signedIn: false,
};
const initialStateRequestStatus = { isPending: false };
const initialStateError = { error: "" };
const initialStateDecks = { decks: [], decksHaveBeenFetched: false };
const initialStateCurrentDeck = {
  currentDeck: null,
  cards: [],
  cardsHaveBeenFetched: false,
};

// ************************************************************ reducers ************************************************************

const route = (state = initialStateRoute, action = {}) => {
  switch (action.type) {
    case ROUTE_CHANGE:
      return { ...state, route: action.payload };
    default:
      return state;
  }
};

const userStatus = (state = initialStateUserStatus, action = {}) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, user: action.payload, signedIn: true };
    case SIGN_OUT_USER:
      return { ...state, ...initialStateUserStatus };
    default:
      return state;
  }
};

const requestStatus = (state = initialStateRequestStatus, action = {}) => {
  switch (action.type) {
    case REQUEST_PENDING:
      return { ...state, isPending: true };
    case REQUEST_RESOLVED:
      return { ...state, isPending: false };
    default:
      return state;
  }
};

const error = (state = initialStateError, action = {}) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload };
    case RESET_ERROR:
      return { ...state, ...initialStateError };
    default:
      return state;
  }
};

const decks = (state = initialStateDecks, action = {}) => {
  switch (action.type) {
    case LOAD_DECKS:
      return { ...state, decks: action.payload, decksHaveBeenFetched: true };
    case UNLOAD_DECKS:
      return { ...state, ...initialStateDecks };
    case ADD_DECK:
      return { ...state, decks: [...state.decks, action.payload] };
    case REMOVE_DECK:
      return {
        ...state,
        decks: state.decks.filter((deck) => deck.deckId !== action.payload),
      };
    default:
      return state;
  }
};

const currentDeck = (state = initialStateCurrentDeck, action = {}) => {
  switch (action.type) {
    case LOAD_CURRENT_DECK:
      return { ...state, currentDeck: action.payload };
    case UNLOAD_CURRENT_DECK:
      return { ...state, ...initialStateCurrentDeck };
    case LOAD_CARDS:
      return { ...state, cards: action.payload, cardsHaveBeenFetched: true };
    case UNLOAD_CARDS:
      return {
        ...state,
        cards: initialStateCurrentDeck.cards,
        cardsHaveBeenFetched: initialStateCurrentDeck.cardsHaveBeenFetched,
      };
    case ADD_CARD:
      return { ...state, cards: [...state.cards, action.payload] };
    case REMOVE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card.cardId !== action.payload),
      };
    default:
      return state;
  }
};

// ************************************************************ combine reducers ************************************************************

export const rootReducer = combineReducers({
  route,
  userStatus,
  requestStatus,
  error,
  decks,
  currentDeck,
});
