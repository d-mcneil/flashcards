import React, { Component } from "react";
import { connect } from "react-redux";
import { validateRegistration } from "../functions/validateInput";
import { fetchCallRegister } from "../functions/fetchCalls";
import { onEnterSubmit } from "../functions/repeatedFunctions";
// prettier-ignore
import { registrationAndSignInErrorReset, registrationAndSignInRequest } from "../redux/actions";
import Form from "../components/Forms/Form/Form";
import Title from "../components/Forms/Title/Title";
import EntryBox from "../components/Forms/EntryBox/EntryBox";
import Button from "../components/Forms/Button/Button";
import Message from "../components/Message/Message";

const mapStateToProps = (state) => ({
  error: state.registrationAndSignIn.error,
  isPending: state.registrationAndSignIn.isPending,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (...args) => {
    dispatch(
      registrationAndSignInRequest(
        validateRegistration,
        fetchCallRegister,
        "Error registering new user: 0",
        ...args
      )
    );
  },
  resetError: () => dispatch(registrationAndSignInErrorReset()),
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

  onFieldChangeResetError = () => {
    if (this.props.error) {
      this.props.resetError();
    }
  };

  onFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value });
    this.onFieldChangeResetError();
  };

  onLastNameChange = (event) => {
    this.setState({ lastName: event.target.value });
    this.onFieldChangeResetError();
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
    this.onFieldChangeResetError();
  };

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
    this.onFieldChangeResetError();
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
    this.onFieldChangeResetError();
  };

  onSubmit = () => {
    this.props.registerUser(...Object.values(this.state));
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
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
          type="text"
        />
        <EntryBox
          label="Last Name"
          type="text"
          onChange={this.onLastNameChange}
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
        />
        <EntryBox
          label="Email"
          type="email"
          onChange={this.onEmailChange}
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
        />
        <EntryBox
          label="Username"
          type="text"
          onChange={this.onUsernameChange}
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
        />
        <EntryBox
          label="Password"
          type="password"
          onChange={this.onPasswordChange}
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
        />
        <Button
          label="Register"
          onClick={this.onSubmit}
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
        />
        <Message message={message} wrapperClass="form-error-message" />
      </Form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
