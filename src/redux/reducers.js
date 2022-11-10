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
const initialStateDecks = { decks: [] };

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
      return { ...state, decks: action.payload };
    case UNLOAD_DECKS:
      return { ...state, ...initialStateDecks };
    default:
      return state;
  }
};

// const registrationAndSignIn = (
//   state = initialStateRegistrationAndSignIn,
//   action = {}
// ) => {
//   switch (action.type) {
//     case REGISTRATION_OR_SIGN_IN_PENDING:
//       return { ...state, isPending: true };
//     case REGISTRATION_OR_SIGN_IN_SUCCESS:
//       return { ...state, isPending: false };
//     case REGISTRATION_OR_SIGN_IN_FAILURE:
//       return { ...state, error: action.payload, isPending: false };
//     case REGISTRATION_OR_SIGN_IN_ERROR_RESET:
//       return { ...state, error: "" };
//     default:
//       return state;
//   }
// };

// const decks = (state = initialStateDecks, action = {}) => {
//   switch (action.type) {
//     case LOAD_DECKS_PENDING:
//       return { ...state, isPending: true };
//     case LOAD_DECKS_SUCCESS:
//       return { ...state, isPending: false, decks: action.payload };
//     case LOAD_DECKS_FAILURE:
//       return { ...state, isPending: false, error: action.payload };
//     case LOAD_DECKS_ERROR_RESET:
//       return { ...state, error: "" };
//     case UNLOAD_DECKS:
//       return { ...state, ...initialStateDecks };
//     default:
//       return state;
//   }
// };

// ************************************************************ combine reducers ************************************************************

export const rootReducer = combineReducers({
  route,
  userStatus,
  requestStatus,
  error,
  decks,
});
