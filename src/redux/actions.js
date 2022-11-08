import { LOAD_USER, ROUTE_CHANGE } from "./constants";

export const loadUser = (user) => ({
  type: LOAD_USER,
  payload: user,
});

export const routeChange = (route) => ({
  type: ROUTE_CHANGE,
  payload: route,
});

export const loginUser = (user, route) => (dispatch) => {
  dispatch(loadUser(user));
  dispatch(routeChange(route));
};

// if I wanted to do something to the registration page while the fetch call is pending, I would use the action below
// the fetch call would be moved out of the register component, and the error message would be passed down as state

// import { fetchCallRegister } from "../functions/fetchCalls";
// import { validateRegistration } from "../functions/validateInput";
// // prettier-ignore
// import { REGISTRATION_PENDING, REGISTRATION_SUCCESS, REGISTRATION_FAILURE, REGISTRATION_RESET } from "./constants";

// export const registrationRequest =
//   (firstName, lastName, email, username, password) => (dispatch) => {
//     // prettier-ignore
//     const validity = validateRegistration(firstName, lastName, email, username, password);
//     if (!validity.valid) {
//       dispatch({ type: REGISTRATION_FAILURE, payload: data });
//       return;
//     }
//     dispatch({ type: REGISTRATION_PENDING });
//     fetchCallRegister(firstName, lastName, email, username, password)
//       .then((data) => {
//         if (data.userId) {
//           dispatch({ type: REGISTRATION_SUCCESS, payload: data });
//           dispatch(loginUser(data, "home"));
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

// const registrationReset = () => ({type: REGISTRTION_RESET})
