import React from "react";
import { connect } from "react-redux";
import { validateSignIn } from "../functions/validateInput";
import { fetchCallSignIn } from "../functions/fetchCalls";
import { onEnterCallback, useInputValue } from "../functions/repeatedFunctions";
import { resetError, registrationAndSignInRequest } from "../redux/actions";
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
  signInUser: (currentError, ...args) => {
    dispatch(
      registrationAndSignInRequest(
        validateSignIn,
        fetchCallSignIn,
        "Error signing in user: 0",
        currentError,
        ...args
      )
    );
  },
  resetErrorIfNeeded: () => dispatch(resetError()),
});

const SignIn = ({ error, isPending, signInUser, resetErrorIfNeeded }) => {
  const username = useInputValue("", error, resetErrorIfNeeded);
  const password = useInputValue("", error, resetErrorIfNeeded);

  const message = isPending ? "Signing in user..." : error;
  const onSubmit = () => {
    signInUser(error, username.value, password.value);
  };

  return (
    <Form>
      <Title label="Sign In" />
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
        label="Sign In"
        onClick={onSubmit}
        onEnterSubmit={(event) => onEnterCallback(event, onSubmit)}
      />
      <Message message={message} wrapperClass="form-error-message" />
    </Form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
