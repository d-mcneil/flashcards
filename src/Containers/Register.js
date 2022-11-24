import React from "react";
import { connect } from "react-redux";
import { resetError, registrationAndSignInRequest } from "../redux/actions";
import { useInputValueWithErrorReset as useInputValue } from "../functions/hooks";
import { validateRegistration } from "../functions/validateInput";
import { fetchCallRegister } from "../functions/fetchCalls";
import { onEnterCallback } from "../functions/repeatedFunctions";
import Form from "../components/Forms/Form/Form";
import Title from "../components/Forms/Title/Title";
import EntryBox from "../components/Forms/EntryBox/EntryBox";
import Button from "../components/Forms/Button/Button";
import Message from "../components/Message/Message";

const mapStateToProps = (state) => ({
  error: state.error.error,
  isPending: state.requestStatus.isPending,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (currentError, ...args) => {
    dispatch(
      registrationAndSignInRequest(
        validateRegistration,
        fetchCallRegister,
        "Error registering new user: 0",
        currentError,
        ...args
      )
    );
  },
  resetErrorIfNeeded: () => dispatch(resetError()),
});

const Register = ({ error, isPending, registerUser, resetErrorIfNeeded }) => {
  const firstName = useInputValue("", error, resetErrorIfNeeded);
  const lastName = useInputValue("", error, resetErrorIfNeeded);
  const email = useInputValue("", error, resetErrorIfNeeded);
  const username = useInputValue("", error, resetErrorIfNeeded);
  const password = useInputValue("", error, resetErrorIfNeeded);

  const message = isPending ? "Registering user..." : error;
  const onSubmit = () => {
    registerUser(
      error,
      firstName.value,
      lastName.value,
      email.value,
      username.value,
      password.value
    );
  };

  return (
    <Form>
      <Title label="Register" />
      <EntryBox
        label="First Name"
        type="text"
        onChange={firstName.onChange}
        onEnterSubmit={(event) => onEnterCallback(event, onSubmit)}
      />
      <EntryBox
        label="Last Name"
        type="text"
        onChange={lastName.onChange}
        onEnterSubmit={(event) => onEnterCallback(event, onSubmit)}
      />
      <EntryBox
        label="Email"
        type="email"
        onChange={email.onChange}
        onEnterSubmit={(event) => onEnterCallback(event, onSubmit)}
      />
      <EntryBox
        label="Username"
        type="text"
        onChange={username.onChange}
        onEnterSubmit={(event) => onEnterCallback(event, onSubmit)}
      />
      <EntryBox
        label="Password"
        type="password"
        onChange={password.onChange}
        onEnterSubmit={(event) => onEnterCallback(event, onSubmit)}
      />
      <Button
        label="Register"
        onClick={onSubmit}
        onEnterSubmit={(event) => onEnterCallback(event, onSubmit)}
      />
      <Message
        message={message}
        wrapperClass="form-error-message" // in index.css
      />
    </Form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
