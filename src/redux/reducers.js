import { combineReducers } from "redux";
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
  LOAD_SPEECH_SYNTHESIS_VOICES,
  SET_TERM_SPEECH_SYNTHESIS_VOICE,
  SET_DEFINITION_SPEECH_SYNTHESIS_VOICE,
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
  practice: {
    settingsHaveBeenFetched: false,
    settings: {
      definitionFirst: false,
      practiceDeckPercentage: 100,
      termLanguageCode: "en-US",
      termLanguageName: "Google US English",
      definitionLanguageCode: "en-US",
      definitionLanguageName: "Google US English",
      readOutOnFlip: false,
    },
    currentIndex: 0,
    practiceCards: [],
    termSpeechSynthesisVoice: null,
    definitionSpeechSynthesisVoice: null,
  },
};
const initialStateSpeechSynthesisVoices = { speechSynthesisVoices: [] };

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
    case UNLOAD_USER:
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
    case UPDATE_DECK_LIST:
      const { deckName, description, deckId } = action.payload;
      return {
        ...state,
        decks: state.decks.map((deck) => {
          if (deckId === deck.deckId) {
            return { ...deck, deckName, description };
          } else {
            return deck;
          }
        }),
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
    // case UNLOAD_CARDS:
    //   return {
    //     ...state,
    //     cards: initialStateCurrentDeck.cards,
    //     cardsHaveBeenFetched: initialStateCurrentDeck.cardsHaveBeenFetched,
    //   };
    case ADD_CARD:
      return { ...state, cards: [...state.cards, action.payload] };
    case REMOVE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card.cardId !== action.payload),
      };
    case UPDATE_CURRENT_DECK:
      return {
        ...state,
        currentDeck: {
          ...state.currentDeck,
          deckName: action.payload.deckName,
          description: action.payload.description,
        },
      };
    case UPDATE_CARD: {
      const { term, definition, cardId } = action.payload;
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (cardId === card.cardId) {
            return { ...card, term, definition };
          } else {
            return card;
          }
        }),
      };
    }
    case UPDATE_CARD_SCORE: {
      const { incrementValue, cardId } = action.payload;
      const updateScore = (cardsArray) =>
        cardsArray.map((card) => {
          if (cardId === card.cardId) {
            return { ...card, score: card.score + incrementValue };
          } else {
            return card;
          }
        });
      return {
        ...state,
        cards: updateScore(state.cards),
        practice: {
          ...state.practice,
          practiceCards: updateScore(state.practice.practiceCards),
        },
      };
    }
    case LOAD_SETTINGS:
      return {
        ...state,
        practice: {
          ...state.practice,
          settings: action.payload,
          settingsHaveBeenFetched: true,
        },
      };
    // case UNLOAD_SETTINGS:
    //   return {
    //     ...state,
    //     practice: {
    //       ...state.practice,
    //       settings: initialStateCurrentDeck.practice.settings,
    //       settingsHaveBeenFetched:
    //         initialStateCurrentDeck.practice.settingsHaveBeenFetched,
    //     },
    //   };
    case CHANGE_CURRENT_INDEX:
      return {
        ...state,
        practice: {
          ...state.practice,
          currentIndex: (state.practice.currentIndex += action.payload),
        },
      };
    case RESET_INDEX:
      return {
        ...state,
        practice: {
          ...state.practice,
          currentIndex: initialStateCurrentDeck.practice.currentIndex,
        },
      };
    case SET_PRACTICE_CARDS:
      return {
        ...state,
        practice: { ...state.practice, practiceCards: action.payload },
      };
    case UNLOAD_PRACTICE_CARDS:
      return {
        ...state,
        practice: {
          ...state.practice,
          practiceCards: initialStateCurrentDeck.practice.practiceCards,
        },
      };
    case SET_TERM_SPEECH_SYNTHESIS_VOICE:
      return {
        ...state,
        practice: {
          ...state.practice,
          termSpeechSynthesisVoice: action.payload,
        },
      };
    case SET_DEFINITION_SPEECH_SYNTHESIS_VOICE:
      return {
        ...state,
        practice: {
          ...state.practice,
          definitionSpeechSynthesisVoice: action.payload,
        },
      };
    default:
      return state;
  }
};

const speechSynthesisVoices = (
  state = initialStateSpeechSynthesisVoices,
  action = {}
) => {
  switch (action.type) {
    case LOAD_SPEECH_SYNTHESIS_VOICES:
      return { ...state, speechSynthesisVoices: action.payload };
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
  speechSynthesisVoices,
});
