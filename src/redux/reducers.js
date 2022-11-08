import { combineReducers } from "redux";
import { LOAD_USER, ROUTE_CHANGE } from "./constants";

const initialStateUser = {
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

const initialStateRoute = {
  route: "signed-out",
};

const onLoadUser = (state = initialStateUser, action = {}) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, user: action.payload, signedIn: true };
    default:
      return state;
  }
};

const onRouteChange = (state = initialStateRoute, action = {}) => {
  switch (action.type) {
    case ROUTE_CHANGE:
      return { ...state, route: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({ onLoadUser, onRouteChange });

// // prettier-ignore
// import { REGISTRATION_PENDING, REGISTRATION_SUCCESS, REGISTRATION_FAILURE, REGISTRATION_RESET } from "./constants";

// const initialStateRegistration = {
//   registrationPending: false,
//   registrationError: "",
// };

// export const onRegisterUser = (
//   state = initialStateRegistration,
//   action = {}
// ) => {
//   switch (action.type) {
//     case REGISTRATION_PENDING:
//       return { ...state, registrationPending: true };
//     case REGISTRATION_SUCCESS:
//       return {
//         ...state,
//         registrationPending: false,
//       };
//     case REGISTRATION_FAILURE:
//       return {
//         ...state,
//         registrationError: action.payload,
//         registrationPending: false,
//       };
//     case REGISTRATION_RESET:
//       return {
//         ...state,
//         registrationError: ''
//       }
//     default:
//       return state;
//   }
// };
