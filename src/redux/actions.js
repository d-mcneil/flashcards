import { batch } from "react-redux";
// prettier-ignore
import { REGISTRATION_OR_SIGN_IN_PENDING, REGISTRATION_OR_SIGN_IN_SUCCESS, REGISTRATION_OR_SIGN_IN_FAILURE, REGISTRATION_OR_SIGN_IN_ERROR_RESET } from "./constants";
import { LOAD_USER, SIGN_OUT_USER, ROUTE_CHANGE } from "./constants";

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
    dispatch({ type: SIGN_OUT_USER });
    dispatch(routeChange("signed-out"));
  });
};

export const registrationAndSignInErrorReset = () => ({
  type: REGISTRATION_OR_SIGN_IN_ERROR_RESET,
});

export const registrationAndSignInRequest =
  (validationCallback, fetchCallback, clientSideErrorMessage, ...args) =>
  (dispatch) => {
    const validity = validationCallback(...args);
    // returns object with properties { valid, reason(only if invalid) }
    if (!validity.valid) {
      dispatch({
        type: REGISTRATION_OR_SIGN_IN_FAILURE,
        payload: validity.reason,
      });
      return;
    }
    dispatch({ type: REGISTRATION_OR_SIGN_IN_PENDING });
    fetchCallback(...args)
      .then((data) => {
        if (data.userId) {
          batch(() => {
            dispatch({ type: REGISTRATION_OR_SIGN_IN_SUCCESS });
            dispatch(loadUser(data));
            dispatch(routeChange("home"));
            dispatch(registrationAndSignInErrorReset());
          });
        } else {
          dispatch({ type: REGISTRATION_OR_SIGN_IN_FAILURE, payload: data });
        }
      })
      .catch((err) =>
        dispatch({
          type: REGISTRATION_OR_SIGN_IN_FAILURE,
          payload: clientSideErrorMessage,
        })
      );
  };
