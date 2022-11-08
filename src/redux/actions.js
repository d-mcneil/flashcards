// import { fetchCallRegister, fetchCallSignIn } from "../functions/fetchCalls";
// import { validateRegistration } from "../functions/validateInput";
// import { SIGN_IN_PENDING, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from "./constants";
// import {
//   REGISTRATION_PENDING,
//   REGISTRATION_SUCCESS,
//   REGISTRATION_FAILURE,
// } from "./constants";
import { LOAD_USER } from "./constants";

export const loadUser = (user) => ({
  type: LOAD_USER,
  payload: user,
});

// export const registrationRequest =
//   (firstName, lastName, email, username, password) => (dispatch) => {
//     // prettier-ignore
//     const validity = validateRegistration(firstName, lastName, email, username, password);
//     if (!validity.valid) {
//       this.setState({ error: validity.reason });
//       return;
//     }
//     dispatch({ type: REGISTRATION_PENDING });
//     fetchCallRegister(firstName, lastName, email, username, password)
//       .then((data) => {
//         if (data.userId) {
//           dispatch({ type: REGISTRATION_SUCCESS, payload: data });
//         } else {
//           dispatch({ type: REGISTRATION_FAILURE, payload: data });
//         }
//       })
//       .catch((err) =>
//         dispatch({
//           type: REGISTRATION_FAILURE,
//           payload: "Error registering new user: 0",
//         })
//       );
//   };
