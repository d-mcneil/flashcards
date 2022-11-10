import React, { Component } from "react";
import { connect } from "react-redux";
import { validateRegistration } from "../functions/validateInput";
import { fetchCallRegister } from "../functions/fetchCalls";
// prettier-ignore
import { onEnterCallback, onFieldChangeResetError } from "../functions/repeatedFunctions";
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
  resetError: () => dispatch(resetError()),
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    };
  }

  onFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value });
    onFieldChangeResetError(this.props);
  };

  onLastNameChange = (event) => {
    this.setState({ lastName: event.target.value });
    onFieldChangeResetError(this.props);
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
    onFieldChangeResetError(this.props);
  };

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
    onFieldChangeResetError(this.props);
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
    onFieldChangeResetError(this.props);
  };

  onSubmit = () => {
    this.props.registerUser(this.props.error, ...Object.values(this.state));
  };

  render() {
    const { error, isPending } = this.props;
    const message = isPending ? "Registering user..." : error;
    return (
      <Form>
        <Title label="Register" />
        <EntryBox
          label="First Name"
          onChange={this.onFirstNameChange}
          onEnterSubmit={(event) => onEnterCallback(event, this.onSubmit)}
          type="text"
        />
        <EntryBox
          label="Last Name"
          type="text"
          onChange={this.onLastNameChange}
          onEnterSubmit={(event) => onEnterCallback(event, this.onSubmit)}
        />
        <EntryBox
          label="Email"
          type="email"
          onChange={this.onEmailChange}
          onEnterSubmit={(event) => onEnterCallback(event, this.onSubmit)}
        />
        <EntryBox
          label="Username"
          type="text"
          onChange={this.onUsernameChange}
          onEnterSubmit={(event) => onEnterCallback(event, this.onSubmit)}
        />
        <EntryBox
          label="Password"
          type="password"
          onChange={this.onPasswordChange}
          onEnterSubmit={(event) => onEnterCallback(event, this.onSubmit)}
        />
        <Button
          label="Register"
          onClick={this.onSubmit}
          onEnterSubmit={(event) => onEnterCallback(event, this.onSubmit)}
        />
        <Message message={message} wrapperClass="form-error-message" />
      </Form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
