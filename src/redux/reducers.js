import { combineReducers } from "redux";
// import { SIGN_IN_PENDING, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from "./constants";
// import {
//   REGISTRATION_PENDING,
//   REGISTRATION_SUCCESS,
//   REGISTRATION_FAILURE,
// } from "./constants";
import { LOAD_USER } from "./constants";

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

export const loadUser = (
  state = { ...initialStateUser, ...initialStateRoute },
  action = {}
) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, user: action.payload, signedIn: true, route: "home" };
    default:
      return state;
  }
};

// const initialStateRegistration = {
//   registrationPending: false,
//   registrationError: "",
// };

// export const registerUser = (
//   state = {
//     ...initialStateUser,
//     ...initialStateRoute,
//     ...initialStateRegistration,
//   },
//   action = {}
// ) => {
//   switch (action.type) {
//     case REGISTRATION_PENDING:
//       return { ...state, registrationPending: true };
//     case REGISTRATION_SUCCESS:
//       return {
//         ...state,
//         user: action.payload,
//         signedIn: true,
//         registrationPending: false,
//         route: "home",
//       };
//     case REGISTRATION_FAILURE:
//       return {
//         ...state,
//         registrationError: action.payload,
//         registrationPending: false,
//       };
//     default:
//       return state;
//   }
// };

export const rootReducer = combineReducers({ loadUser });
