import { batch } from "react-redux";
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

export const routeChange = (route) => ({
  type: ROUTE_CHANGE,
  payload: route,
});

export const loadUser = (user) => ({
  type: LOAD_USER,
  payload: user,
});

export const signOutUser = () => (dispatch) => {
  batch(() => {
    dispatch(routeChange("signed-out"));
    dispatch({ type: SIGN_OUT_USER });
  });
};

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
            // the commented-out functions were how it was before I combined route change and reset error
            // dispatch(resetError());
            dispatch(requestResovled());
            dispatch(loadUser(data));
            // dispatch(routeChange("home"));
            dispatch(routeChangeAndResetError("home", currentError));
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

export const getDecksRequest = (userId) => (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
};
