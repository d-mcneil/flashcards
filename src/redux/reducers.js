import { combineReducers } from "redux";
// prettier-ignore
import { REGISTRATION_OR_SIGN_IN_PENDING, REGISTRATION_OR_SIGN_IN_SUCCESS, REGISTRATION_OR_SIGN_IN_FAILURE, REGISTRATION_OR_SIGN_IN_ERROR_RESET } from "./constants";
import { LOAD_USER, SIGN_OUT_USER, ROUTE_CHANGE } from "./constants";

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

const initialStateRegistrationAndSignIn = {
  isPending: false,
  error: "",
};

const userStatus = (state = initialStateUser, action = {}) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, user: action.payload, signedIn: true };
    case SIGN_OUT_USER:
      return { ...state, ...initialStateUser };
    default:
      return state;
  }
};

const routeChange = (state = initialStateRoute, action = {}) => {
  switch (action.type) {
    case ROUTE_CHANGE:
      return { ...state, route: action.payload };
    default:
      return state;
  }
};

const registrationAndSignIn = (
  state = initialStateRegistrationAndSignIn,
  action = {}
) => {
  switch (action.type) {
    case REGISTRATION_OR_SIGN_IN_PENDING:
      return { ...state, isPending: true };
    case REGISTRATION_OR_SIGN_IN_SUCCESS:
      return { ...state, isPending: false };
    case REGISTRATION_OR_SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isPending: false,
      };
    case REGISTRATION_OR_SIGN_IN_ERROR_RESET:
      return { ...state, error: "" };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  userStatus,
  routeChange,
  registrationAndSignIn,
});
