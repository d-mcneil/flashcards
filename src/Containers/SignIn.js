import React, { Component } from "react";
import { connect } from "react-redux";
import { validateSignIn } from "../functions/validateInput";
import { fetchCallSignIn } from "../functions/fetchCalls";
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
  signInUser: (...args) => {
    dispatch(
      registrationAndSignInRequest(
        validateSignIn,
        fetchCallSignIn,
        "Error signing in user: 0",
        ...args
      )
    );
  },
  resetError: () => dispatch(registrationAndSignInErrorReset()),
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  onFieldChangeResetError = () => {
    if (this.props.error) {
      this.props.resetError();
    }
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
    this.props.signInUser(...Object.values(this.state));
  };

  render() {
    const { error, isPending } = this.props;
    const message = isPending ? "Signing in user..." : error;
    return (
      <Form>
        <Title label="Sign In" />
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
          label="Sign In"
          onClick={this.onSubmit}
          onEnterSubmit={(event) => onEnterSubmit(event, this.onSubmit)}
        />
        <Message message={message} wrapperClass="form-error-message" />
      </Form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
